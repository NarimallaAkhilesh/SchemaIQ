import { GoogleGenAI, Type } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const ai = new GoogleGenAI({
	apiKey: process.env.GEMINI_API_KEY
});

const schemaResponseSchema = {
	type: Type.OBJECT,
	properties: {
		tables: {
			type: Type.ARRAY,
			items: {
				type: Type.OBJECT,
				properties: {
					name: { type: Type.STRING },
					columns: {
						type: Type.ARRAY,
						items: {
							type: Type.OBJECT,
							properties: {
								name: { type: Type.STRING },
								type: { type: Type.STRING },
								pk: { type: Type.BOOLEAN },
								fk: { type: Type.STRING }
							},
							required: ["name", "type"]
						}
					}
				},
				required: ["name", "columns"]
			}
		},
		relations: {
			type: Type.ARRAY,
			items: {
				type: Type.OBJECT,
				properties: {
					from: { type: Type.STRING },
					to: { type: Type.STRING }
				},
				required: ["from", "to"]
			}
		}
	},
	required: ["tables", "relations"]
};

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
		const { prompt } = req.body;
		if (!prompt) {
			return res.status(400).json({ error: "Prompt is required" });
		}

		const response = await ai.models.generateContent({
			model: "gemini-2.5-flash",
			contents: `Generate a relational database schema for: ${prompt}`,
			config: {
				responseMimeType: "application/json",
				responseSchema: schemaResponseSchema,
				thinkingConfig: { thinkingBudget: 0 }
			}
		});

		const schema = JSON.parse(response.text);
		res.status(200).json(schema);
	} catch (err) {
		console.error("Schema generation failed:", err);
		res.status(500).json({ error: "Failed to generate schema" });
	}
}
