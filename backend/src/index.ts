import express, { Request, Response, NextFunction } from "express"
import dotenv from "dotenv";
import cors from "cors"
import multer from "multer";
import { generateRoast } from "./utils/ai";
import pdfParse from "pdf-parse";
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Configure multer for file upload
const upload = multer({
    storage: multer.memoryStorage(),
    limits: {
        fileSize: 5 * 1024 * 1024 // 5MB limit
    }
});

app.get("/", (req: Request, res: Response) => {
    res.status(200).json({
        message:"working"
    });
});

app.post("/save",(req,res)=>{
    console.log(req.body.roast);
    res.status(200).json({
        id:"ajdashldas"
    })
})

app.post("/roast/resume", upload.single('resume'), async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        if (!req.file) {
            res.status(400).json({ message: "No resume file provided" });
            return;
        }

        const pdfData = await pdfParse(req.file.buffer);
        const resumeContent = pdfData.text;
        
        const roast = await generateRoast(resumeContent);
        
        res.status(200).json({ 
            message: "Resume received successfully", 
            roast
        });
    } catch (error) {
        console.error('Error processing resume:', error);
        res.status(500).json({ 
            message: "Error processing resume", 
            error: error instanceof Error ? error.message : String(error)
        });
    }
});

app.listen(3001, () => {
    console.log("Server running on port 3001");
});