import { userModel } from '../models/user.js';
import bcrypt from 'bcrypt';
import { generateAccessToken, generateRefreshToken } from '../services/jsonWebToken.js';
import debug from "debug";
import { ErrorApi } from '../services/errorHandler.js';
const logger = debug("Controller");
import { coreController } from './coreController.js';
const doSignUp = async (req, res) => {
    try {
        let { email, mot_de_passe, mot_de_passe_confirm } = req.body;
        await userModel.checkEmail(req, res, email);
        if (mot_de_passe !== mot_de_passe_confirm) {
            throw new ErrorApi(`Not the same password`, req, res, 401);
        }
        else {
            delete req.body.mot_de_passe_confirm;
        }
        ;
        const salt = await bcrypt.genSalt(10);
        mot_de_passe = await bcrypt.hash(mot_de_passe, salt);
        req.body.mot_de_passe = mot_de_passe;
        console.log(req.body);
        await userModel.createItem(req, res);
        return res.status(201).json(`User successfully created !`);
    }
    catch (err) {
        if (err instanceof Error)
            logger(err.message);
        console.log("controller error");
    }
};
const doSignIn = async (req, res) => {
    try {
        let { email, mot_de_passe } = req.body;
        const userExist = await userModel.fetchEmail(req, res, email);
        const validPwd = await bcrypt.compare(mot_de_passe, userExist.mot_de_passe);
        if (!validPwd)
            throw new ErrorApi(`Email or password not valid !`, req, res, 401);
        const { ['mot_de_passe']: remove, ...user } = userExist;
        let accessToken = generateAccessToken({ user });
        let refreshToken = generateRefreshToken({ user }, req);
        let userIdentity = { ...user, accessToken, refreshToken };
        return res.status(200).json(userIdentity);
    }
    catch (err) {
        if (err instanceof Error)
            logger(err.message);
    }
};
const doSignOut = async (req, res) => {
    try {
        req.user = null;
        req.session.destroy();
        console.log('signout user', req.user);
        return res.status(200).json(`User disconnected !`);
    }
    catch (err) {
        if (err instanceof Error)
            logger(err.message);
    }
};
const fetchOneUser = async (req, res) => {
    try {
        const userId = await coreController.paramsHandler(req, res, 'userId');
        const user = await userModel.fetchUser(req, res, userId);
        delete user['password'];
        return res.status(200).json(user);
    }
    catch (err) {
        if (err instanceof Error)
            logger(err.message);
    }
};
const updateUser = async (req, res) => {
    try {
        let { email, mot_de_passe, mot_de_passe_confirm } = req.body;
        const userId = await coreController.paramsHandler(req, res, 'userId');
        await userModel.fetchUser(req, res, userId);
        await userModel.checkEmail(req, res, email);
        if (mot_de_passe) {
            if (mot_de_passe !== mot_de_passe_confirm) {
                throw new ErrorApi(`Not the same password !`, req, res, 401);
            }
            else {
                delete req.body.mot_de_passe_confirm;
            }
            ;
            const salt = await bcrypt.genSalt(10);
            mot_de_passe = await bcrypt.hash(mot_de_passe, salt);
            req.body.mot_de_passe = mot_de_passe;
        }
        if (req.user?.id !== userId)
            throw new ErrorApi(`Given informations not allows any modification`, req, res, 403);
        req.body = { ...req.body, id: userId };
        await userModel.updateItem(req);
        return res.status(200).json(`Informations successfully updated !`);
    }
    catch (err) {
        if (err instanceof Error)
            logger(err.message);
    }
};
const deleteUser = async (req, res) => {
    try {
        console.log("controller");
        const userId = req.user?.id;
        const userIdParams = await coreController.paramsHandler(req, res, 'userId');
        console.log('idparams', userIdParams);
        console.log('userId', userId);
        const user = await userModel.fetchUser(req, res, userIdParams);
        console.log('user', user);
        if (userId !== userIdParams && req.user?.role !== 2)
            throw new ErrorApi(`You cannot access this info, go away !`, req, res, 400);
        await userModel.deleteItem(userIdParams);
        req.user = null;
        req.session.destroy();
        return res.status(200).json(`User successfully deleted`);
    }
    catch (err) {
        if (err instanceof Error)
            logger(err.message);
    }
};
export { doSignUp, doSignIn, doSignOut, fetchOneUser, updateUser, deleteUser };
//# sourceMappingURL=userController.js.map