import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const ai = new GoogleGenAI({
	apiKey: process.env.GEMINI_API_KEY
});

export default async function handler(req, res) {
	// Enable CORS for local testing if requested from a different port
	res.setHeader("Access-Control-Allow-Origin", "*");
	res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
	res.setHeader("Access-Control-Allow-Headers", "Content-Type");

	if (req.method === "OPTIONS") {
		return res.status(200).end();
	}

	if (req.method !== "POST") {
		return res.status(405).json({ error: "Method not allowed" });
	}

	try {
		const { prompt, schema } = req.body;
		if (!prompt) {
			return res.status(400).json({ error: "Prompt is required" });
		}

		const finalPrompt = schema
			? `Generate SQL for: ${prompt}\nSchema: ${JSON.stringify(schema)}`
			: `Generate SQL for: ${prompt}`;

		const response = await ai.models.generateContent({
			model: "gemini-2.5-flash",
			contents: finalPrompt,
			config: {
				thinkingConfig: { thinkingBudget: 0 }
			}
		});

		let sql = response.text.trim();

		/* Strip markdown code fences if present */
		sql = sql.replace(/^```sql\s*/i, "").replace(/```$/, "").trim();

		res.status(200).json({ sql });
	} catch (err) {
		console.error("Query generation failed:", err);
		res.status(500).json({ error: err.message });
	}
}
