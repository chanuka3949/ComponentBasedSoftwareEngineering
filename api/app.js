const express = require("express");
const cors = require("cors");
const connectToDatabase = require("./mongoClient");
const errorHandler = require("./middleware/errorHandler");
const UserService = require("./components/User/UserService");
const FileService = require("./components/File/FileService");

const app = express();
const port = process.env.PORT || 5500;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//Services
app.use("/api/users", UserService);
app.use("/api/files", FileService);

//Error Handling
//app.use(errorHandler);

//Connect to Database
connectToDatabase();

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
