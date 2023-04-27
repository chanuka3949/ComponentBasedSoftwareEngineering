const express = require("express");
const cors = require("cors");
const connectToDatabase = require("./mongoClient");

const UserService = require("./components/File/FileService");

const app = express();
const port = process.env.PORT || 5500;

app.use(cors());
app.use(express.json());

//Services
app.use("/api/users", UserService);
app.use("/api/files", FileService);

//Error Handling
app.use(errorHandler);

//Connect to Database
connectToDatabase();

app.listen(port, () => {
  console.log("Server listening on port 3000");
});
