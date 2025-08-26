
#  SchemaIQ – AI Powered Schema Generator & Visualizer  

SchemaIQ is an **AI-powered database schema generator and SQL query assistant** built with **Next.js, React, Zustand, and Vercel**.  
It allows developers and data engineers to create and visualize database schemas and generate SQL queries from **natural language prompts** or an **interactive diagram editor**.  

<img src="https://user-images.githubusercontent.com/74038190/212284115-f47cd8ff-2ffb-4b04-b5bf-4d1c14c0247f.gif" width="1000">

## ✨ Features  

- **AI Schema Generation**  
  Describe your data needs in plain English and get a full schema (tables, columns, relationships) generated automatically.  

- **AI SQL Query Generation**  
  Generate valid SQL queries instantly based on your schema and natural language prompts.  

- **Schema Visualization**  
  Visualize and interact with your schema as a **draggable, dynamic diagram**.  

- **Copy SQL Commands**  
  Copy AI-generated queries or table creation statements in one click.  

- **Customizable Prompts**  
  Securely store prompt templates (Vercel Blob, Firestore, etc.) and inject them dynamically at runtime.  

- **Modern UI**  
  Responsive, accessible, and beautifully designed with **Tailwind CSS**.  

<img src="https://user-images.githubusercontent.com/74038190/212284115-f47cd8ff-2ffb-4b04-b5bf-4d1c14c0247f.gif" width="1000">

## 🚀 Getting Started  

### 1️⃣ Install Dependencies  
```bash
npm install
# or
yarn install
# or
pnpm install
```

### 2️⃣ Set Up Environment Variables  
Create a `.env` file in the project root and add your API key:  
```env
GOOGLE_GENERATIVE_AI_API_KEY=your_api_key_here
```

### 3️⃣ Prompt Templates (Recommended for Production)  
- Store prompt templates securely (e.g., **Vercel Blob, Firestore, or external storage**)  
- Update your API routes to fetch prompts at runtime  

### 4️⃣ Run Development Server  
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```
Then open [http://localhost:3000](http://localhost:3000).  

<img src="https://user-images.githubusercontent.com/74038190/212284115-f47cd8ff-2ffb-4b04-b5bf-4d1c14c0247f.gif" width="1000">

## ☁️ Deployment  

SchemaIQ is optimized for **Vercel**.  
1. Push your code to GitHub  
2. Import the repository into [Vercel](https://vercel.com/)  
3. Add environment variables in the Vercel dashboard  
4. Click **Deploy** 🎉  

<img src="https://user-images.githubusercontent.com/74038190/212284115-f47cd8ff-2ffb-4b04-b5bf-4d1c14c0247f.gif" width="1000">

## 📁 Project Structure  

```
src/
 ├── components/
 │   ├── layout.tsx             # Main UI & chat history
 │   ├── chat-input.tsx         # Prompt input & schema modal
 │   ├── schema-visualizer.tsx  # Diagram logic (Zustand store)
 │   ├── editor.tsx             # SQL & schema editors
 │   ├── buttons.tsx            # Action buttons
 │   ├── footer.tsx             # Navigation & GitHub link
 │   ├── message-history.tsx    # Chat messages
 │   ├── icon.tsx               # Animated logo
 │
 ├── api/
 │   ├── generate-schema.ts     # AI schema generation route
 │   ├── generate-sql.ts        # AI SQL generation route
 │
 ├── hooks/
 │   ├── use-local-storage.ts   # Local schema storage
 │   ├── use-firestore.ts       # Firestore integration
 │
 ├── lib/utils.ts               # API utilities
 ├── types/schema.ts            # Type definitions
```

<img src="https://user-images.githubusercontent.com/74038190/212284115-f47cd8ff-2ffb-4b04-b5bf-4d1c14c0247f.gif" width="1000">

## 🔒 Security Notes  

- Never store raw prompt templates in the GitHub repo.  
- Use **Vercel Blob, Firestore, or secure storage** for prompts.  
- Do not inject user input directly into system prompts.  

<img src="https://user-images.githubusercontent.com/74038190/212284115-f47cd8ff-2ffb-4b04-b5bf-4d1c14c0247f.gif" width="1000">

## ⚙️ Technologies Used  

- **Next.js** – App framework  
- **React** – UI components  
- **Zustand** – Lightweight state management  
- **Tailwind CSS** – Styling  
- **Vercel** – Deployment & storage  
- **Firestore** – Secure prompt storage  

<img src="https://user-images.githubusercontent.com/74038190/212284115-f47cd8ff-2ffb-4b04-b5bf-4d1c14c0247f.gif" width="1000">

## ♿ Accessibility  

- Fully keyboard navigable  
- Responsive design  
- ARIA labels on all inputs & controls  

<img src="https://user-images.githubusercontent.com/74038190/212284115-f47cd8ff-2ffb-4b04-b5bf-4d1c14c0247f.gif" width="1000">

## 📌 Roadmap  

- [ ] Export schemas to multiple SQL dialects (MySQL, Postgres, SQLite)  
- [ ] Collaboration mode (share schema with team)  
- [ ] Dark mode toggle 🌙  
- [ ] AI-powered schema optimization  

<img src="https://user-images.githubusercontent.com/74038190/212284115-f47cd8ff-2ffb-4b04-b5bf-4d1c14c0247f.gif" width="1000">

## 🤝 Contributing  

Contributions are welcome!  
1. Fork the repo  
2. Create a feature branch (`git checkout -b feature/your-feature`)  
3. Commit changes (`git commit -m "Add new feature"`)  
4. Push & create a PR  

<img src="https://user-images.githubusercontent.com/74038190/212284115-f47cd8ff-2ffb-4b04-b5bf-4d1c14c0247f.gif" width="1000">

## 📜 License  

MIT License – feel free to use, modify, and share.  
🔥 With **SchemaIQ**, you can go from **idea → schema → queries → visualization** in minutes.  

<img src="https://user-images.githubusercontent.com/74038190/212284115-f47cd8ff-2ffb-4b04-b5bf-4d1c14c0247f.gif" width="1000">

