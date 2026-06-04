
# AI-Powered Schema Visualizer & SQL Query Generator

## Overview

AI-Powered Schema Visualizer & SQL Query Generator is a full-stack web application that transforms natural language requirements into structured database schemas and SQL queries. The application leverages Google's Gemini AI models to automatically generate relational database designs, visualize entity relationships through interactive diagrams, and create SQL queries based on user requirements.

The platform helps students, developers, database designers, and analysts rapidly prototype database structures without manually designing schemas or writing complex SQL statements.

---

## Features

### Schema Generation

* Generate relational database schemas from natural language descriptions.
* Automatic table creation with columns, primary keys, and foreign keys.
* Structured JSON schema output powered by Gemini AI.

### Interactive Schema Visualization

* Dynamic Entity-Relationship (ER) style diagram generation.
* Visual representation of table relationships.
* Interactive node movement, zooming, and navigation using React Flow.

### SQL Query Generation

* Generate SQL queries from plain English prompts.
* Context-aware query creation using generated schemas.
* Schema-assisted SQL generation for improved accuracy.

### Productivity Features

* Copy generated schema JSON to clipboard.
* Copy generated SQL queries instantly.
* Responsive and user-friendly interface.
* Real-time AI-powered workflow.

---

## System Architecture

```text
User Prompt
    │
    ▼
Google Gemini API
    │
    ▼
Schema Generation Engine
    │
    ▼
JSON Schema Output
    │
    ▼
React Flow Visualization
    │
    ▼
SQL Query Generation
    │
    ▼
Generated SQL Query
```

---

## Technology Stack

### Frontend

* React.js
* Vite
* JavaScript (ES6+)
* React Flow
* CSS3

### Backend

* Node.js
* Express.js

### AI Integration

* Google Gemini API
* @google/genai SDK

### Development & Deployment

* Git
* GitHub
* Vercel
* Render

---

## Project Structure

```text
client/
├── src/
│   ├── App.jsx
│   ├── PromptPanel.jsx
│   ├── QueryPanel.jsx
│   ├── FlowDiagram.jsx
│   ├── styles.css
│   └── main.jsx

server/
├── index.js
├── .env

README.md
```

---

## Installation

### Clone Repository

```bash
git clone https://github.com/gbpsharma/SCHEMAIQ-AI-Powered-Schema-Visualizer-and-SQL-Query-Generator/tree/main
cd AI-Powered-Schema-Visualizer-and-SQL-Query-Generator
```

### Frontend Setup

```bash
cd client
npm install
npm run dev
```

### Backend Setup

```bash
cd server
npm install
```

Create a `.env` file inside the server directory:

```env
GEMINI_API_KEY=your_gemini_api_key
```

Start the backend server:

```bash
npm start
```

---

## Usage

### Generate Database Schema

1. Open the application.
2. Describe a system or business requirement.
3. Click **Generate Schema**.
4. View the generated schema and interactive ER diagram.

### Generate SQL Queries

1. Navigate to Query Generator.
2. Enter a natural language query request.
3. Generate SQL using schema context.
4. Copy and execute the generated query.

---

## Example Input

```text
Design a database for an online bookstore with customers, books, orders, and payments.
```

## Example Output

* Customer Table
* Books Table
* Orders Table
* Payments Table
* Foreign Key Relationships
* Interactive ER Diagram
* SQL Queries Generated Automatically

---

## Key Achievements

* Developed an AI-assisted database design and query generation platform.
* Automated relational schema creation from natural language requirements.
* Built interactive ER visualization using React Flow.
* Integrated Google Gemini AI for schema and SQL generation.
* Implemented a full-stack architecture using React, Node.js, and Express.
* Deployed scalable frontend and backend services using Vercel and Render.

---

## Future Enhancements

* Multi-database support (MySQL, PostgreSQL, SQL Server).
* Direct SQL script export.
* Authentication and user management.
* Query execution and result visualization.
* Database migration generation.
* Schema versioning and collaboration features.

---

## Author

Narimalla Akhilesh

GitHub: https://github.com/NarimallaAkhilesh

LinkedIn: https://www.linkedin.com/in/narimalla-akhilesh

=======
# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
>>>>>>> 5d6e6ac1e3de6cf7a4755675ec09e4c245ed7237
