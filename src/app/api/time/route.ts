import { NextRequest, NextResponse } from "next/server";
import { cookies, headers } from "next/headers";

// 强制设置为静态资源，缓存生效
export const dynamic = 'force-static';
// 每 10 秒重新验证一次, 但第一次不返回最新内容
export const revalidate = 10;

export async function GET(request: NextRequest) {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value || "no token";

  console.log("cookieStore:", cookieStore);

  console.log("token:", token);

  const headersList = await headers();
  const connection = headersList.get("connection") || "no connection";
  console.log("connection:", connection);

  return NextResponse.json({
    time: new Date().toLocaleTimeString(),
  });
}
