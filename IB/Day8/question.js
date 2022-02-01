
// 1. 

/*   ---------------- Function Expression --------------- */
// Variable are Hoisted 
// Functions asignment is not Hoisted 

//fun();

var fun = function ( ){/*  Function Expression  */
    gun();
}

var gun = function (){  /*  Function Expression  */
    console.log("I'm inside gun ");
} 
 /*  Result -->TypeError: fun is not a function */



 /* -----------------------------Function declaration ------------------------------- */

 // Function Declaration 
 // Both Variable and Function are Hoisted 

 //fun();

function fun (){/*  Function Declaration   */
    gun();
}

function gun(){  /*  Function Declaration   */
    console.log("I'm inside gun ");
}

/* Result ---> I'm inside gun  */



/*----------------------------Function On Object ---------------------------  */

let obj = {
    fun :function (){
        console.log ( "This man is called " + this.fullName + ". His age is " + this.age );
    },
    fullName:"Mukesh Dani ",
    age : 22
}

obj.fun();

/*  Result ---> This man is called Mukesh Dani . His age is 22 */