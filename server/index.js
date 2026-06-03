import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { GoogleGenAI } from "@google/genai";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

const ai = new GoogleGenAI({
	apiKey: process.env.GEMINI_API_KEY
});

/* Generate Schema */
app.post("/api/generate-schema",async(req,res)=>
{
	try
	{
		const { prompt } = req.body;

		const response = await ai.models.generateContent({
			model:"gemini-2.5-flash",
			contents:`
You are a database schema generator.

Respond ONLY with valid JSON.

Format:

{
	"tables":[
		{
			"name":"TableName",
			"columns":[
				{
					"name":"column_name",
					"type":"VARCHAR(255)",
					"pk":true,
					"fk":"other_table.column"
				}
			]
		}
	],
	"relations":[
		{
			"from":"table1.column",
			"to":"table2.column"
		}
	]
}

User Requirement:
${prompt}
`
		});

		let text = response.text;

		text = text
			.replace(/```json/g,"")
			.replace(/```/g,"")
			.trim();

		const schema = JSON.parse(text);

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
			?
`You are an expert SQL generator.

Return ONLY valid SQL query.

Schema:
${JSON.stringify(schema,null,2)}

Request:
${prompt}`
			:
`You are an expert SQL generator.

Return ONLY valid SQL query.

Request:
${prompt}`;

		const response = await ai.models.generateContent({
			model:"gemini-2.5-flash",
			contents:finalPrompt
		});

		const sql = response.text.trim();

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