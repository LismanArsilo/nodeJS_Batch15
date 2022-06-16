import dotenv from "dotenv";
import express from "express";
dotenv.config();

const app = express();

const port = process.env.PORT || 3003;
app.listen(port, () => console.info(`Server listening on port ${port}`));
