//~ Import modules
import { Request, Response } from 'express';
import { userModel } from '../models/user.js';
import bcrypt from 'bcrypt';
//~ Authorization
import { generateAccessToken, generateRefreshToken } from '../services/jsonWebToken.js';
// Import Debug
import debug from "debug";
import { ErrorApi } from '../services/errorHandler.js';
const logger = debug("Controller");
import { coreController } from './coreController.js';


const doSignUp = async (req: Request, res: Response) => {
    try {
        let {  email, mot_de_passe, mot_de_passe_confirm } = req.body;
    
    
        //~ email already exist ?
         await userModel.checkEmail(req, res, email);
    
        //~ Encrypt password if password exist
         if (mot_de_passe !== mot_de_passe_confirm) {

          throw new ErrorApi(`Not the same password`, req, res, 401)
        } else {
          delete req.body.mot_de_passe_confirm;
        };
    
         const salt = await bcrypt.genSalt(10);
         mot_de_passe  = await bcrypt.hash(mot_de_passe, salt);
        //replace password in body
         req.body.mot_de_passe = mot_de_passe;
        console.log(req.body);
    
        //~ Create user
        await userModel.createItem(req, res);
        
        
        //~ Send an email to confirm creation
        // await sendEmail.toUser(email, 'subscribe');
    
        //~ Result
        return res.status(201).json(`User successfully created !`);
      } catch (err) {
        if (err instanceof Error) logger(err.message);
        console.log("controller error")
      }
    };

    //& -------- doSignIn
const doSignIn = async (req: Request, res: Response) => {
  try {
    let { email, mot_de_passe } = req.body;

    //~ email already exist ?
    const userExist = await userModel.fetchEmail(req, res, email);

    //~ Security
    const validPwd = await bcrypt.compare(mot_de_passe, userExist.mot_de_passe);
    if (!validPwd) throw new ErrorApi(`Email or password not valid !`, req, res, 401);

    const { ['mot_de_passe']: remove, ...user } = userExist;

    //~ Authorization JWT
    let accessToken = generateAccessToken({ user });
    let refreshToken = generateRefreshToken({ user }, req);
    let userIdentity = { ...user, accessToken, refreshToken };

    //~ Result
    return res.status(200).json(userIdentity);
  } catch (err) {
    if (err instanceof Error) logger(err.message);
  }
};

//& -------- doSignOut
const doSignOut = async (req: Request, res: Response) => {
  try {
    
    req.user = null;
    req.session.destroy();

    console.log('signout user', req.user)
    
   
    //~ Result
     return res.status(200).json(`User disconnected !`);
  } catch (err) {
    if (err instanceof Error) logger(err.message);
  }
};

//& -------- fetchOneUser
const fetchOneUser = async (req: Request, res: Response) => {
  try {
    //~ Is id a number ?
    const userId = await coreController.paramsHandler(req, res, 'userId');

    //~ fetch if exist
    const user = await userModel.fetchUser(req, res, userId);

    //~ Delete password display
    delete user['password'];

    //~ Result
    return res.status(200).json(user);
  } catch (err) {
    if (err instanceof Error) logger(err.message);
  }
};

//& -------- updateUser
const updateUser = async (req: Request, res: Response) => {
  try {
    let { email, mot_de_passe, mot_de_passe_confirm } = req.body;

    //~ Is id a number ?
    const userId = await coreController.paramsHandler(req, res, 'userId');

    //~ fetch if exist
     await userModel.fetchUser(req, res, userId);

    //~ check email if exist ?
    await userModel.checkEmail(req, res, email);

    //~ Encrypt password if password exist
    if (mot_de_passe) {
      if (mot_de_passe !== mot_de_passe_confirm) {
         throw new ErrorApi(`Not the same password !`, req, res, 401)
      }  else {
        delete req.body.mot_de_passe_confirm;
      };

      const salt = await bcrypt.genSalt(10);
      mot_de_passe = await bcrypt.hash(mot_de_passe, salt);
      // replace password in body
      req.body.mot_de_passe = mot_de_passe;
    }

    
    //~ Guard Clauses
    if (req.user?.id !== userId) throw new ErrorApi(`Given informations not allows any modification`, req, res, 403);
    //~ Update user
    req.body = { ...req.body, id: userId };
    await userModel.updateItem(req);

    //~ Result
    return res.status(200).json(`Informations successfully updated !`);
  } catch (err) {
    if (err instanceof Error) logger(err.message);
  }
};

//& -------- deleteUser
const deleteUser = async (req: Request, res: Response) => {
  try {
    console.log("controller")
    const userId = req.user?.id;

    //~ Is id a number ?
    const userIdParams = await coreController.paramsHandler(req, res, 'userId');

    console.log('idparams', userIdParams)
    console.log('userId', userId)
    
    //~ User exist ?
    const user = await userModel.fetchUser(req, res, userIdParams);

    console.log('user', user)
    //~ Guard Clauses
    // only the user that want to access his info can or admin
    if (userId !== userIdParams && req.user?.role !== 2) throw new ErrorApi(`You cannot access this info`, req, res, 400);

    //~ Delete User
    await userModel.deleteItem(userIdParams);

    //~ Clean user session
    req.user = null;
    req.session.destroy();

    //~ Send an email to confirm delete user
   // await sendEmail.toUser(user.email, 'unsubscribe');

    //~ Result
    return res.status(200).json(`User successfully deleted`);
  } catch (err) {
    if (err instanceof Error) logger(err.message);
  }
};

    export { doSignUp, doSignIn, doSignOut, fetchOneUser, updateUser, deleteUser };