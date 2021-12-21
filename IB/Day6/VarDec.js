// Var and let 

/* ---------------------------Var--------------------------- */
// 1. Var
// Redclare
// Reassign 
// Function scope 
// you Can access Variable before declaration 

console.log ( a );

var a ;

a= 10 ;

var a ;
console.log ( a);


/*----------------------------Let------------------------------  */

// 2. let 
// Temporal Dead zone (TDZ)---> Imp for IB

// BlockScope
// can not Redeclare 



//console.log ( a ); ---> TDZ --->Can't access and Refrence error

let a ;

a= 10 ;

let  a ;  // problem  already declare -->SyntaxError: Identifier 'a' has already been declared
console.log ( a);


