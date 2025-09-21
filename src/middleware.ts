import { NextRequest, NextResponse } from "next/server";

export async function middleware(request: NextRequest) {
  if (request.nextUrl.pathname !== "/login") {
    const token = request.cookies.get("token")?.value;

    if (!token) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }

  // if (request.nextUrl.pathname.startsWith("/blog")) {
  //   return NextResponse.redirect(new URL("/scale", request.url));
  // }
}

export const config = {
  //  matcher: ["/intercepting-routes/:path*"],
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico, sitemap.xml, robots.txt (metadata files)
     */
    "/((?!api|_next/static|_next/image|favicon.ico|.*.jpg|sitemap.xml|robots.txt).*)",
  ],
};
