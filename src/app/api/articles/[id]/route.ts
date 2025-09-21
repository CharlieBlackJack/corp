import { NextRequest, NextResponse } from "next/server";
import db from "@/db";

async function resolveParams(params: { id: string } | Promise<{ id: string }>) {
  return (params as Promise<{ id: string }>)?.then
    ? await (params as Promise<{ id: string }>)
    : (params as { id: string });
}

export async function GET(
  request: NextRequest,
  context: { params: { id: string } | Promise<{ id: string }> }
) {
  const { id } = await resolveParams(context.params);
  const item = db.data.posts.find((p) => p.id === id);
  return NextResponse.json({
    code: 0,
    message: "查询成功",
    data: item,
  });
}

export async function PATCH(
  request: NextRequest,
  context: { params: { id: string } | Promise<{ id: string }> }
) {
  const { id } = await resolveParams(context.params);
  const body = await request.json();
  await db.update(({ posts }) => {
    const idx = posts.findIndex((p) => p.id === id);
    if (idx > -1) posts[idx] = { ...posts[idx], ...body };
  });
  return NextResponse.json({ code: 0, message: "更新成功" });
}

export async function DELETE(
  request: NextRequest,
  context: { params: { id: string } | Promise<{ id: string }> }
) {
  const { id } = await resolveParams(context.params);
  await db.update(({ posts }) => {
    const idx = posts.findIndex((p) => p.id === id);
    if (idx > -1) posts.splice(idx, 1);
  });
  return NextResponse.json({ code: 0, message: "删除成功" });
}
