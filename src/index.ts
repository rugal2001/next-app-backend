import express, { json, urlencoded } from "express";
import mongoose from "mongoose";
import router from "./routes";
import cors from "cors";

const bodyParser = require("body-parser");
// import { cloudinaryConfig ,uploader } from '../src/utils/cloudinary';
// import {upload ,  from '../src/middleware/multer'

declare global {
  namespace Express {
    interface Request {
      user: Record<string, any>;
    }
  }
}

const app = express();
const port = 4000;

app.use(express.json());
app.use(urlencoded({ extended: false }));
app.use(json());

app.use(cors());
app.use("/", router);

require('dotenv').config();

/////////////////////////////////////////////////////
////////////// DATABASE CONFIGURATION  //////////////

if (!process.env.MONGODB_URI) {
  console.error("MONGODB_URI environment variable is not defined.");
  process.exit(1); // Exit the application if MongoDB URI is not defined
}
mongoose
  .connect(process.env.MONGODB_URI, {
    dbName: "mern-post",
  //   useNewUrlParser: true,
  // useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Database Connected");
  })
  .catch((error) => {
    console.log("Database Error => ",error);
  });
///////////////////////////////////////////////////////

app.listen(port, () => {
  console.log(`listening in port http://localhost:${port} `);
});
