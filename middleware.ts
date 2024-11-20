import createMiddleware from "next-intl/middleware";

export default createMiddleware({
  locales: ["en"],
  defaultLocale: "en",
  localeDetection: false,
});

export const config = {
  // Match only internationalized pathnames
  matcher: ["/((?!api|_next|_vercel.*\\..*).*)"],
};
