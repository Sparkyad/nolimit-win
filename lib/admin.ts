import { NextRequest } from "next/server";

export async function checkIsAdminOrMod(req: NextRequest): Promise<boolean> {
  try {
    const isAdminRes = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/auth/role`,
      {
        headers: {
          cookie: req.headers.get("cookie") || "",
        },
      }
    );

    if (isAdminRes.ok) {
      const data = await isAdminRes.json();
      return Boolean(data.role === "admin" || data.role === "moderator");
    } else {
      return false;
    }
  } catch (err) {
    console.error("checkIsAdmin error:", err);
    return false;
  }
}
