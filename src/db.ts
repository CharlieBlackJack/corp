import { JSONFilePreset } from "lowdb/node";

// Read or create db.json
const defaultData: { posts: { id: string; title: string; content: string }[] } =
  { posts: [] };
const db = await JSONFilePreset("db.json", defaultData);

export default db;
// // Update db.json
// await db.update(({ posts }) => posts.push("hello world"));

// // Alternatively you can call db.write() explicitely later
// // to write to db.json
// db.data.posts.push("hello world");
// await db.write();
