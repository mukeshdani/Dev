
// Expample -1 
let array = ["mukesh", "Dani", "Parth","Joshi"];
// "Mukesh Sural Dani" -> ["Mukesh", "Sural", "Dani"];

function giveInitials(fullName) {
    let namesArray = fullName.split(" ")
    let firstInitial = namesArray[0].charAt(0);
    let secondInitial = namesArray[1].charAt(0);


    // console.log(firstInitial + secondInitial);

    return firstInitial + secondInitial;
}
let initialsWalaArray = array.map(giveInitials);
// console.log(initialsWalaArray);


                         /*Example 2  */

let arr = [5, 7, 19, 12, 13, 14];

function squarer(x) {
    return x * x;
}
let squaredArr = arr.map(squarer);
console.log(squaredArr);

