import { stackMiddlewares } from 'middlewares/stackMiddlewares';
import { redirectIfNotLogin } from 'middlewares/redirectIfNotLogin';

const middlewares = [redirectIfNotLogin];

export default stackMiddlewares(middlewares);
