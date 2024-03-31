const port = 4000;
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const EmployeeModel = require("./model/employee")

app.use(express.json());
app.use(cors({origin: true}));

//Database Connection 
mongoose.connect("mongodb+srv://hubertmichaelseelan:7LG8GuS5B4ze05VU@cluster0.44dmf2y.mongodb.net/employee");
mongoose.connection
.once("open",() => console.log("DB Connected"))
.on("error",(error)=>{
  console.log(`ERROR : ${error}`);
})

app.post("/createEmp", (req, res)=>{
  EmployeeModel.create(req.body)
  .then(employee => res.json(employee))
  .catch(error => res.json(error))
})

//API Creation
app.get("/",(req, res)=>{
  res.send("Express App is Running")
})

app.listen(port,(error)=>{
  if(!error){
    console.log("Server is Running on Port "+port)
  }else{
    console.log("Error: "+error)
  }
})