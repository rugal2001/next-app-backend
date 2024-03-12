import express from 'express'
export const uploadImg = (req: express.Request, res: express.Response) => {
    console.log("yes here !!!!!")
    if (req.file) {
      console.log({ r: req.file });
      console.log("yes gere")
      res.status(200).json(req.file.path);
    } else {
      return res.status(400).json({
        message: "No file uploaded",
      });
    }
  };