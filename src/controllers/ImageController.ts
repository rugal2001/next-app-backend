import express from "express";

export const uploadImg = (req: express.Request, res: express.Response) => {
  try {
    if (req.file) {
      const filePath = req.file.path;
      res.status(200).json({ filePath });
    } else {
      return res.status(400).json({
        message: "No file uploaded",
      });
    }
  } catch (error) {
    console.error("Error uploading image:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
