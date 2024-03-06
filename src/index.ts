import express, { json, urlencoded } from "express";
import mongoose from "mongoose";
import router from "./routes";
import cors from "cors";
const bodyParser = require("body-parser");
// import { cloudinaryConfig ,uploader } from '../src/utils/cloudinary';
// import {upload ,  from '../src/middleware/multer'

const app = express();
const port = 4000;

app.use(express.json());
app.use(urlencoded({ extended: false }));
app.use(json());

app.use(cors());
app.use("/", router);

/////////////////////////////////////////////////////
////////////// DATABASE CONFIGURATION  //////////////
const MONGO_URL = "mongodb://localhost:27017";
mongoose
  .connect(MONGO_URL, {
    dbName: "mern-post",
  })
  .then(() => {
    console.log("Database Connected");
  })
  .catch((error) => {
    console.log(error);
  });
///////////////////////////////////////////////////////

app.listen(port, () => {
  console.log(`listening in port http://localhost:${port} `);
});
