const express = require ("express");
const fs = require ("path");
const util = require ("util");
const path = require("path");
const notes = require("./db/db.json");
const { readFileSync, writeFile } = require("fs");
const { dirname } = require("path");
//server 
const app = express();
const PORT = process.env.PORT || 3001;
//middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));


app.get("/notes", (req, res)=>{
  res.sendFile(path.join(__dirname,"public/notes.html"))
});

//route api db.json
app.get("/api/notes", (req, res)=>{
  res.sendFile(path.join(__dirname,"./db/db.json"))
});

app.post("/api/notes", async (req,res) => {

  console.log("check:", req.body.title, req.body.text);
  //read file
  const file = await readFileSync(path.join(__dirname,"./db/db.json"))
  //convert to json
  const fileObj = JSON.parse(file);
  //add to json
  fileObj.push({
    title: req.body.title,
    text: req.body.text
  })
  console.log(fileObj);
  //conver to string and write
  writeFile(path.join(__dirname,"./db/db.json"),JSON.stringify(fileObj),{},
  ()=>{
    res.sendFile(path.join(__dirname,"./db/db.json"))
  })
  




  //write to file


})

app.listen(PORT,()=>{

  console.log("server listening on port " + PORT)
})

