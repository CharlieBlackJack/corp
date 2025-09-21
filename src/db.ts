import fs from "fs";
import path from "path";
import os from "os";
import { JSONFilePreset } from "lowdb/node";

// 生产环境（如 Vercel）使用系统临时目录，开发环境使用项目内 src/tmp
const isProd = !!process.env.VERCEL || process.env.NODE_ENV === "production";

const baseTmp = isProd
  ? path.join(os.tmpdir(), "corp-tmp")
  : path.join(process.cwd(), "src", "tmp");

fs.mkdirSync(baseTmp, { recursive: true });

const filePath = path.join(baseTmp, "db.json");

const defaultData: { posts: { id: string; title: string; content: string }[] } =
  {
    posts: [],
  };

// JSONFilePreset 返回 lowdb 实例（保持你现有用法）
const db = await JSONFilePreset(filePath, defaultData);

export default db;
