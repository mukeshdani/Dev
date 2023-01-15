/* 
any > typeScript 

*/

let array1 : any[];
// array1.push(1);

 /* 
 
 union > typeScript 

 
 */

 function combine(nunber1:number | string | boolean, number2 : number| string){
    let result3 ;
    if(typeof nunber1 === 'number' && number2 === 'number'){
        result3 =  number2 + nunber1;
    }else { 
       result3 = nunber1.toString() + number2.toString;
    }
   return result3;
 }

 let result2 = combine('leela ' , 'leela');
 console.log(result2);