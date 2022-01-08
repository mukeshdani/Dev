(function(){
   let btnaddFolder = document.querySelector("#addFolder");
   let btnaddTextFolder = document.querySelector("#addTextFolder");

   btnaddFolder.addEventListener("click" , addFolder);
   btnaddTextFolder.addEventListener("click", addTextFile);

   function addFolder(){
        let fname = prompt("Enter Folder name ");
        console.log(fname);
   }

   function addTextFile(){
       let tfname = prompt("Enter File Name ");
       console.log(tfname);
   }
})();
//IIFI --> for prevent nameSpace Collison