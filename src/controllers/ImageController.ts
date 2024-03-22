import express from "express";
export const uploadImg = (req: express.Request, res: express.Response) => {
  if (req.file) {
    res.status(200).json(req.file.path);
  } else {
    return res.status(400).json({
      message: "No file uploaded",
    });
  }
};
