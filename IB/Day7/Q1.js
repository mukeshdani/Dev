/* -----------------------using Var-------------------- */

// 1. 
/* function outer (){

    var arr = [];

    for ( var i = 0 ; i<3;i++){
        arr.push(function(){
            console.log(i);
        })

    }
    return arr;
}

console.log( " Before Calling Outer ");

var ans = outer ();
arr[0]();
arr[1]();
arr[2]();
console.log("after Calling outer "); */


// 2 .

function outer (){

    var arr = [];

    for ( var i = 0 ; i<3;i++){
        function outer1 (){
            var j = i;
            return function (){
                console.log (j);
            }
    }

    }
    return arr;
}

console.log( " Before Calling Outer ");

var ans = outer ();
arr[0]();
arr[1]();
arr[2]();
console.log("after Calling outer ");
