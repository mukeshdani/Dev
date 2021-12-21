// Var and let 

/* ---------------------------Var--------------------------- */
// 1. Var
// Redclare
// Reassign 
// Function scope 
// you Can access Variable before declaration 
/* 
console.log ( a );

var a ;

a= 10 ;

var a ;
console.log ( a);

 */
/*----------------------------Let------------------------------  */

// 2. let 
// Temporal Dead zone (TDZ)---> Imp for IB

// BlockScope
// can not Redeclare 


/* 
console.log ( a ); //---> a persent in TDZ --->Can't access and Refrence error
//  ReferenceError: Cannot access 'a' before initialization

let a ;

a= 10 ;

//let  a ;  // problem  already declare -->SyntaxError: Identifier 'a' has already been declared
console.log ( a);

 */


/* 
console.log ( "before declaration",a);
var a; 
console.log ( "after declaration ",a);
a =10 ;
console.log ( "after initilisation",a);
 function fn (){
     console.log ( "before declaration",a);
    // var a ; 
     console.log ( "after declaration ",a);
    // a=30;
     console.log ( "after initilisation",a);
 }
 fn();
 console.log ( "after Function call",a); */

 