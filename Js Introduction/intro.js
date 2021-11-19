//console.log("hello from the Node ");

//loops and if else 


let flag = true 
var num = 13 
for (let i = 2 ; i<=num ; i++){
    if (num % i ==0){
        flag = false 
         break
    }
}
if ( flag){
  console.log("number is prime " , num)
}else {
    console.log("number is not prime")
}

