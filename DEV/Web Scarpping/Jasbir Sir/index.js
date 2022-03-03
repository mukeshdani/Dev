// npm i request 

let request = require('request');
let jsdom = require ("jsdom");
let {JSDOM} = jsdom;
let url = "https://www.espncricinfo.com/series/afghanistan-in-bangladesh-2021-22-1299826/bangladesh-vs-afghanistan-1st-t20i-1299832/full-scorecard";

request (url , cb);

function cb( err , httpResponse , html ){
    if(err){
        console.log(err);
    }else if ( httpResponse.statusCode == 404){
        console.log(" page not found ");
    }else {
        console.log("html data recived .. ");
        parseHTML(html);
    }
}
function parseHTML(html){
    let dom = new JSDOM(html);
    let document = dom.window.document;
    let titleTag = document.querySelector("title");
    let title = titleTag.textContent;
    let teamName = document.querySelector(".team > .name-detail");
    let tName = teamName.textContent;
    console.log(tName);
    console.log(title);
}