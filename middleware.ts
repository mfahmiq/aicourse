import { authMiddleware } from "@clerk/nextjs";

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
});

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};