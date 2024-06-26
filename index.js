const port = 4000;
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const Employee = require("./model/employee");

app.use(express.json());
app.use(cors());

//Database Connection 
mongoose.connect("mongodb+srv://hubertmichaelseelan:7LG8GuS5B4ze05VU@cluster0.44dmf2y.mongodb.net/empdata");
mongoose.connection
.once("open",() => console.log("DB Connected"))
.on("error",(error)=>{
  console.log(`ERROR : ${error}`);
})

app.post("/createEmp", async(req, res)=>{
  let employees = await Employee.find({});
  let emp_id;
  if(employees.length>0){
    let last_employee_array = employees.slice(-1);
    let last_employee = last_employee_array[0];
    emp_id = last_employee.emp_id+1;
  }else{
    emp_id= 1;
  }
  const employee = new Employee({
    emp_id: emp_id,
    name: req.body.name,
    dob: req.body.dob,
    phone: req.body.phone,
    email: req.body.email,
    department: req.body.department,
    doj: req.body.doj,
    rep: req.body.rep,
    experience: req.body.experience,
    salary: req.body.salary,
    linkedin: req.body.linkedin,
    // idproof: req.body.idproof,
  });
  console.log(employee);
  await employee.save();
  console.log("Saved");
  res.json({
    success: 1,
    name: req.body.name,
  })
})
app.put("/updateEmp/:id", (req, res)=>{
  const id = req.params.id;
  Employee.findByIdAndUpdate({_id:id},{
    name: req.body.name,
    dob: req.body.dob,
    phone: req.body.phone,
    email: req.body.email,
    department: req.body.department,
    doj: req.body.doj,
    rep: req.body.rep,
    experience: req.body.experience,
    salary: req.body.salary,
    linkedin: req.body.linkedin,
    idproof: req.body.idproof,
  })
  .then(employee => res.json(employee))
  .catch(error => console.log(error))
})
app.delete("/deleteEmp/:id",(req, res)=>{
  const id = req.params.id;
  Employee.findByIdAndDelete({_id:id})
  .then(employee => res.json(employee))
  .catch(error => console.log(error))
})
app.get("/",(req, res)=>{
  res.send("Express App is Running")
})
app.get("/allEmp",(req, res)=>{
  Employee.find({})
  .then(employee => res.json(employee))
  .catch(error => console.log(error))
})
app.get("/getEmp/:id",(req, res)=>{
  const id = req.params.id
  Employee.findById({_id:id})
  .then(employee => res.json(employee))
  .catch(error => console.log(error))
})

app.listen(port,(error)=>{
  if(!error){
    console.log("Server is Running on Port "+port)
  }else{
    console.log("Error: "+error)
  }
})