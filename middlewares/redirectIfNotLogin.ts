import {
  NextFetchEvent,
  NextMiddleware,
  NextRequest,
  NextResponse
} from 'next/server';
import { MiddlewareFactory } from './types';

import { getToken } from 'next-auth/jwt';

export const redirectIfNotLogin: MiddlewareFactory = (next: NextMiddleware) => {
  return async (request: NextRequest, _next: NextFetchEvent) => {
    const res = await next(request, _next);
    const pathname = request.nextUrl.pathname;
    const token = await getToken({
      req: request,
      secret: process.env.NEXT_AUTH_SECRET
    });
    if (
      (!token || token?.role !== 'ADMIN') &&
      ['/api/admin'].some((word) => pathname.includes(word))
    ) {
      return NextResponse.redirect(new URL('/', request.url));
    }
    return res;
  };
};
