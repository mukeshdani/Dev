/* ------------------Closure -------------------- */

// closure along with its lexical environment is called closure 

function outer (first){

    console.log("Inside Outer ");
    return function inner ( second ){

        console.log("Inside Inner ");

        return first*second;
    }
}

let rVal = outer (2);
console.log ( " Before Call outer ");

let ans = rVal(4);

console.log( ans );