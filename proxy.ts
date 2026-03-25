import { NextRequest, NextResponse } from "next/server";
import { checkIsAdminOrMod } from "./lib/admin";

export async function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;
  if (pathname.startsWith("/admin-")) {
    const isAdminOrMod = await checkIsAdminOrMod(req);
    if (!isAdminOrMod) {
      return NextResponse.redirect(new URL("/", req.url));
    }
  }

  const res = NextResponse.next();
  const country = req.headers.get("x-vercel-ip-country");
  res.cookies.set("country", country || "unknown", { path: "/" });
  return res;
}

export const config = {
  matcher: "/:path*",
};
