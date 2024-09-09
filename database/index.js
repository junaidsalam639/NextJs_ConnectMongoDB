const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const UserRoutes = require("./UserRoutes/UserRoutes");

mongoose
  .connect(
    "mongodb+srv://junaidsalam639:junaid@cluster0.ap3tm.mongodb.net/"
  )
  .then(() => {
    console.log("Connected to DB");
  })
  .catch((err) => {
    console.log(err);
  });

app.use(express.json());
app.use(cors());
app.use("/users", UserRoutes);

app.get("/", (req, res) => {
  res.send("Hello World");
});

const PORT = 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
