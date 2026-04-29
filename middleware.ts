import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Прокидываем pathname как заголовок, чтобы root layout мог
// определить текущий язык и выставить <html lang="..."> корректно.
export function middleware(request: NextRequest) {
  const response = NextResponse.next();
  response.headers.set("x-pathname", request.nextUrl.pathname);
  return response;
}

export const config = {
  // Запускаем на всех маршрутах кроме статики и _next
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
