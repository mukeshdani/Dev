const cp = require ('child_process')

let output = cp.execSync('node test.js')

console.log("output is " + output)