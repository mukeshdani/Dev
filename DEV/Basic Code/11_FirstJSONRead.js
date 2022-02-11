// node 11_FirstJSONRead.js --source=teams.json

let minimist = require("minimist");
let fs = require("fs");

let args = minimist(process.argv);

fs.readFile(args.source, "utf-8", function(err, json){
    if(err){
        console.log(err);
    } else {
        // JSON se waapis JSO bnana hoga
        let teams = JSON.parse(json); // JSON to JSO so that you can manipulate the object
        console.log(teams[2].matches[1].vs);
    }
})

// JSO => you can manipulate it
// JSON => you can print or save it

// if you want to print or save a JSO, convert the JSO to JSON using JSON.stringify
// if you want to manipulate a JSON, convert the JSON to JSO using JSON.parse