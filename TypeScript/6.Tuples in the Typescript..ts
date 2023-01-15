/* 
number > javaScript  , typeStript 


string > js and ts 
boolean > js and ts
Object > js and ts
array > js and ts


*/


/* only supported in typeStript  
   
tuple > typeStript 


*/

let person4:{
    name : string ;
    age : number ; 
    hobbies: string[];
    role:[number , string ]
}={
    name : 'leela ',
    age : 20,
    hobbies : ['name' , 'age'],
    role : [2 , 'author ']
}

 person4.role.push('admin');// no errror its an exception 

person4.role[1] = 'abce';
person4.role[0] = 10;
//person4.role = [34 , 'hello ' , 'heelll']  error 

// role is a tuple 

