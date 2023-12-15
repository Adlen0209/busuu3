//~ Import module
import { ErrorApi } from '../services/errorHandler.js';
import { Request, Response, NextFunction } from 'express';


//~ Authentication
function auth(req:Request, res:Response, next: NextFunction):void {
  if (!req.user) throw new ErrorApi(`User not connected !`, req, res, 401);
  
  next();
}

// function role(req:Request, res:Response, next:NextFunction) {
//   if (req.user?.role === 2) {
//     next();
//   } else {throw new ErrorApi(`Accès interdit !`, req, res, 403);}
  
// }

function admin(req:Request, res:Response, next: NextFunction) {
    if (req.user?.role !== 2) throw new ErrorApi(`You cannot access this info, you're not admin!`, req, res, 403);
    next();
}

export { auth, admin };