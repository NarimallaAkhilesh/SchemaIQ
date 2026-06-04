import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import generateSchemaHandler from "./generate-schema.js";
import queryHandler from "./query.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Map express routes to serverless function handlers
app.post("/api/generate-schema", generateSchemaHandler);
app.post("/api/query", queryHandler);

app.get("/", (req, res) => {
	res.send("Gemini API Local Dev Server Running");
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
	console.log(`Local dev API server running on port ${PORT}`);
});
