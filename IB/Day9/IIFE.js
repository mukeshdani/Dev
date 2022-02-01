/* (function(){
    //console.log("HII: I'm am IIFE")
     let uname = prompt("What is your name ");
     alert("Hello"+uname);
})(); */

// IIFE --> Immediatelt invoked function execution 

/* ----------------question ---------------- */
/* let interval = setInterval((function()
   {
    let un = prompt("Please enter the Interval: ");
     setInterval((function(){
        for ( let i = 0 ; i<un ; i++)console.log(i);
    })(),[un]);
    (function() {alert("alert counted : "+un);})();
       })(),[un]);

 */

       // Page load ---> ask the user for time 
       // console.log ()
       // alert --> done
       (function(){
           let timeUnits =parseInt( prompt("How muuch to count "));
           let interval = parseInt(prompt("Log after how much interval "));
          
           // Calls the handelCall function after every interval second (passed as millis)
           let iid = setInterval(handlecalls , interval * 1000);
// return an id used to stop calling via clear interval 
     handlecalls.orgTU = timeUnits;
     // Function can be used as a store of properties ( much like objects)
     // Function Static property

           function handlecalls(){
               console.log(timeUnits + " lefts");
               timeUnits-=interval ;
               if (timeUnits <= 0 ){
                   clearInterval(iid);
                   //alert( timeUnits + "Done");// timeUnits =0 ;
                   // trick --> extra varibale

                   alert( handlecalls.orgTU + "Done");
               }
           }
       })();


    /* diffrence between setInterval and setTimeOut */
    //setInterval is aclling again again
    // setTimeOut is only calling one time 



// Different Type of function call
//1. normall 
//2. call
//3. apply 
//4. bind 