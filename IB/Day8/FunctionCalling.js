/* -----------------Function Calling ------------------------ */

function fun ( a, b ){
    console.log ( a + " "+ b );
}

fun();               /* Result --> undefined undefined */
fun(10);             /* Result --> 10 undefined */
fun(10 , 20 );       /* Result --> 10 20 */
fun( 10 , 20 , 30);  /* Result --> 10 20 */

/* -------------------Argument ------------------ */
// Argument 
// agument is like array but not exectly array 
// in argument we use loops but not Map/filter/reduce 


// we can convert argument into pure array but using 
// 1. from 


function fun ( a, b ){
    console.log ( a + " "+ b );
    console.log ( arguments );
    let res = Array.from(arguments);
    let sq = res.map(x=>x*x);
}
fun();             
fun(10);            
fun(10 , 20 );      
fun( 10 , 20 , 30);

/* Result ---> undefined undefined
[Arguments] {}
10 undefined
[Arguments] { '0': 10 }
10 20
[Arguments] { '0': 10, '1': 20 }
10 20
[Arguments] { '0': 10, '1': 20, '2': 30 }
 */



// For converting array 
// 1. Array.from("string ");
// 2. Array.of(10,20,30);