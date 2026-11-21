require("dotenv").config();
const express = require("express");
const path = require("path");
const app = express();
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

const notionHeaders = () => ({
  "Authorization": `Bearer ${process.env.NOTION_TOKEN}`,
  "Notion-Version": process.env.NOTION_API_VERSION || "2022-06-28",
  "Content-Type": "application/json"
});

app.get("/api/health", (_req,res) => res.json({
  ok:true,
  notionConfigured:Boolean(process.env.NOTION_TOKEN),
  message:"CampusPilot server is running"
}));

app.post("/api/notion/task", async (req,res) => {
  const db = process.env.NOTION_TASKS_DATABASE_ID;
  if (!process.env.NOTION_TOKEN || !db)
    return res.status(400).json({error:"Add NOTION_TOKEN and NOTION_TASKS_DATABASE_ID to your .env file first."});
  const {title, course, dueDate, priority, status} = req.body || {};
  if (!title) return res.status(400).json({error:"Task title is required."});
  try {
    const response = await fetch("https://api.notion.com/v1/pages", {
      method:"POST", headers:notionHeaders(),
      body:JSON.stringify({parent:{database_id:db},properties:{
        Name:{title:[{text:{content:title}}]},
        Course:{rich_text:[{text:{content:course || "General"}}]},
        "Due Date": dueDate ? {date:{start:dueDate}} : {date:null},
        Priority:{select:{name:priority || "Medium"}},
        Status:{status:{name:status || "Not started"}}
      }})
    });
    const data = await response.json();
    if (!response.ok) return res.status(response.status).json({error:data.message || "Notion API request failed",details:data});
    res.json({ok:true,id:data.id,url:data.url});
  } catch(e) { res.status(500).json({error:e.message}); }
});

app.post("/api/notion/event", async (req,res) => {
  const db = process.env.NOTION_EVENTS_DATABASE_ID;
  if (!process.env.NOTION_TOKEN || !db)
    return res.status(400).json({error:"Add NOTION_TOKEN and NOTION_EVENTS_DATABASE_ID to your .env file first."});
  const {title, date, category, location} = req.body || {};
  if (!title) return res.status(400).json({error:"Event title is required."});
  try {
    const response = await fetch("https://api.notion.com/v1/pages", {
      method:"POST", headers:notionHeaders(),
      body:JSON.stringify({parent:{database_id:db},properties:{
        Name:{title:[{text:{content:title}}]},
        Date: date ? {date:{start:date}} : {date:null},
        Category:{select:{name:category || "Campus"}} ,
        Location:{rich_text:[{text:{content:location || "TBA"}}]}
      }})
    });
    const data = await response.json();
    if (!response.ok) return res.status(response.status).json({error:data.message || "Notion API request failed",details:data});
    res.json({ok:true,id:data.id,url:data.url});
  } catch(e) { res.status(500).json({error:e.message}); }
});

const port=process.env.PORT || 3000;
app.listen(port,()=>console.log(`CampusPilot running at http://localhost:${port}`));
