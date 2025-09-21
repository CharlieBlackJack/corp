import { NextRequest, NextResponse } from "next/server";
import db from "@/db";

// 分页查找
export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;

  const pageNum = Number(searchParams.get("pageNum")) || 1;
  const pageSize = Number(searchParams.get("pageSize")) || 10;
  const query = searchParams.get("query") || "";

  const data = db.data.posts;
  let filteredData = query
    ? data.filter((item) => {
        const { id, ...rest } = item;
        return Object.values(rest).some((value) =>
          String(value).toLowerCase().includes(query.toLowerCase())
        );
      })
    : data;

  const total = filteredData.length;
  const startIndex = (pageNum - 1) * pageSize;
  const endIndex = Math.min(startIndex + pageSize, total);

  filteredData =
    startIndex >= total ? [] : filteredData.slice(startIndex, endIndex);

  return NextResponse.json({
    code: 0,
    message: "分页查找成功",
    data: {
      list: filteredData,
      total,
      pageNum,
      pageSize,
    },
  });
}

export async function POST(request: NextRequest) {
  const data = await request.json();
  await db.update(({ posts }) =>
    posts.unshift({
      id: Math.random().toString(36).slice(-8),
      ...data,
    })
  );
  return NextResponse.json({
    code: 0,
    message: "添加成功",
    data,
  });
}
