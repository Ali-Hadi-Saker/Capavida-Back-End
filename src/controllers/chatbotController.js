import {Configuration, OpenAIApi} from "openai";

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY
});

const openai = new OpenAIApi(configuration);

export const askChatbot = async (req, res) => {
    const {question} = req.body;

    try {
        const completion = await openai.createChatCompletion({
            model: "gpt-3.5-turbo",
            messages: [
                {role: "system", content: "You are a helpful assistant"},
                {role: "user", content: question}
            ],
        });

        const answer = completion.data.choices[0].message.content.trim();
        res.json({answer});
        
    } catch (error) {
        res.status(500).json({error: "Failed to fetch response from OpenAI."});
    }
}