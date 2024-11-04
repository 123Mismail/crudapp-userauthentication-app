import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
    const path = request.nextUrl.pathname;
    

    const isPublicPath = path === '/' || path === '/signin' || path === '/signup' || path === '/verifyemail';
    const token = request.cookies.get("token")?.value || "";
                 
    
        
    if (!isPublicPath && !token) {
        // Redirect to signin if trying to access protected pages without token
        return NextResponse.redirect(new URL('/signin', request.url));
    }
   

    // Allow the request to continue if none of the conditions are met
    return NextResponse.next();
}

// Configure the paths that should trigger the middleware
export const config = {
    matcher: ['/addMore', '/editItem/:path*', '/signin', '/verifyemail', '/', '/signup'],
};
