const request= require("request");

const cheerio = require("cheerio");


request("https://www.worldometers.info/coronavirus/",cb)

function cb(error, response, html) {
   if (error){
       console.error( error);
   }else{
       handlehtml(html);
   }
  };


  function  handlehtml(html){ //in selector tool we are geeting the whole html of a page
      let SetTool =cheerio.load(html);

      let contentArr= SetTool('#maincounter-wrap span');

       //  for(let i=0 ; i<contentArr.length; i++){
  //        let data = selTool(contentArr[i]).text()
  //        console.log('data' , data)
  // 

      let totalCase = SetTool(contentArr[0]).text();
      let totalDeath = SetTool(contentArr[1]).text();
      let totalRev= SetTool(contentArr[2]).text();

      console.log ( 'Total Cases : ',totalCase);
      console.log ( 'Total Death : ',totalDeath);
      console.log ( 'Total Rev : ',totalRev);

  }