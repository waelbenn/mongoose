const express = require('express')
const app = express()
const mongoose= require('mongoose')
app.use(express.json())
const port=5000
app.listen(port,()=>console.log("listening in port 5000"))

mongoose.connect("mongodb+srv://waelbenn:<password>@cluster0.esu4mzf.mongodb.net/?retryWrites=true&w=majority",()=>
console.log("database is connect"));
