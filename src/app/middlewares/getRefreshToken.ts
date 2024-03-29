//~ Import Debug 
import debug from 'debug'; 
const logger = debug('Jwt');

//~ Import
import { Request, Response, NextFunction } from 'express';
import { ErrorApi } from '../services/errorHandler.js';
import jwt from 'jsonwebtoken';

//~ Get refresh token
function getRefreshToken(req: Request, res: Response, next: NextFunction) {
  try {
    //get token from header
    const authHeader = req.headers['authorization'];

    if (authHeader === undefined) throw new ErrorApi('No token found !', req, res, 400);

    //   header contains token "Bearer <token>", split the string and get the 2nd part of the array
    let refreshToken = authHeader.split(' ')[1];

    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET!, (err: unknown, user: any) => {
      if (err) {
        throw new ErrorApi('The token is invalid!', req, res, 403);
      }
      // reset refresh token in session
      req.session.refreshToken = [];
      req.user = user.user;
      
      next();
    });
  } catch (err) {
    if (err instanceof Error) logger(err.message);
  }
}

export { getRefreshToken };