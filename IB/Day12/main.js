
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
    let fid = 0;
    let folders = [];

    btnAddFolder.addEventListener("click", addFolder);

    function addFolder(){
        let fname = prompt("Folder name?");
        if(!fname){
            return;
        }

        fid++;
        addFolderInPage(fname, fid);

        folders.push({
            id: fid,
            name: fname
        });
        persistFoldersToStorage();
    }

    function deleteFolder(){
        let divFolder = this.parentNode;
        let divName = divFolder.querySelector("[purpose='name']");

        let flag = confirm("Do you want to delete the folder " + divName.innerHTML);
        if(flag == true){
            divContainer.removeChild(divFolder);
            
            let idx = folders.findIndex(f => f.id == parseInt(divFolder.getAttribute("fid")));
            folders.splice(idx, 1);
            persistFoldersToStorage();
        }
    }

    function editFolder(){
        // yha pe ab hame closure mai nhi milega kuch islia 
        //this use kr rke hai this mai parent mai jake chcek kr rhe honge 
        let divFolder = this.parentNode;
        
        let divName = divFolder.querySelector("[purpose='name']");

        let fname = prompt("Enter the new folder name");
        if(!fname){
            return;
        }

        divName.innerHTML = fname;

        let folder = folders.find(f => f.id == parseInt(divFolder.getAttribute("fid")));
        folder.name = fname;
        persistFoldersToStorage();
    }

    function addFolderInPage(fname, fid){
        let divFolderTemplate = pageTemplates.content.querySelector(".folder");
        let divFolder = document.importNode(divFolderTemplate, true);

        let divName = divFolder.querySelector("[purpose='name']");
        divName.innerHTML = fname;
        divFolder.setAttribute("fid", fid);

        let spanDelete = divFolder.querySelector("span[action='delete']");
        spanDelete.addEventListener("click", deleteFolder);

        let spanEdit = divFolder.querySelector("span[action='edit']");
        spanEdit.addEventListener("click", editFolder);

        divContainer.appendChild(divFolder);
    }

    function persistFoldersToStorage(){
        console.log(folders);
        let fjson = JSON.stringify(folders);
        localStorage.setItem("data", fjson);
    }

    function loadFoldersFromStorage(){
        let fjson = localStorage.getItem("data");
        if(!!fjson){
            folders = JSON.parse(fjson);
            folders.forEach(function(f){
                addFolderInPage(f.name, f.id);
            })
        }
    }

    loadFoldersFromStorage();
})();
