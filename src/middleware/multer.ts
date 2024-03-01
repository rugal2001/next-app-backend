import multer from "multer";
import express from "express";
import cloudinary from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";

const storage = new CloudinaryStorage({
  cloudinary: cloudinary.v2,
  params: { 
    // @ts-ignore*
    folder: () => "new-folder",

  },
});

// const fileFilter = (req:express.Request ,file,cb)=>{
//     if(file.mimetype === 'image/jpeg' || file.mimetype === 'image/jpg' || file.mimetype === 'image/png'){
//         cb(null,true)
//     }else (
//          'error' : 'Unsupported file format | we only support PNG/JPEG & JPG' ,
//         false
//     )
// }

const upload = multer({
  storage,
  // limits: {fieldSize :1024*1024},
  // fileFilter
});

export default upload;
