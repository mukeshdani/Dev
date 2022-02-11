// t1 = Read a file (disk)
// t2 = Calculate primes (cpu)
// t2 will be done in parallel with t1, which is good
// node 7_FirstCallback.js --source=big.data --n=70000
function IsPrime(x){
    let isPrime = true;

    for(let div = 2; div <= x - 1; div++){
        if(x % div == 0){
            isPrime = false;
            break;
        }
    }

    return isPrime;
}

let minimist = require("minimist");
let fs = require("fs");

let args = minimist(process.argv);

// task 1 in a better way
let t1 = Date.now(); 
console.log("Task1 started at " + t1 % 100000);

// let data = fs.readFileSync(args.source);
fs.readFile(args.source, function(err, data){
    let t2 = Date.now();
    console.log("Task1 finished at " + t2 % 100000);
    console.log(t2 - t1);
});
// task 1 in a better way

// task2
let t3 = Date.now(); // number of milliseconds elapsed since 1st jan 1970
console.log("Task2 started at " + t3 % 100000);

let arr = [];
for(let i = 2; i < args.n; i++){
    let isPrime = IsPrime(i);
    if(isPrime == true){
        arr.push(i);
    }
}

let t4 = Date.now();
console.log("Task2 finished at " + t4 % 100000);
console.log(t4 - t3);
// task2
