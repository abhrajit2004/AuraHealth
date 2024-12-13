const { GoogleGenerativeAI } = require("@google/generative-ai");
require("dotenv").config();
const express = require('express')
const app = express()
const cors = require('cors')
const port = 3000

app.use(cors())

app.use(express.json())

app.post('/gettreatment', async (req, res) => {

    const disease = req.body.disease;

    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const prompt = `provide the necessary actions for ${disease} in less sentences`;

    const result = await model.generateContent(prompt);
    console.log(result.response.text());
    res.json({ success: true, message: 'Successfully fetched the treatment!', treatment: result.response.text() });

})

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})

