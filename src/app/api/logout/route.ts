import { NextResponse } from "next/server";

export async function DELETE() {
  const response = NextResponse.json({
    success: true,
    token: "",
    message: "已退出登录",
  });

  response.cookies.delete("token");
  return response;
}
