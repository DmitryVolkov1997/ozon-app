import createMiddleware from 'next-intl/middleware'
import { NextResponse, type NextRequest } from 'next/server'
import { PAGES } from './config/pages.config'
import { routing } from './i18n/routing'

const intlMiddleware = createMiddleware(routing)
const protectedRoutes = ['/orders', '/cart']

export default function middleware(request: NextRequest) {
	const { pathname } = request.nextUrl

	const isProtectedRoute = protectedRoutes.some(
		route => pathname.startsWith(route) || pathname.includes(route)
	)

	const hasSessionCookie = Boolean(
		request.cookies.get('better-auth.session_token')?.value ||
		request.cookies.get('__Secure-better-auth.session_token')?.value,
	)

	if (isProtectedRoute && !hasSessionCookie) {
		return NextResponse.redirect(new URL(PAGES.HOME, request.url))
	}

	return intlMiddleware(request)
}

export const config = {
	matcher: '/((?!api|trpc|_next|_vercel|.*\\..*).*)'
}
