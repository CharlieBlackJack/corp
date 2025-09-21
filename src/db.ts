import fs from "fs";
import path from "path";
import { JSONFilePreset } from "lowdb/node";

// 确保 src/tmp 目录存在
const tmpDir = path.join(process.cwd(), "src", "tmp");
fs.mkdirSync(tmpDir, { recursive: true });

// db.json 路径使用项目内的 src/tmp/db.json
const filePath = path.join(tmpDir, "db.json");

// Read or create db.json
const defaultData: { posts: { id: string; title: string; content: string }[] } =
  { posts: [] };
const db = await JSONFilePreset(filePath, defaultData);

export default db;

// // Update db.json
// await db.update(({ posts }) => posts.push("hello world"));

// // Alternatively you can call db.write() explicitely later
// // to write to db.json
// db.data.posts.push("hello world");
// await db.write();
