import { NextRequest, NextResponse } from "next/server";
import { decrypt } from "@/app/lib/session";
import { cookies } from "next/headers";
import { loadUserFromLocalStorage } from "./app/service/auth.storage";

const protectedRoutes = ["/dashboard"];
const publicRoutes = ["/login", "/user-register", "/"];

export default async function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname;
  const isProtectedRoute = protectedRoutes.includes(path);
  const isPublicRoute = publicRoutes.includes(path);

  //const cookie = (await cookies()).get("session")?.value;
  //const session = await decrypt(cookie);

  const user = loadUserFromLocalStorage();

  if (!user) {
    return NextResponse.redirect(new URL("/login", req.nextUrl));
  } else {
    return NextResponse.next();
  }

  /*
  if (isProtectedRoute && !session?.userId) {
    return NextResponse.redirect(new URL("/login", req.nextUrl));
  }

  if (
    isPublicRoute &&
    session?.userId &&
    !req.nextUrl.pathname.startsWith("/dashboard")
  ) {
    return NextResponse.redirect(new URL("/dashboard", req.nextUrl));
  }
  */
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};
