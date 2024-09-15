import express from "express"
import cors from "cors"

import bodyParser from "body-parser";
import Todo from "./database.js";

const app = express()
const port = 3000

let corsOptions = {
    origin: 'http://localhost:5173'
}

app.use(cors(corsOptions))
app.use(bodyParser.json());

app.post("/api/item-create", async(req,res)=>{
    try{
      const todo = await Todo.create({
      message: req.body.message,
      completed: req.body.completed,
      })

      res.status(201).json(todo)
    } catch(error){
      console.error('Error creating Todo item:', error)

      res.status(500).json({
        error: 'Error creating Todo item',
    })
}})

app.get("/api/item-retrieve", async(req,res) =>{
    try {
      const todos = await Todo.find({})
      res.status(200).json(todos)
    } catch (error) {
      res.status(500).json({error: 'error fetching todos'})
    }
})

app.post("/api/item-delete", async(req,res)=>{
  try {
    await Todo.findByIdAndDelete(req.body.id)
    res.status(200).json({message: "todo item deleted sucessfully"})
  } catch (error) {
    res.status(500).json({error: "error deleting todo item"})
  }
})

app.post("/api/item-update-checkbox", async(req,res) =>{
  try {
    await Todo.findByIdAndUpdate(req.body._id, {completed: req.body.completed})
    res.status(200).json({message: "checkbox updated sucessfully"})
  } catch (error) {
    res.status(500).json({error: "error updating checkbox"})
  }
})


app.listen(port, () =>{
    console.log(`Example app listening on port ${port}`)
})
