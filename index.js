const express = require("express");
const mongoose = require('mongoose')
const chats = require("./data/data");
const dotenv = require("dotenv");
const userRoutes = require("./routes/userRoutes");
const chatRoutes = require("./routes/chatRoutes");
const { notFound, errorHandler } = require("./middleware/errorMiddleware");
const app = express()
dotenv.config();
const connection= async ()=>{
  const MONGO_URI = process.env.MONGO_URI;
  const c = await mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}) 
  .then(() => {
    console.log(`Connected to MongoDB:${MONGO_URI}`);
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });
}
connection();

app.use(express.json())
app.use("/api/user",userRoutes);
app.use("/api/chat",chatRoutes);

app.use(notFound);
app.use(errorHandler)

const PORT = process.env.PORT || 5000;
app.listen(PORT,(e)=>{
    if(e) throw e;
    console.log("http://localhost:5000");
});