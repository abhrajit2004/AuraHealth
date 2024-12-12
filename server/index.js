import express from "express";
import dotenv from "dotenv";

const app = express();
dotenv.config(); // loading the env variables

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(`Server running on Port ${PORT}`);
});
