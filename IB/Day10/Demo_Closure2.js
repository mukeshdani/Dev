function powerFunctionCreator(exp){
    if ( typeof exp !=='number'){
        console.log("exp must be a number ");
        return null;
    }

    let powerFn = 
    function (base){   
     let rv = Math.pow(base,obj.exp);
       return rv ; 
    }

    return powerFn;
}

let obj = {
    exp: 2
}

let squarer = powerFunctionCreator(2);
let sqo8 = squarer(8);
console.log(sqo8);

obj.exp = 3;
let cuo8 = squarer(8);
console.log(cuo8);