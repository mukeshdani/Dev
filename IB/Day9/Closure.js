/* -----------Closure Question -------------- */

function powerCreator(obj){
// Hint ---> Functions are also object
       
    let fun = function(base){
        let rv = Math.pow(base,obj.exp);
        return rv ;
    }
   return fun ; 
}

let o1 = {
    exp: 2
}

let squarer= powerCreator(2);
let val = squarer(8);
console.log("Result --->: "+val);

o1.exp = 3; 
let val2 = squarer(7);
console.log(val2);

// how to chanege square to cuber without calling powerCreator again
//you can change powercreator
