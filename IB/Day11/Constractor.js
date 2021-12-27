function Person(name , age){
    this.name = name;
    this.afe = age;
    this.sayHi= function(f1){
        console.log(this.name + "[" + this.age + "] says hi to " + f1 );
    }
}


let p1 = new person ("Mukesh ", 34 );// new object creat
p1.sayHi("Dani");