import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { jwtVerify } from 'jose'

const secretKey =process.env.ACCESS_TOKEN_SECRET as string

export async function middleware(request: NextRequest) {
    const accessToken = request.cookies.get('access')?.value
    let user = null

    if (accessToken) {
        try {
            user = await jwtVerify(accessToken as string, new TextEncoder().encode(secretKey))
        } catch (e) {}
    }

    if (!user) return NextResponse.redirect(new URL('/api/unauthorized', request.url));

    return NextResponse.next()
}

// See "Matching Paths" below to learn more
export const config = {
    matcher: ['/api/notes/:id*', '/api/users', '/api/note'],
}