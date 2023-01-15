
/* 

Literal Type > TypeScript 


*/

enum RESULT_TYPE {
    AS_NUMBER ='as-number',
    AS_TEXT = 'as-text'
     
}

function combine1(nunber1:number | string | boolean, number2 : number| string , resultType : RESULT_TYPE){
    let result5 ;
    if(typeof nunber1 === 'number' && number2 === 'number'){
        result5 =  number2 + nunber1;
    }else { 
       result5 = nunber1.toString() + number2.toString;
    }

    if(resultType === RESULT_TYPE.AS_NUMBER){
         return +result5
    }else {
         return result5.toString();
    }
 }

 console.log(combine1(1 , 2, RESULT_TYPE.AS_TEXT));
 console.log(combine1('2' , '1' , RESULT_TYPE.AS_NUMBER));



