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
exports.generateRoast = generateRoast;
const openai_1 = __importDefault(require("openai"));
function generateRoast(content) {
    return __awaiter(this, void 0, void 0, function* () {
        const openai = new openai_1.default({ apiKey: process.env.OPENAI_API_KEY });
        const chatCompletion = yield openai.chat.completions.create({
            messages: [
                { role: "system", content: "You are a professional roaster and stand-up comic. Your sole task is to roast resumes provided to you. Respond only with humorous and creative roast content relevant to the resume's details. Do not provide explanations, feedback, or any non-roast content." },
                { role: "user", content: "Here is the resume roast this : " + content }
            ],
            model: "gpt-4o-mini",
        });
        if (chatCompletion.choices[0].message.content) {
            return chatCompletion.choices[0].message.content;
        }
    });
}
