import { ErrorApi } from '../services/errorHandler.js';
function auth(req, res, next) {
    if (!req.user)
        throw new ErrorApi(`User not connected !`, req, res, 401);
    next();
}
function admin(req, res, next) {
    if (req.user?.role !== 2)
        throw new ErrorApi(`You cannot access this info, you're not admin!`, req, res, 403);
    next();
}
export { auth, admin };
//# sourceMappingURL=auth.js.map