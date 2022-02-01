
/* -------------------------------Bind --------------------------- */
/* Function.prototype.myBind = function(){
    let orgFun = this;//console.log(orgFun); -->[Function: fun1]
    let args = Array.from(arguments); //console.log(args); --->[ { fullName: 'Mukesh1', age: 21 }, 'Mehwish', 'Shailja', 'Supriya' ]
    let boundFun = function(){
        let thisForOrgFun = args[0]; //console.log (thisForOrgFun);-->{ fullName: 'Mukesh1', age: 21 }
        let argsForOrgFun = args.slice(1); // console.log(argsForOrgFun);--->[ 'Mehwish', 'Shailja', 'Supriya' ]
        let argsFromInvocation = Array.from(arguments);  //console.log(argsFromInvocation);--->[ 'Mukesh', 'Suraj' ]
        argsForOrgFun = argsForOrgFun.concat(argsFromInvocation);//console.log(argsForOrgFun);--->[ 'Mehwish', 'Shailja', 'Supriya', 'Mukesh', 'Suraj' ]
        orgFun.apply(thisForOrgFun, argsForOrgFun);
    }
    return boundFun;
} */

/* let obj = {
    fun1: function(frnd1, frnd2){
        console.log("This person is called " + this.fullName + ". His/Her age is " + this.age + ".");
        console.log(this.fullName + " says hello to " + frnd1 + ".");
        console.log(this.fullName + " says hello to " + frnd2 + ".");

     //   console.log(arguments);
    },
    fullName: "Mukesh Dani",
    age: 21
};

// obj.fun1("Navdeep", "Vikas");
let o2 = {
    fullName: "Mukesh1",
    age: 21
};
 */
// obj.fun1.call(o2, "Mehwish", "Shailja");
// obj.fun1.apply(o2, ["Mehwish", "Shailja", "Supriya"]);
//let boundFunction = obj.fun1.myBind(o2, "Mehwish", "Shailja", "Supriya");
//boundFunction("Mukesh", "Suraj");



/* ------------------------------------Call-------------------------- */

/* 
Function.prototype.myCall= function(){
    let orgFun = this;//console.log(orgFun); -->[Function: fun1]
    let args = Array.from(arguments); //console.log(args); --->[ { fullName: 'Mukesh1', age: 21 }, 'Mehwish', 'Shailja', 'Supriya' ]
   let thisForCall = args[0];
   let params = args.slice(1);
   //orgFun.apply(thisForCall,params);

   thisForCall.fun=orgFun;
   thisForCall.fun(...params);
   // ... isse ye array ko alg alg kr deta hai -->[10,20,30]-->10 , 20 , 30 
   delete thisForCall.fun;
}


let obj = {
    fun1: function(frnd1, frnd2){
        console.log("This person is called " + this.fullName + ". His/Her age is " + this.age + ".");
        console.log(this.fullName + " says hello to " + frnd1 + ".");
        console.log(this.fullName + " says hello to " + frnd2 + ".");

     //   console.log(arguments);
    },
    fullName: "Mukesh Dani",
    age: 21
};

// obj.fun1("Navdeep", "Vikas");
let o2 = {
    fullName: "Mukesh1",
    age: 21
};



//obj.fun1.call(o2, "Mehwish", "Shailja");
obj.fun1.call(o2, "Mehwish", "Shailja"); */



/* -----------------------Apply ---------------- */



Function.prototype.myApply= function(){
    let orgFun = this;//console.log(orgFun); -->[Function: fun1]
    let args = Array.from(arguments); //console.log(args); --->[ { fullName: 'Mukesh1', age: 21 }, 'Mehwish', 'Shailja', 'Supriya' ]
   let thisForCall = args[0];
   let params = args[1];
   
   thisForCall.fun=orgFun;
   
   thisForCall.fun(...params);
   // ... isse ye array ko alg alg kr deta hai -->[10,20,30]-->10 , 20 , 30 
   delete thisForCall.fun;
   // hm original o2 ko kharab nhi krna islia 
}


let obj = {
    fun1: function(frnd1, frnd2){
        console.log("This person is called " + this.fullName + ". His/Her age is " + this.age + ".");
        console.log(this.fullName + " says hello to " + frnd1 + ".");
        console.log(this.fullName + " says hello to " + frnd2 + ".");

     //   console.log(arguments);
    },
    fullName: "Mukesh Dani",
    age: 21
};

// obj.fun1("Mukesh4", "Suraj4");
let o2 = {
    fullName: "Mukesh1",
    age: 21
};



//obj.fun1.apply(o2, "Mehwish", "Shailja");
obj.fun1.myApply(o2, ["Mehwish", "Shailja"]);