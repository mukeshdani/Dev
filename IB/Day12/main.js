(function(){

    /*  let btn = document.querySelector("#myId");
    let divContainer = document.querySelector("#container");
    let myTemplates = document.querySelector("#myTemplate");

    btn.addEventListener("click", function(){
        let fname = prompt("Enter a folder's name");
        
        let divFolderTemplate = myTemplates.content.querySelector(".folder");
        let divFolder = document.importNode(divFolderTemplate, true);

        divFolder.innerHTML = fname;
        divContainer.appendChild(divFolder); */
        
    let btnAddFolder = document.querySelector("#btnAddFolder");
    let divContainer = document.querySelector("#divContainer");
    let pageTemplates = document.querySelector("#pageTemplates");

    btnAddFolder.addEventListener("click", function(){
        let fname = prompt("name set kro folder ka  ");
        if(fname==null){
            return;
        }
         // codey from krne k lia ye kia hai
        let divFolderTemplate = pageTemplates.content.querySelector(".folder");
        let divFolder = document.importNode(divFolderTemplate, true);// true nhi kia toh us div ke ander wale nhi aayega 

        let divName = divFolder.querySelector("[purpose='name']");// jb khud ka attribute use krna hai toh esa type krte hai 
        divName.innerHTML = fname;

        divContainer.appendChild(divFolder);

    });
})();