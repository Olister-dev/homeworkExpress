const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
// const morgan = require("morgan");
const authorRouter = require("./routes/authors.js");

const port = 3000;

dotenv.config();

mongoose.connect(
  process.env.MONGO_URL,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  },
  () => {
    console.log("connected to mongoDB");
  }
);

//body parser midleware
app.use(express.json());
// app.use(morgan("common"));

app.use("/authors", authorRouter);

app.listen(port, () => {
  console.log(`Server listening on ${port}...`);
});
