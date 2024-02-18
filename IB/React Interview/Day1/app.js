console.log("Testing")

//    const heading = document.createElement("h1");
//    heading.innerHTML = "Hello World! from javascript...."

//    const root = document.getElementById("root");
//    root.appendChild(heading)   

const heading = React.createElement(
    "h1", //type
    { id: "heading" }, //attributes
    "Hello Word From React!..." //Children
)

console.log(heading) // return an object

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(heading)

