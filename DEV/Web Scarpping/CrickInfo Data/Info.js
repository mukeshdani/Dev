/* // the purpose of this project is to extract information of worldcup 2019 from cricinfo and present
// that in the form of excel and pdf scorecards
// the real purpose is to learn how to extract information and get experience with js
// A very good reason to ever make a project is to have good fun

// npm init -y
// npm install minimist
// npm install axios
// npm install jsdom
// npm install excel4node
// npm install pdf-lib

// node 1_CricinfoExtracter.js --excel=Worldcup.csv --dataFolder=data --source=https://www.espncricinfo.com/series/icc-cricket-world-cup-2019-1144415/match-results 

let minimist = require("minimist");
let axios = require("axios");
let jsdom = require("jsdom");
let excel = require("excel4node");
let pdf = require("pdf-lib");
let fs = require("fs");
let path = require("path");

let args = minimist(process.argv);

// download using axios
// extract information using jsdom
// manipulate data using array functions
// save in excel using excel4node
// create folders and prepare pdfs

let reponseKaPromise = axios.get(args.source);
reponseKaPromise.then(function (response) {
    let html = response.data;

    let dom = new jsdom.JSDOM(html);
    let document = dom.window.document;

    let matches = [];
    let matchdivs = document.querySelectorAll("div.match-score-block");
    for (let i = 0; i < matchdivs.length; i++) {
        let matchdiv = matchdivs[i];
        let match = {
            t1: "",
            t2: "",
            t1s: "",
            t2s: "",
            result: ""
        };

        let teamParas = matchdiv.querySelectorAll("div.name-detail > p.name");
        match.t1 = teamParas[0].textContent;
        match.t2 = teamParas[1].textContent;

        let scoreSpans = matchdiv.querySelectorAll("div.score-detail > span.score");
        if (scoreSpans.length == 2) {
            match.t1s = scoreSpans[0].textContent;
            match.t2s = scoreSpans[1].textContent;
        } else if (scoreSpans.length == 1) {
            match.t1s = scoreSpans[0].textContent;
            match.t2s = "";
        } else {
            match.t1s = "";
            match.t2s = "";
        }

        let resultSpan = matchdiv.querySelector("div.status-text > span");
        match.result = resultSpan.textContent;

        matches.push(match);
    }

    let matchesJSON = JSON.stringify(matches); // done
    fs.writeFileSync("matches.json", matchesJSON, "utf-8"); // done

    let teams = []; // done
    for (let i = 0; i < matches.length; i++) {
        putTeamInTeamsArrayIfMissing(teams, matches[i]); // done
    }

    for (let i = 0; i < matches.length; i++) {
        putMatchInAppropriateTeam(teams, matches[i]); // done
    }

    let teamsJSON = JSON.stringify(teams); // done
    fs.writeFileSync("teams.json", teamsJSON, "utf-8"); // done

    createExcelFile(teams);
    createFolders(teams);
})

function createFolders(teams) {
    fs.mkdirSync(args.dataFolder);
    for (let i = 0; i < teams.length; i++) {
        let teamFN = path.join(args.dataFolder, teams[i].name);
        fs.mkdirSync(teamFN);

        for (let j = 0; j < teams[i].matches.length; j++) {
            let matchFileName = path.join(teamFN, teams[i].matches[j].vs + ".pdf");
            createScoreCard(teams[i].name, teams[i].matches[j], matchFileName);
        }
    }
}

function createScoreCard(teamName, match, matchFileName) {
    let t1 = teamName;
    let t2 = match.vs;
    let t1s = match.selfScore;
    let t2s = match.oppScore;
    let result = match.result;

    let bytesOfPDFTemplate = fs.readFileSync("Template.pdf");
    let pdfdocKaPromise = pdf.PDFDocument.load(bytesOfPDFTemplate);
    pdfdocKaPromise.then(function(pdfdoc){
        let page = pdfdoc.getPage(0);

        page.drawText(t1, {
            x: 320,
            y: 729,
            size: 8
        });
        page.drawText(t2, {
            x: 320,
            y: 715,
            size: 8
        });
        page.drawText(t1s, {
            x: 320,
            y: 701,
            size: 8
        });
        page.drawText(t2s, {
            x: 320,
            y: 687,
            size: 8
        });
        page.drawText(result, {
            x: 320,
            y: 673,
            size: 8
        });

        let finalPDFBytesKaPromise = pdfdoc.save();
        finalPDFBytesKaPromise.then(function(finalPDFBytes){
            fs.writeFileSync(matchFileName, finalPDFBytes);
        })
    })
}

function createExcelFile(teams) {
    let wb = new excel.Workbook();

    for (let i = 0; i < teams.length; i++) {
        let sheet = wb.addWorksheet(teams[i].name);

        sheet.cell(1, 1).string("VS");
        sheet.cell(1, 2).string("Self Score");
        sheet.cell(1, 3).string("Opp Score");
        sheet.cell(1, 4).string("Result");
        for (let j = 0; j < teams[i].matches.length; j++) {
            sheet.cell(2 + j, 1).string(teams[i].matches[j].vs);
            sheet.cell(2 + j, 2).string(teams[i].matches[j].selfScore);
            sheet.cell(2 + j, 3).string(teams[i].matches[j].oppScore);
            sheet.cell(2 + j, 4).string(teams[i].matches[j].result);
        }
    }

    wb.write(args.excel);
}

function putTeamInTeamsArrayIfMissing(teams, match) {
    let t1idx = -1;
    for (let i = 0; i < teams.length; i++) {
        if (teams[i].name == match.t1) {
            t1idx = i;
            break;
        }
    }

    if (t1idx == -1) {
        teams.push({
            name: match.t1,
            matches: []
        });
    }

    let t2idx = -1;
    for (let i = 0; i < teams.length; i++) {
        if (teams[i].name == match.t2) {
            t2idx = i;
            break;
        }
    }

    if (t2idx == -1) {
        teams.push({
            name: match.t2,
            matches: []
        });
    }
}

function putMatchInAppropriateTeam(teams, match) {
    let t1idx = -1;
    for (let i = 0; i < teams.length; i++) {
        if (teams[i].name == match.t1) {
            t1idx = i;
            break;
        }
    }

    let team1 = teams[t1idx];
    team1.matches.push({
        vs: match.t2,
        selfScore: match.t1s,
        oppScore: match.t2s,
        result: match.result
    });

    let t2idx = -1;
    for (let i = 0; i < teams.length; i++) {
        if (teams[i].name == match.t2) {
            t2idx = i;
            break;
        }
    }

    let team2 = teams[t2idx];
    team2.matches.push({
        vs: match.t1,
        selfScore: match.t2s,
        oppScore: match.t1s,
        result: match.result
    });
}
 */

