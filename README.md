
<h1 align="center">Full Stack Web development 💥</h1>

**[Full Stack Web development 👉](https://github.com/mukeshdani/Dev)** 

<div align="center">

<a href="https://github.com/mukeshdani/Dev"><img alt="GitHub contributors" src="https://img.shields.io/github/contributors/mukeshdani/Dev?color=2b9348"></a>
<a href="https://github.com/mukeshdani/Dev"><img src="https://img.shields.io/badge/language-HTML-green.svg"></a>
<a href="https://github.com/mukeshdani/Dev"><img src="https://img.shields.io/badge/language-CSS-green.svg"></a>
<a href="https://github.com/mukeshdani/Dev"><img src="https://img.shields.io/badge/language-JavaScript-green.svg"></a>
<a href="https://github.com/mukeshdani/Dev"><img src="https://img.shields.io/badge/language-React.js-green.svg"></a>
<a href="https://github.com/mukeshdani/Dev"><img src="https://img.shields.io/badge/language-Node.js-green.svg"></a>

</div>

In This repo I am adding all documentation and other code related this Courses . I am Updating this repository every day :)


## Technology 👇
-HTML5

-CSS3

-JavaScript

-React.js

-Node.js

-Git Hub 
 ## Platform 👇


-[Pepcoding](https://www.pepcoding.com/)

-[Nados](https://nados.pepcoding.com/)

-[Leetcode](https://leetcode.com/)

-[Visual Studio code editor](https://code.visualstudio.com/)

### contact 
💼 Pull requests help you collaborate on code with me [issues and pull requests](https://github.com/mukeshdani/Dev/pulls) :)

 💼 if you have any doubt? do reach, [email](mailto:mukeshdani00@gmail.com) :)
 
 

<h1 align="center">Getting Started 💥</h1>
 
 <h3 align="center">First Class: 18/Nov/2021</h3>
 
 ## Introduction 
 
 ### Installation & Course
 
* **Node JS:**  

     * Windows/MacOS: https://nodejs.org/en/download/

     * **Linux :**
        * sudo apt update
        * sudo apt install nodejs
      
        * To check go to teminal cmd-> node -v

* **vscode:** https://code.visualstudio.com/Download

*  **. Git:**

     * **Linux:** https://git-scm.com/download/linux  (commands follow)

     * **Macos:** https://sourceforge.net/projects/git-osx-installer/

     *  **Windows:** https://git-scm.com/downloads

* **VS Code** 

   * Settings
     * autosave - enable
     * Change Font Size 

* **Code in js**
 
   * Create test.js file in Vs code
     * Print hello world using Code console.log('Hello world');

 * **Variables**
   * Var 
   * let 
   * Const
   

   
   <h3 align="center">Second Class: 19/Nov/2021</h3>

* **Environment**
  
   * Browser 
   * Node.js
   * JavaScript Engines
       * Chrome
           * V8 
       * Firefox
           * spider monkey
       * IE
           * chakra


  * **HTML** (Hypertext Markup Language)
     * Markup language
     * Skeleton

* **JavaScript**
  
    * Synchronous Language 
  
       * means Run line by line  
  
    * Single threaded language 
    * Dynamic Language
       * means example var a ; (reasign data type)
       *        a= 20 
                a = 'hello'

* **Variables :** DeepDrive 
  
   * Var
      
      * Var Keyword  allows us to redeclared a variable
      * allowed Reassigning 

   * let
  
      * let Keyword does not allows us to redeclared a variable
      * allowed Reassigning 
  

   * Const 
      * Const Keyword does not allows us to redeclared a variable
      *  not allowed Reassigning



* **Problem with Var Keyword**
    * **1 peoblem :** Redeclaration
       * Solved by using let keyword  
   *  **2 problem:** Scoping
       * Solved by using let keyword 

## String 
  
  * let str = 'pepcoding'
      * Console.log(str) -->o/p->pepcoding

 * **String Methods**
    * **.length**
       * Console.log(str.length) 
    
    * **Extracting a Part of String**
      * **slice(starting index,ending index)** : return sliced array from starting to (ending -1) 
      * **substr(start , length )** : It except Staring index and length of the word
  * **Replace Method**
     * Expect the word to be replaced as first argument and the replacable second argument
          *        let sayHello = 'Hello Mukesh '
                    Console.log(sayHello)--->o/p->Hello Mukesh 

                    let sayBye =sayHello.replace('Hello' ,'Bye') --->o/p-->Bye Mukesh        
  * **toUppercase and toLowerCase**
    *  text.toUpperCase()
        *        let text1 = 'Hello World'
                  let text2 = text1.toUpperCase()-->HELLO WORLD
                  let text3 = text1.toLowerCase()-->hello world         
  * **Concatenation**
    * firststr.Concat(secondStr)
       *          let firstStr = 'Hello'
                  let secondStr = 'world'
                  let concatenatedStr = firstStr.Concat(secondstr)
                  output:- concole.log(concatenatedstr)-->HelloWorld
                  or 
                  concole.log(' ',concatenatedstr)-->Hello World
  * **Trim** 
    * text.trim 
       *          let text = '       Hello World      '
                   let trimmedText = text.trim()
                   console.log(trimmedText)-->Hello World
       * It remove the Space

<h3 align="center">Third Class: 20/Nov/2021</h3>


## **Functions**
  
  * Functions
  
      * Function expects arguments  
   
              function sayHi(){
                 console.log("hi")
               }


                 sayHi()
                 sayHi()
                 sayHi()

             function add(a , b){
              console.log(a+b)
                return a+b
              }

               let sum = add(4 ,3) // function call
               console.log('the sum is' , sum)


 * In JavaScript functions are known as **first class Citizens** 

      *  You can treat functions as variables in JavaScript
        

* This is also known as function Expression
    * anonymous functions
 
               let sayHi = function(a){
              console.log(a) 
               } 

               sayHi(2) // prints 2


* IIFE (Immediately invoked function expression)

               let add = (function(a,b){
                   return a+b
                    })(10 , 20)


 
## **Arrays** 

  * Array is initialized with square brackets
  
         let arr = [1 , 'Hello', 3, true] 
     * In JS you can put any kind of data in the array 
      
                       console.log(arr)

* **Array Methods**
  
        let cars = ["BMW" , "Jaguar" , "Mercedes"]
        console.log(cars)

* **replace an Element in an array**

       cars[1] = 'Bentley'
        console.log(cars) 

          Add a new elemnet to an Array
          cars[5] = 'Audi'
         console.log(cars)

* **lenghth of an Array**

        console.log(cars.length) 

* **Array Manipulation Methods-**
   *  pop() 
       *  it takes out elemnet from the end of the array

               let cars = ['BMW', "Jaguar" , "Mercedes"]

                let poppedCar = cars.pop()
                console.log(poppedCar)

                console.log(cars)

  * push() 
     * it adds an elemnet at the end of an aaray
  
                         cars.push('alto')
                         console.log(cars)


  * shift()
     *  it removes element from the starting of the array

                  let shiftedCar = cars.shift()
                    console.log(shiftedCar)
                    console.log(cars)

    * unshift()
 
      * it adds an element at the start of an array

                cars.unshift('alto')
               console.log(cars)

##  **Object**

* key value pair 

* to declare an object

                    let obj = {}


                 let captain = {
                  firstName : 'Steve',  
                  lastName : 'Rogers',
                  friends: ['Bucky' , 'Tony Stark' , 'Dr Banner'],
                  isAvenger : true,
                 age:150,
                address:{
                   state : 'New York',
                    city : "Manhatten"
                   },

               sayHi : function fn(){
              console.log('Cap says Hi')
          },
  
          }

        console.log(captain)

* Dot notation

          console.log(captain.friends)

* Bracket Notation
 
           console.log(captain['age'])

           captain.sayHi() 
           

* update object
  
            captain.isAvenger = 'False'
             console.log(captain)

* create something inside an object
 
          captain.movies = ['first Avenger' , "Age of Ultron" , 'Endgame']
         console.log(captain)

* delete Something Inside an object 

          delete captain.age 
          console.log(captain)

* special loop (For in loop) (Specially used for objects)

         for(let key in captain){
            console.log("Key->" , key , 'Value->' , captain[key])
                 } 


<h3 align="center">Forth Class: 25/Nov/2021</h3>

# Node.js
 * InBuild
 * Externally
  
   * npm (node package manager) 
   * Yarn  

## In Build 

* Child process 
 
  * child process is a node module used to create subprocess within a script to    perform 
  
  * different tasks

    * execSync is a child Process method used to execute files 
 
             const cp =  require('child_process')

            console.log('Trying to open Calculator')

            cp.execSync('calc') 
     

           console.log('Calculator Opened')

            console.log('Trying to open Vs Code')
             cp.execSync('code')
             console.log('Vs code Opened')


             cp.execSync('start chrome https://www.pepcoding.com/')

              let output = cp.execSync('node test.js')
              console.log(''+ output) // you can concat with an empty string as well


## Operating System

   * This module is used to get details about an OS of the machine
  
            const os = require('os')

 * tells about the system Architecture (32 or 64 bit)
  
             console.log(os.arch()) 

* tells about the Platform

       console.log(os.platform())

* gives details about the Network you are in

         console.log(os.networkInterfaces()) 

* gives details about the CPU
  
      console.log(os.cpus()) 

## File System

* Node Modules are used to perform different tasks as required

* File System Module-

* ***files**
* 1. we will be reading, writing , updating , deleting files from our script

             const fs = require('fs')
             const path = require('path')
   * readFileSync is a method top read a file
  
             let content = fs.readFileSync('f1.txt') 
            console.log('This is F1 data-> '+ content)

   *  writing to a file
   
      * writeFileSync method is used to put data(write) to a file
          if the file passed doent exist it creates

           a new file and writes to it
                       fs.writeFileSync ('f2.txt' , 'Hello from F2')



* append a file

   *  append file sync adds data to the previously written file
  
     *  basically it appnends a file with new data passed
        
              fs.appendFileSync('f2.txt' , ' this is F2 data')


* delete a file by passing it's path
  *    unlinkSync

            fs.unlinkSync('f2.txt')
           console.log('File Removed')





* **Directories**

  * create
     * mkdirSync is used to create a new directory
      
               fs.mkdirSync('myDirectory')

 * delete

   * rmdirSync is used to remove or delete a directory
    
            fs.rmdirSync('myDirectory')

*  to check whether a directory exists or not we can us existsSync method
    *  if the directory exists the method returns true otherwise false
      
            let doesExist = fs.existsSync('myDirectory')
           console.log(doesExist)


 * stats of a path (details of a folder)
  * lstatsync provides us with all the statistics of a directory

            let statsofPath = fs.lstatSync('myDirectory')
              console.log(statsofPath)

           console.log('isFile?' ,statsofPath.isFile()) 
    * isFile is a metnod that checks wheter a passed path is a file or not
  
          console.log('isDirectory' , statsofPath.isDirectory())

    *   isDirectory that checks wheter a passed path is a directory or not

    *  readdirSync method is used to check the content of a particular directory
      
            let folderPath = 'D:\\FJP2 Dev\\Node Modules\\myDirectory'
            let folderContent = fs.readdirSync(folderPath)
            console.log('directory content '+ folderContent)



* copy files

   *  src file , destFolder

          let srcFilePath = 'D:\\Dev\\Node Modules\\myDirectory\\f3.txt'
           let destFolder = 'D:\\Dev\\Node Modules\\myDirectory2\\'

            let tobecopiedFileName = path.basename(srcFilePath)
            console.log(tobecopiedFileName)
   *  basename method gets the actual name of the file or directory

             let destPath = path.join(destFolder , tobecopiedFileName)
           console.log(destPath)

            fs.copyFileSync(srcFilePath , destPath)
              console.log("file Copied")




