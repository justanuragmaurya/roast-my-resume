import express from "express"
import dotenv from "dotenv";
import cors from "cors"
import { generateRoast } from "./utils/ai";
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());	

app.get("/",async (req,res)=>{
	res.status(200).json({
		message:"working"
	})
})

app.get("/roast/resume",async(req,res)=>{
	const roast = await generateRoast(req.body.content)
	res.status(200).send(roast)
})

app.listen(3001);