import { authMiddleware } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export default authMiddleware({
  // Routes yang bisa diakses tanpa login
  publicRoutes: [
    "/",
    "/sign-in",
    "/sign-up",
  ],
  
  // Routes yang diabaikan oleh middleware
  ignoredRoutes: [
    "/api/webhooks(.*)",
    "/_next(.*)",
    "/favicon.ico",
    "/api/webhooks/clerk"
  ],

  // Menambahkan afterAuth untuk handle protected routes
  async afterAuth(auth, req) {
    // Handle public routes
    if (auth.isPublicRoute) {
      return NextResponse.next();
    }

    // Redirect ke sign-in jika mencoba akses protected route tanpa login
    if (!auth.userId) {
      const signInUrl = new URL('/sign-in', req.url);
      signInUrl.searchParams.set('redirect_url', req.url);
      return NextResponse.redirect(signInUrl);
    }

    return NextResponse.next();
  },
});

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};