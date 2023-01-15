let person3 = {
    name : ' leela ',
    age : 31,
    hobbies : ['name ', ' age ' , ' casees']
};
let fav : string[];
let fav1 : any[];

fav  = ['animal'];
fav1 = ['animals' , 1];

for(let hobby of person3.hobbies){
    console.log(hobby.toLowerCase());
    //hobby.map() thow error because map is only used in array not in string 
}

