import mongoose from "mongoose";
import dotenv from "dotenv"

if (process.env.NODE_ENV !== 'production') {
  dotenv.config();  // Load .env in development
}

const databaseURL = process.env.DATABASE_URL

mongoose.connect(`${databaseURL}`)
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