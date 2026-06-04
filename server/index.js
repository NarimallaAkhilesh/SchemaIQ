import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { GoogleGenAI, Type } from "@google/genai";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

const ai = new GoogleGenAI({
	apiKey: process.env.GEMINI_API_KEY
});

/* Schema response structure for structured output */
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

/* Generate Schema */
app.post("/api/generate-schema",async(req,res)=>
{
	try
	{
		const { prompt } = req.body;

		const response = await ai.models.generateContent({
			model:"gemini-2.5-flash",
			contents:`Generate a relational database schema for: ${prompt}`,
			config:{
				responseMimeType:"application/json",
				responseSchema: schemaResponseSchema,
				thinkingConfig:{ thinkingBudget: 0 }
			}
		});

		const schema = JSON.parse(response.text);

		res.json(schema);
	}
	catch(err)
	{
		console.error("Schema generation failed:",err);

		res.status(500).json({
			error:"Failed to generate schema"
		});
	}
});

/* Generate SQL Query */
app.post("/api/query",async(req,res)=>
{
	try
	{
		const { prompt,schema } = req.body;

		const finalPrompt = schema
			? `Generate SQL for: ${prompt}\nSchema: ${JSON.stringify(schema)}`
			: `Generate SQL for: ${prompt}`;

		const response = await ai.models.generateContent({
			model:"gemini-2.5-flash",
			contents:finalPrompt,
			config:{
				thinkingConfig:{ thinkingBudget: 0 }
			}
		});

		let sql = response.text.trim();

		/* Strip markdown code fences if present */
		sql = sql.replace(/^```sql\s*/i,"").replace(/```$/,"").trim();

		res.json({ sql });
	}
	catch(err)
	{
		console.error("Query generation failed:",err);

		res.status(500).json({
			error:err.message
		});
	}
});

/* Health Check */
app.get("/",(req,res)=>
{
	res.send("Gemini API Backend Running");
});

/* Start Server */
const PORT = process.env.PORT || 4000;

app.listen(PORT,()=>
{
	console.log(`Backend running on port ${PORT}`);
});