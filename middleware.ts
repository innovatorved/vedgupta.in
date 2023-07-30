import { stackMiddlewares } from 'middlewares/stackMiddlewares';
import { redirectIfNotLogin } from 'middlewares/redirectIfNotLogin';

const middlewares = [redirectIfNotLogin];

export default stackMiddlewares(middlewares);

// See "Matching Paths" below to learn more
export const config = {
    matcher: '/api/:path*',
}