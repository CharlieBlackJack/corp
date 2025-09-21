import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const { username, password } = await request.json();

  const response = NextResponse.json(
    { success: true, token: `${username}${password}`, message: "登录成功" }
    // {
    //   headers: {
    //     "set-cookie": `token=${username}${password}; Path=/; Max-Age=86400; HTTPOnly`,
    //   },
    // }
  );
  response.cookies.set("token", `${username}${password}`, {
    path: "/",
    maxAge: 86400,
    httpOnly: true,
  });

  return response;
}
