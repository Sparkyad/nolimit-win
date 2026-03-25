import { NextRequest, NextResponse } from "next/server";

/**
 * POST /api/auth/set-cookie
 * 
 * Sets the auth_token cookie on the frontend domain.
 * This is needed because the backend (arbspark-api.onrender.com) cannot set
 * cookies for the frontend domain (nolimit.win / nolimit-win.vercel.app)
 * due to browser cross-origin cookie restrictions.
 * 
 * The frontend calls this after receiving the JWT from the backend login endpoint.
 */
export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { token } = body;

        if (!token || typeof token !== "string") {
            return NextResponse.json(
                { error: "Missing or invalid token" },
                { status: 400 }
            );
        }

        // Basic JWT format validation (three base64url segments)
        const parts = token.split(".");
        if (parts.length !== 3) {
            return NextResponse.json(
                { error: "Invalid token format" },
                { status: 400 }
            );
        }

        const response = NextResponse.json({ success: true });

        // Set the cookie on the frontend domain - this is a same-origin request
        // so the browser will accept it
        response.cookies.set("auth_token", token, {
            path: "/",
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            maxAge: 365 * 24 * 60 * 60, // 1 year
        });

        return response;
    } catch {
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
}

/**
 * DELETE /api/auth/set-cookie
 * 
 * Clears the auth_token cookie on logout.
 */
export async function DELETE() {
    const response = NextResponse.json({ success: true });
    response.cookies.delete("auth_token");
    return response;
}
