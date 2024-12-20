const { GoogleGenerativeAI } = require("@google/generative-ai");
require("dotenv").config();
const express = require('express')
const app = express()
const cors = require('cors')
const port = 3000

app.use(cors())

app.use(express.json())

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

app.post('/gettreatment', async (req, res) => {

    const disease = req.body.disease;

    const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const prompt = `provide the necessary actions for ${disease} in less sentences`;

    const result = await model.generateContent(prompt);

    res.json({ success: true, message: 'Successfully fetched the treatment!', treatment: result.response.text() });

})

app.post('/getmedicines', async (req, res) => {

    const healthProblem = req.body.healthProblem;

    const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const prompt = `provide the necessary medicines in array of json format with price ( only in INR ) and id like uuid for ${healthProblem}. Don't give any disclaimer or note at the end of array. JSON format should be like this:

     {    "id": "a1b2c3d4-e5f6-7890-1234-567890abcdef",    "medicine": "Omeprazole",    "price": 20  }
    `;

    const result = await model.generateContent(prompt);

    const modifiedResult = result.response.text().split('\n').join('').replace('```json', '').replace('```', '');  

    res.json({ success: true, message: 'Successfully fetched the treatment!', medicines: modifiedResult });
})

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})

