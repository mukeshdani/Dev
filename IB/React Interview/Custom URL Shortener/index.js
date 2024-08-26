const express = require("express")
const {connectToMongoDB} = require("./connect")
const urlRoute = require("d:/OneDrive - Adani/Desktop/Pandas/Dev/IB/React Interview/Custom URL Shortener/index.js");

const app  = express()
connectToMongoDB('mongodb://localhost:27017/short-url')
.then(()=>console.log("MongoDB Connected"))

const PORT = 8001
app.use('/url' ,urlRoute)

app.listen(PORT , ()=> console.log(`Server Started  on PORT: ${PORT}`))


