const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const registerRouter = require("./routes/register");
const addtaskRouter = require("./routes/addtask");
const auth = require("./routes/auth");

require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(cors({ credentials: true, origin: "http://localhost:3000" }));

if (!process.env.task_jwtprivate) {
  console.log("FATAL ERROR: jwtprivate key not defined.");
  process.exit(1);
}

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});
const connection = mongoose.connection;
connection.once("open", () => {
  console.log("MongoDB database connection established sucessfully");
});

app.use("/register", registerRouter);
app.use("/home", addtaskRouter);
app.use("/auth", auth);

app.listen(PORT, () => console.log(`Server starting at port ${PORT}`));
