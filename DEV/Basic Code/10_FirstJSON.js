// npm init
// npm install minimist
// node 10_FirstJSON.js 

let minimist = require("minimist");
let args = minimist(process.argv);

// JSON = Javascript Object Notation
// JSON means saving data in the same format as of javascript objects

let s1 = {
    name: "Sumeet",
    age: 34
}; // s1 is an object. name and age are properties / data members

console.log(s1.name);
console.log(s1.age);

let agesKaArr = [10, 20, 30];
console.log(agesKaArr[0]);
console.log(agesKaArr[1]);
console.log(agesKaArr[2]);

let namesKaArray = ["Sumeet", "Moksh", "Jasbir"];
console.log(namesKaArray[0]);
console.log(namesKaArray[1]);
console.log(namesKaArray[2]);

let arrOfObjects = [
    {
        name: "Sumeet",
        age: 34
    }, 
    {
        name: "Moksh",
        age: 25
    },
    {
        name: "Jasbir",
        age: 24
    }
];

console.log(arrOfObjects[0].name);
console.log(arrOfObjects[0].age);

console.log(arrOfObjects[1].name);
console.log(arrOfObjects[1].age);

console.log(arrOfObjects[2].name);
console.log(arrOfObjects[2].age);
