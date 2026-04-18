import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    const { nextUrl } = req;
    const token = req.nextauth.token;
    
    // Check for admin role
    const isAdmin = token?.role?.toLowerCase() === "admin";
    const isDashboard = nextUrl.pathname.startsWith("/dashboard");

    // If they are logged in but NOT an admin, send them home
    if (isDashboard && !isAdmin) {
      return NextResponse.redirect(new URL("/", req.url));
    }

    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        const { pathname } = req.nextUrl;
        
        // If the user is trying to access dashboard but has no token
        if (pathname.startsWith("/dashboard") && !token) {
          // Returning true here allows the 'middleware' function above to run
          // so we can handle the redirect manually.
          // If we return false, NextAuth takes over and sends them to /api/auth/signin
          return true; 
        }
        
        return !!token;
      },
    },
  }
);

export const config = {
  matcher: ["/dashboard/:path*"],
};