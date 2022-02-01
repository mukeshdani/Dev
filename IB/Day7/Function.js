function outer (parm){
    console.log (parm);
 
    parm();
 }
 
 function chotaFn(){
     console.log("hello I'm a chota funtion ");
 }
 
 outer ( chotaFn);
 
 // function can be passsed as parameter to another function 
 
 
 // 2 . 
 
 let a = [1,2,3,4,5];
 
 let b = a ;
 let anotherName = function(){
     console.log("I'm an expression ");
 
 }
 
 anotherName();
 
 
 // 3 . 
 
 function fn(){
     return "hello ";
 }
 
 let rVal = fn();
 console.log(rVal);
 
 
 
 
 
 // Function return from a function
 
 function outer (){
     console.log( " Hello I am outer and im return ");
     return function inner (){
         console.log("I am Inner ");
     }
 }
 
 let rVal = outer();
 
 console.log (rVal);
 rVal();
 
 
 
 
 