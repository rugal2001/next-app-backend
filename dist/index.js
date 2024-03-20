"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importStar(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const routes_1 = __importDefault(require("./routes"));
const cors_1 = __importDefault(require("cors"));
const bodyParser = require("body-parser");
const app = (0, express_1.default)();
const port = 4000;
app.use(express_1.default.json());
app.use((0, express_1.urlencoded)({ extended: false }));
app.use((0, express_1.json)());
app.use((0, cors_1.default)());
app.use("/", routes_1.default);
/////////////////////////////////////////////////////
////////////// DATABASE CONFIGURATION  //////////////
const MONGO_URL = "mongodb+srv://root:d7Nnl1FmNxVUoKJY@cluster1.jhdo7h3.mongodb.net/?retryWrites=true&w=majority&appName=Cluster1";
mongoose_1.default
    .connect(MONGO_URL, {
    dbName: "mern-post",
})
    .then(() => {
    console.log("Database Connected");
})
    .catch((error) => {
    console.log("Database Error => ", error);
});
///////////////////////////////////////////////////////
app.listen(port, () => {
    console.log(`listening in port http://localhost:${port} `);
});
//# sourceMappingURL=index.js.map