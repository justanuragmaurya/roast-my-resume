import OpenAI from "openai";

export async function generateRoast(content:string):Promise<string | undefined >{
    const openai = new OpenAI({apiKey: process.env.OPENAI_API_KEY})
    const chatCompletion = await openai.chat.completions.create({
        messages: [
            {role:"system",content:"You are a professional roaster and stand-up comic. Your sole task is to roast resumes provided to you. Respond only with humorous and creative roast content relevant to the resume's details. Do not provide explanations, feedback, or any non-roast content. Keep the roast medium sized so an average person dont spend more than  minute reading it , keep the roast level very high , roast as mush as possible for you and stick your context to the resume content only"},
            { role: "user", content: "Here is the resume roast this : " + content }
        ],
        model: "gpt-4o-mini",
    });
    if(chatCompletion.choices[0].message.content){
    return chatCompletion.choices[0].message.content
    }
}