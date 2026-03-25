import { NextRequest, NextResponse } from "next/server";

/**
 * GET /api/auth/check-cookie
 * 
 * Checks if the auth_token cookie exists on the frontend domain.
 * Used by the client to verify login status without cross-origin issues.
 */
export async function GET(request: NextRequest) {
    const token = request.cookies.get("auth_token");

    if (token && token.value) {
        return NextResponse.json({ authenticated: true });
    }

    return NextResponse.json({ authenticated: false });
}
