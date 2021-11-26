// ab hm yha pe aapna khud ka modeule create krne ja rhe hai 
//jisme hm simple calculator bna rhe hai uske lis alg alg function create krenge 

function add (a,b){
    console.log("the Addition is ", a+b)
}

function sub (a,b){
    console.log("the subtraction is ", a-b)
}

function mul (a,b){
    console.log("the multiplication is ", a*b)
}
function div(a,b){
    console.log("the division is ", a/b)
}


// ab yha se export krna pdega taki koi file mai isse use kr paye

module.exports={
    addition:add,
    subtraction : sub ,
    division : div ,
    multiplication:mul
}