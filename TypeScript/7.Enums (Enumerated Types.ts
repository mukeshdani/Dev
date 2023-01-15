/* 
Enums > typeScript 
*/

enum ROLES {
    ADMIN , 
    AUTHOR,
    GUEST
}

let person5={
    name : 'leela ',
    age : 31,
    hobbies : ['task' , 'test'],
    role : ROLES.ADMIN
};

if(person5.role == ROLES.ADMIN){
    console.log(" user is admin ");
}