// npm init -y
// npm install minimist
// npm install axios
// npm install jsdom
// npm install excel4node
// npm install pdf-lib
// node 1_CricinfoExtracter.js --excel=Worldcup.csv --dataDir=worldcup --source=https://www.espncricinfo.com/series/icc-cricket-world-cup-2019-1144415/match-results

let minimist = require("minimist");
let axios = require("axios");
let jsdom = require("jsdom");
let excel4node = require("excel4node");
let pdf = require("pdf-lib");
let fs = require("fs");
let path = require("path");


// convert matches to teams
// save teams to excel using excel4node
// create folders and save pdf using pdf-lib

let args = minimist(process.argv);

// browser => url to html (url se http request -> server ne html in http response)
let responseKaPromise = axios.get(args.source);
responseKaPromise.then(function (response) {
    let html = response.data;

    let dom = new jsdom.JSDOM(html);
    let document = dom.window.document;
    let matchScoreDivs = document.querySelectorAll("div.match-score-block");
    let matches = [];

    for (let i = 0; i < matchScoreDivs.length; i++) {
        let match = {
            t1: "",
            t2: "",
            t1s: "",
            t2s: "",
            result: ""
        };

        let teamParas = matchScoreDivs[i].querySelectorAll("div.name-detail > p.name");
        match.t1 = teamParas[0].textContent;
        match.t2 = teamParas[1].textContent;

        let scoreSpans = matchScoreDivs[i].querySelectorAll("div.score-detail > span.score");
        if (scoreSpans.length == 2) {
            match.t1s = scoreSpans[0].textContent;
            match.t2s = scoreSpans[1].textContent;
        } else if (scoreSpans.length == 1) {
            match.t1s = scoreSpans[0].textContent;
            match.t2s = "";
        } else {
            match.t1s = "";
            match.t2s = "";
        }

        let resultSpan = matchScoreDivs[i].querySelector("div.status-text > span");
        match.result = resultSpan.textContent;

        matches.push(match);
    }

    let matchesKaJSON = JSON.stringify(matches);
    fs.writeFileSync("matches.json", matchesKaJSON, "utf-8");

    let teams = []
    for (let i = 0; i < matches.length; i++) {
        addTeamToTeamsArrayIfNotAlreadyThere(teams, matches[i].t1);
        addTeamToTeamsArrayIfNotAlreadyThere(teams, matches[i].t2);
    }

    for (let i = 0; i < matches.length; i++) {
        addMatchToSpecificTeam(teams, matches[i].t1, matches[i].t2, matches[i].t1s, matches[i].t2s, matches[i].result);
        addMatchToSpecificTeam(teams, matches[i].t2, matches[i].t1, matches[i].t2s, matches[i].t1s, matches[i].result);
    }

    let teamsKaJSON = JSON.stringify(teams);
    fs.writeFileSync("teams.json", teamsKaJSON, "utf-8");

    prepareExcel(teams, args.excel);
    prepareFoldersAndPdfs(teams, args.dataDir);
})

