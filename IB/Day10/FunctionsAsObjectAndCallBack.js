
/* ---------------------Functions as objects and calbacks ------------ */
let fs = require("fs");

function primeSieve(phandler, nphandler) {
    let oarr = this;
    phandler.calledForTheFirstTime = true;
    nphandler.calledForTheFirstTime = true;

    for (let i = 0; i < oarr.length; i++) {
        let num = oarr[i];

        let isPrime = true;
        for (let div = 2; div * div <= num; div++) {
            if (num % div == 0) {
                isPrime = false;
                break;
            }
        }

        if (isPrime == true) {
            phandler(num);
        } else {
            nphandler(num);
        }
    }
}
Array.prototype.sieve = primeSieve;

let arr = [11, 18, 34, 37, 49, 53, 71, 84, 97];
arr.sieve(logAllPrimes, logAllNonPrimes)

function logAllPrimes(num) {
    if (logAllPrimes.calledForTheFirstTime == true) {
        if (fs.existsSync("primes.txt")) {
            fs.rmSync("primes.txt");
        }
        logAllPrimes.calledForTheFirstTime = false;
    }

    fs.appendFileSync("primes.txt", num + "->", "utf-8");
}

function logAllNonPrimes(num) {
    if (logAllNonPrimes.calledForTheFirstTime == true) {
        if (fs.existsSync("non-primes.txt")) {
            fs.rmSync("non-primes.txt");
        }
        logAllNonPrimes.calledForTheFirstTime = false;
    }
    fs.appendFileSync("non-primes.txt", num + "->", "utf-8");
}