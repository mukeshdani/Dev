Function.prototype.myBind = function(){
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

// obj.fun1.call(o2, "Mehwish", "Shailja");
// obj.fun1.apply(o2, ["Mehwish", "Shailja", "Supriya"]);
let boundFunction = obj.fun1.myBind(o2, "Mehwish", "Shailja", "Supriya");
boundFunction("Mukesh", "Suraj");



// call is a function. it is available on all functions. it can be used to call the functions.
// the use case is, if you want to override the default this

// apply is similar to call. It just uses an array to pass arguments

// bind is dis-similar. It doesn't make a call. It gives you a new function to call.


/* ------------------------------------Polifil for Bind method ------------------------------------------ */
let name = {
    firstname: "MUKESH",
    lastname: "DANI"
  }
  
  let printName = function (hometown, state, country) {
    console.log(this.firstname + " " + this.lastname + " , " + hometown + ", " + state + ", " + country);
  }
  
  let printMyName = printName.bind(name, "Dehradun", "Uttarakhand");
  printMyName( "India");
  
  Function.prototype.mybind = function(...args){
    let obj = this,
      params = args.slice(1);
    return function (...args2) {
      obj.apply(args[0], [...params, ...args2]);// ES6 version syntax otherwise we can use cancta method to cancatenate this
    }
  }
  
  let printMyName2 = printName.mybind(name, "Dehradun", "Uttarakhand");
  printMyName2( "India");