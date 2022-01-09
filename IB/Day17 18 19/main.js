(function(){
    
   let btnaddFolder = document.querySelector("#addFolder");
   let btnaddTextFolder = document.querySelector("#addTextFolder");
   let divbreadcrumb = document.querySelector("#breadcrumb");
   let divContainer = document.querySelector("#container");
   let templates = document.querySelector("#templates");
   let resources = [];
   let cfid = -1;  //initially we are at root (which has an id of -1 )
  let rid = 0 ;
   btnaddFolder.addEventListener("click" , addFolder);
   btnaddTextFolder.addEventListener("click", addTextFile);

   function addFolder(){
    let rname = prompt("Enter folder name");
      if ( rname!= null){
        rname= rname.trim();
      }
    if (!rname){
        // empty name validation 
        alert("Entered name is not allowed .");
        return ;
    }
    
    // unique name validation 
    let alreadyExists = resources.some(r=>r.rname == rname && r.pid ==cfid);
    if (alreadyExists==true){
        alert(rname +"  is already in use . try some other name.");
        return ;
    }
      let pid = cfid;
      rid++;

      // persist
      //html
      addFolderHTML(rname,rid , pid);
      
      // save ram
      resources.push({
          rid:rid,
          rname:rname,
          pid:cfid
      });
      // storage 
      saveToStorage(); 

   }

   function addTextFile(){
       let tfname = prompt("Enter File Name ");
       console.log(tfname);
   }
   function deleatFolder(){
       
            console.log("in deleat ");
   }
   function addTextFolder(){

   }
   function renameFolder(){
    let nrname = prompt("Enter folder name");
      if ( nrname!= null){
        nrname= nrname.trim();
      }
    if (!nrname){
        // empty name validation 
        alert("Entered name is not allowed .");
        return ;
    }

    let spanRename = this ; 
    let divFolder = spanRename.parentNode;
    let divName = divFolder.querySelector("[purpose=name]");
    let orname = divName.innerHTML;
    let ridTBU = parseInt(divFolder.getAttribute("rid"));
    if ( nrname == orname){
        alert("Please Enter a new name ");
        return;
    }

    let alreadyExists = resources.some(r=>r.rname==nrname && r.pid == cfid );
    if (alreadyExists == true ){
        alter(nrname = "already exists.");
        return ; 
    }
    // Change HTML
    divName.innerHTML = nrname;
    // chnage Ram 
    let resource= resources.find(r=>r.rid == ridTBU);
    resource.rname = nrname;
     // change storage 
     saveToStorage();

   }
   function renameTextFile(){

   }
   function viewFolder(){
    console.log("in View ");
   }
   function viewTextFile(){

   }
  
   function addFolderHTML(rname, rid , pid){
    let divFolderTemplate = templates.content.querySelector(".folder");
    let divFolder = document.importNode(divFolderTemplate, true);

        let divName = divFolder.querySelector("[purpose='name']");
        let spanRename = divFolder.querySelector("[action='rename']");
        let spanDelete = divFolder.querySelector("[action='delete']");
        let spanView = divFolder.querySelector("[action='view']");
   

        spanRename.addEventListener("click", renameFolder);
        spanDelete.addEventListener("click", deleatFolder);
        spanView.addEventListener("click", viewFolder);
           divName.innerHTML = rname;
           divFolder.setAttribute("rid", rid);
           divFolder.setAttribute("pid", pid);
    
    divContainer.appendChild(divFolder);
   }

   function saveToStorage(){
      let rjson = JSON.stringify(resources);// used to convert json to json string  which can be saved 
      localStorage.setItem("data", rjson);
}
   function loadFromStorage(){
        let rjson = localStorage.getItem("data");
        if(!rjson){
            return ;
        }
            resources=JSON.parse(rjson);
            for ( let i = 0 ; i< resources.length;i++){
                if ( resources[i].pid ==cfid){
                addFolderHTML(resources[i].rname , resources[i].rid, resources[i].pid);
            }

            if ( resources[i].rid > rid ){
                rid = resources[i].rid;
            }
        } 
    
   }
   loadFromStorage();
})();
//IIFI --> for prevent nameSpace Collison