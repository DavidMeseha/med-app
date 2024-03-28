import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";

const secretKey = process.env.ACCESS_TOKEN_SECRET as string;

export async function middleware(request: NextRequest) {
  const accessToken = request.cookies.get("access")?.value;
  let user = null;

  if (accessToken) {
    user = await jwtVerify(
      accessToken as string,
      new TextEncoder().encode(secretKey)
    );
  }

  if (!user)
    return NextResponse.redirect(new URL("/api/unauthorized", request.url));
  return NextResponse.next();
}

export const config = {
  matcher: ["/api/notes", "/api/users", "/api/note"],
};
