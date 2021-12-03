
function treeFn(dirpath){
    if(dirpath == undefined){
      console.log("Please enter a valid Path")
    }
  
    else {
      let doesExist = fs.existsSync(dirpath)
      if(doesExist){
         treeHelper(dirpath , " ")
      }
    }
  }
  
  
  function treeHelper(dirpath , indent){
    let isFile = fs.lstatSync(dirpath).isFile()
   
    if(isFile==true){
       let fileName = path.basename(dirpath)
       console.log(indent + "├──" + fileName)
    }
   
    else{
   
      let dirName = path.basename(dirpath)
      console.log(indent + "└──" + dirName )
   
      let children = fs.readdirSync(dirpath)
   
      for(let i=0 ; i<children.length ; i++){
        let childPath = path.join(dirpath , children[i])
          treeHelper(childPath , indent + '\t')
   
      }
   
    }
   }

   module.exports={
       treeKey:treeFn
   }