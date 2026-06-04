import express from "express";
import cors from "cors";
import dotenv from "dotenv";
<<<<<<< HEAD
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
=======
import OpenAI from "openai";

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

/* 🧠 1. Generate Schema */
app.post("/api/generate-schema", async (req, res) => {
  const { prompt } = req.body;
  try {
    const completion = await client.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: `You are a database schema generator. Respond ONLY with JSON:
          {
            "tables": [
              {
                "name": "TableName",
                "columns": [
                  {"name": "column_name", "type": "VARCHAR(255)", "pk": true/false, "fk": "other_table.column"}
                ]
              }
            ],
            "relations": [
              {"from": "table1.column", "to": "table2.column"}
            ]
          }`
        },
        { role: "user", content: prompt }
      ]
    });

    const text = completion.choices[0].message.content;
    res.json(JSON.parse(text));
  } catch (err) {
    console.error("Schema generation failed:", err);
    res.status(500).json({ error: "Failed to generate schema" });
  }
});

/* 🧠 2. Generate SQL Query (Correct & Stable Version) */
app.post("/api/query", async (req, res) => {
  try {
    const { prompt, schema } = req.body;

    const completion = await client.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: `You are an expert SQL generator.
Return ONLY valid SQL query.
Do NOT include explanations, lists, assumptions, or markdown.`
        },
        {
          role: "user",
          content:
            schema
              ? `Schema: ${JSON.stringify(schema)}\nQuery request: ${prompt}`
              : `Write SQL for: ${prompt}`
        }
      ]
    });

    const sql = completion.choices[0].message.content.trim();

    res.json({ sql });
  } catch (err) {
    console.error("Query generation failed:", err);
    res.status(500).json({ error: err.message });
  }
});

/* 🚀 Start Server */
app.listen(4000, () =>
  console.log("Backend running on http://localhost:4000")
);
>>>>>>> 5d6e6ac1e3de6cf7a4755675ec09e4c245ed7237
