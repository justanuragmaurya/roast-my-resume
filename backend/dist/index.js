"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const multer_1 = __importDefault(require("multer"));
const ai_1 = require("./utils/ai");
const pdf_parse_1 = __importDefault(require("pdf-parse"));
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
// Configure multer for file upload
const upload = (0, multer_1.default)({
    storage: multer_1.default.memoryStorage(),
    limits: {
        fileSize: 5 * 1024 * 1024 // 5MB limit
    }
});
app.get("/", (req, res) => {
    res.status(200).json({
        message: "working"
    });
});
app.post("/save", (req, res) => {
    console.log(req.body.roast);
    res.status(200).json({
        id: "ajdashldas"
    });
});
app.post("/roast/resume", upload.single('resume'), (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!req.file) {
            res.status(400).json({ message: "No resume file provided" });
            return;
        }
        const pdfData = yield (0, pdf_parse_1.default)(req.file.buffer);
        const resumeContent = pdfData.text;
        const roast = yield (0, ai_1.generateRoast)(resumeContent);
        res.status(200).json({
            message: "Resume received successfully",
            roast
        });
    }
    catch (error) {
        console.error('Error processing resume:', error);
        res.status(500).json({
            message: "Error processing resume",
            error: error instanceof Error ? error.message : String(error)
        });
    }
}));
app.listen(3001, () => {
    console.log("Server running on port 3001");
});
