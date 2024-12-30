const { GoogleGenerativeAI } = require("@google/generative-ai");
require("dotenv").config();
const express = require('express')
const http = require("http");
const cors = require('cors')
const port = 3000
const connectToMongo = require('./connectdb');
const app = express();
const server = http.createServer(app); // Create HTTP server
const socketIO = require("socket.io"); // Import socket.io
const initializeSocket = require("./socket");

// Initialize socket.io on the same server
const io = socketIO(server, {
    cors: {
      transports: ["websocket", "polling"],
    },
});

app.use(
    cors({
      origin: [
          "http://localhost:5173",
          "https://aura-health-eut8k5b24-shuvadipta-das-projects.vercel.app",
      ],
      credentials: true,
    })
);

app.use(express.json())


const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

connectToMongo();


app.use('/api/v1/appointments', require('./routes/appointments.route'));

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

initializeSocket(io);

app.get('/', (req, res) => {
    res.send('Hello from a simple server!')
})

server.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
