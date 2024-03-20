"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadImg = void 0;
const uploadImg = (req, res) => {
    console.log("yes here !!!!!");
    if (req.file) {
        console.log({ r: req.file });
        console.log("yes gere");
        res.status(200).json(req.file.path);
    }
    else {
        return res.status(400).json({
            message: "No file uploaded",
        });
    }
};
exports.uploadImg = uploadImg;
//# sourceMappingURL=ImageController.js.map