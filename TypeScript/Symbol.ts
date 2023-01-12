/*

Symbol in TypeScript

what is Symbole
ye 1 normal dataType ki trh hai jesa javaScript mai primitive dataType hote hai
same TypeScipt mai ye dataType hai
it give unique ID and hm usse dek nhi skte


*/
let s1 = Symbol();
let s2 = Symbol();
console.warn(s1===s2);//false

console.warn(s1.toString())//Symbol()


// ye hmesa 1 unique id generate krta hai 

let data ={
    [s1]:"Some Data" 
}
console.log(data[s1]);


let DemoF1 = Symbol("d1");

class Demo {
    
     [DemoF1](){
        return "Some Data"
    }
}

let d1 = new Demo();
console.warn(d1[DemoF1]())


