(function(){
   let btnaddFolder = document.querySelector("#addFolder");
   let btnaddTextFolder = document.querySelector("#addTextFolder");
   let divbreadcrumb = document.querySelector("#breadcrumb");
   let divContainer = document.querySelector("#container");
   let templates = document.querySelector("#templates");

   btnaddFolder.addEventListener("click" , addFolder);
   btnaddTextFolder.addEventListener("click", addTextFile);

   function addFolder(){
    let fname = prompt("Enter folder name");
    let divFolderTemplate = templates.content.querySelector(".folder");
    let divFolder = document.importNode(divFolderTemplate, true);

        let divName = divFolder.querySelector("[purpose='name']");
        let spanRename = divFolder.querySelector("[action='rename']");
        let spanDelete = divFolder.querySelector("[action='delete']");
        let spanView = divFolder.querySelector("[action='view']");
   

        spanRename.addEventListener("click", renameFolder);
        spanDelete.addEventListener("click", deleatFolder);
        spanView.addEventListener("click", viewFolder);
           divName.innerHTML = fname;
    
    divContainer.appendChild(divFolder);
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
    console.log("in rename ");
   }
   function renameTextFile(){

   }
   function viewFolder(){
    console.log("in View ");
   }
   function viewTextFile(){

   }
   function saveToStorage(){

   }
   function loadFromStorage(){

   }
   loadFromStorage();
})();
//IIFI --> for prevent nameSpace Collison