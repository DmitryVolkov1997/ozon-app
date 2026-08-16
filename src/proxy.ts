import createMiddleware from 'next-intl/middleware'
import { NextResponse, type NextRequest } from 'next/server'
import { PAGES } from './config/pages.config'
import { routing } from './i18n/routing'
import { getUser } from './lib/actions/user'

const intlMiddleware = createMiddleware(routing)
const protectedRoutes = ['/orders', '/cart']

export default async function middleware(request: NextRequest) {
	const { pathname } = request.nextUrl

	const isProtectedRoute = protectedRoutes.some(
		route => pathname.startsWith(route) || pathname.includes(route)
	)

	if (isProtectedRoute) {
		const user = await getUser()

		if (!user) {
			return NextResponse.redirect(new URL(PAGES.HOME, request.url))
		}
	}

	return intlMiddleware(request)
}

export const config = {
	matcher: '/((?!api|trpc|_next|_vercel|.*\\..*).*)'
}
