
/* 

Literal Type > TypeScript 


*/



function combine1(nunber1:number | string | boolean, number2 : number| string , resultType : 'as-number'|'as-text'){
    let result5 ;
    if(typeof nunber1 === 'number' && number2 === 'number'){
        result5 =  number2 + nunber1;
    }else { 
       result5 = nunber1.toString() + number2.toString;
    }

    if(resultType === 'as-number'){
         return +result5
    }else {
         return result5.toString();
    }
 }

 console.log(combine1(1 , 2, 'as-number'));
 console.log(combine1('2' , '1' , 'as-text'));



