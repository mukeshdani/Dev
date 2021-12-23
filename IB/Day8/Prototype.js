// mycall


let obj = {
    fun1 : function (frnd1 , frnd2){
        console.log("This man is called "+ this.fullName +" . his age is "+ this.age );
        console.log( this.fullName + " Say hello to "+ frnd1);
        console.log( this.fullName + " Say hello to "+ frnd2);
    },
    fullName : " Mukesh Dani ",
    age : 21
}
obj.fun1("Mukesh3" , "mukesh4");