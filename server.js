const express = require("express");
const OpenAI = require("openai");
const cors = require("cors");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

const client = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
});

app.post("/api/chat", async (req, res) => {

    try {

        const message = req.body.message;

        if (!message) {
            return res.status(400).json({
                error: "Сообщение пустое"
            });
        }

        const response = await client.responses.create({
            model: "gpt-5.6-luna",

            instructions:
                "Ты MAX, интеллектуальный помощник проекта MAHMUDOV INTELLECT. " +
                "Отвечай на русском языке, если пользователь пишет по-русски. " +
                "Отвечай понятно, точно и без лишней воды. " +
                "Помогай с программированием, учёбой, математикой, идеями и обычными вопросами.",

            input: message
        });

        res.json({
            answer: response.output_text
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            error: "MAX временно не может ответить."
        });

    }

});

app.listen(3000, () => {
    console.log("MAX запущен: http://localhost:3000");
});
