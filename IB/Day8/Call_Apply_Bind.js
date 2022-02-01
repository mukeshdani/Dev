/* let obj = {
    fun1:function (frnd1 , frnd2){
        console.log ( "This man is called " + this.fullName + ". His age is " + this.age );
        console.log ( this.fullName + " Say hello  to " + frnd1 );
        console.log ( this.fullName + " Say hello  to " + frnd2 );
    },
    fullName:"Mukesh Dani ",
    age : 22
}

obj.fun1("Mukesh1", "Mukesh2"); */

/* Result ----> 
This man is called Mukesh Dani . His age is 22
Mukesh Dani  Say hello  to Mukesh1
Mukesh Dani  Say hello  to Mukesh2 
*/



/* ---------------call----------------- */
// Call is a function. It is available an all functions ,  
// It can be used to call the functions 
// the use case is , If you want to override the default this 
/* let obj = {
    fun1:function (frnd1 , frnd2){
        console.log ( "This man is called " + this.fullName + ". His age is " + this.age );
        console.log ( this.fullName + " Say hello  to " + frnd1 );
        console.log ( this.fullName + " Say hello  to " + frnd2 );
    },
    fullName:"Mukesh Dani ",
    age : 22
}

let obj2 = {
    fullName:"suraj Dani",
    age : 24 
    
}

obj.fun1.call(obj2,"Mukesh1", "Mukesh2"); */

 /* Result --->
 This man is called suraj Dani. His age is 24
suraj Dani Say hello  to Mukesh1
suraj Dani Say hello  to Mukesh2
 */

/* ---------------apply--------------- */

/* let obj = {
    fun1:function (frnd1 , frnd2){
        console.log ( "This man is called " + this.fullName + ". His age is " + this.age );
        console.log ( this.fullName + " Say hello  to " + frnd1 );
        console.log ( this.fullName + " Say hello  to " + frnd2 );
    },
    fullName:"Mukesh Dani ",
    age : 22
}

let obj2 = {
    fullName:"suraj Dani",
    age : 24 
    
}

obj.fun1.apply(obj2,["Mukesh1", "Mukesh2","Mukesh3"]); */

/* Result ---> 
This man is called suraj Dani. His age is 24
suraj Dani Say hello  to Mukesh1
suraj Dani Say hello  to Mukesh2
 */
/* ---------------Bind---------------- */

let obj = {
    fun1:function (frnd1 , frnd2){
        console.log ( "This man is called " + this.fullName + ". His age is " + this.age );
        console.log ( this.fullName + " Say hello  to " + frnd1 );
        console.log ( this.fullName + " Say hello  to " + frnd2 );
    },
    fullName:"Mukesh Dani ",
    age : 22
}

let obj2 = {
    fullName:"suraj Dani",
    age : 24 
    
}

let boundFunction = obj.fun1.bind(obj2,"Mukesh1", "Mukesh2","Mukesh3");
 boundFunction();
 boundFunction("Summet");

 /* Result -->
 This man is called suraj Dani. His age is 24
suraj Dani Say hello  to Mukesh1
suraj Dani Say hello  to Mukesh2
This man is called suraj Dani. His age is 24
suraj Dani Say hello  to Mukesh1
suraj Dani Say hello  to Mukesh2
 */



/*  ------------------------------Difference Between call and Bind ---------------- */
// in call --> (this , normal string )
// in apply --> (this , array)