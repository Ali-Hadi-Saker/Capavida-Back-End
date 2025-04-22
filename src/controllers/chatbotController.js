import OpenAI  from "openai";
import dotenv from "dotenv";
dotenv.config();

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
});


export const askChatbot = async (req, res) => {
    const {question} = req.body;

    try {
        const completion = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: [
                {role: "system", content: "You are a helpful assistant"},
                {role: "user", content: question}
            ],
        });

        const answer = completion.choices[0].message.content.trim();
        res.json({answer});
        
    } catch (error) {
        console.error("OpenAI API error:", error); 
        res.status(500).json({error: "Failed to fetch response from OpenAI."});
    }
}