function prepareFoldersAndPdfs(teams, dataDir) {
    if(fs.existsSync(dataDir) == true){
        fs.rmdirSync(dataDir, { recursive: true });
    }

    fs.mkdirSync(dataDir);

    for (let i = 0; i < teams.length; i++) {
        let teamFolderName = path.join(dataDir, teams[i].name);
        fs.mkdirSync(teamFolderName);

        for (let j = 0; j < teams[i].matches.length; j++) {
            let match = teams[i].matches[j];
            createMatchScorecardPdf(teamFolderName, teams[i].name, match);
        }
    }
}

function createMatchScorecardPdf(teamFolderName, homeTeam, match) {
    let matchFileName = path.join(teamFolderName, match.vs);

    let templateFileBytes = fs.readFileSync("Template.pdf");
    let pdfdocKaPromise = pdf.PDFDocument.load(templateFileBytes);
    pdfdocKaPromise.then(function (pdfdoc) {
        let page = pdfdoc.getPage(0);

        page.drawText(homeTeam, {
            x: 320,
            y: 703,
            size: 8
        });
        page.drawText(match.vs, {
            x: 320,
            y: 688,
            size: 8
        });
        page.drawText(match.selfScore, {
            x: 320,
            y: 673,
            size: 8
        });
        page.drawText(match.oppScore, {
            x: 320,
            y: 658,
            size: 8
        });
        page.drawText(match.result, {
            x: 320,
            y: 643,
            size: 8
        });

        let changedBytesKaPromise = pdfdoc.save();
        changedBytesKaPromise.then(function (changedBytes) {
            if(fs.existsSync(matchFileName + ".pdf") == true){
                fs.writeFileSync(matchFileName + "1.pdf", changedBytes);
            } else {
                fs.writeFileSync(matchFileName + ".pdf", changedBytes);
            }
        })
    })
}

function prepareExcel(teams, excelFileName) {
    let wb = new excel4node.Workbook();

    for (let i = 0; i < teams.length; i++) {
        let tsheet = wb.addWorksheet(teams[i].name);

        tsheet.cell(1, 1).string("Vs");
        tsheet.cell(1, 2).string("Self Score");
        tsheet.cell(1, 3).string("Opp Score");
        tsheet.cell(1, 4).string("Result");
        for (let j = 0; j < teams[i].matches.length; j++) {
            tsheet.cell(2 + j, 1).string(teams[i].matches[j].vs);
            tsheet.cell(2 + j, 2).string(teams[i].matches[j].selfScore);
            tsheet.cell(2 + j, 3).string(teams[i].matches[j].oppScore);
            tsheet.cell(2 + j, 4).string(teams[i].matches[j].result);
        }
    }

    wb.write(excelFileName);
}

function addMatchToSpecificTeam(teams, homeTeam, oppTeam, selfScore, oppScore, result) {
    let tidx = -1;
    for (let i = 0; i < teams.length; i++) {
        if (teams[i].name == homeTeam) {
            tidx = i;
            break;
        }
    }

    let team = teams[tidx];
    team.matches.push({
        vs: oppTeam,
        selfScore: selfScore,
        oppScore: oppScore,
        result: result
    })
}

function addTeamToTeamsArrayIfNotAlreadyThere(teams, teamName) {
    let tidx = -1;
    for (let i = 0; i < teams.length; i++) {
        if (teams[i].name == teamName) {
            tidx = i;
            break;
        }
    }

    if (tidx == -1) {
        teams.push({
            name: teamName,
            matches: []
        })
    }
}