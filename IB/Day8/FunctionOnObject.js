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