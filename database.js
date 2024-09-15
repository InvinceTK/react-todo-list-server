import mongoose from "mongoose";

mongoose.connect('mongodb://127.0.0.1:27017/todo')
  .then(() => {
    console.log("Database connected");
  })
  .catch((error) => {
    console.error("Error connecting to database: ", error);
  });

const todoSchema = {
    message: String,
    completed: Boolean,
}

const Todo = mongoose.model("todo", todoSchema)

export default Todo