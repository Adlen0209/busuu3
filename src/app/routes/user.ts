//~ Import Router
import { Router } from 'express';
const router = Router();
import { doSignUp, doSignIn, doSignOut, fetchOneUser, updateUser, deleteUser } from '../controllers/userController.js';
import { userSchema, userUpdateSchema } from '../../schema/user.schema.js';
import { validate } from '../middlewares/validateSchema.js';
import { getRefreshToken } from '../middlewares/getRefreshToken.js';
import { validateToken } from '../middlewares/validateToken.js';
import { auth, admin } from '../middlewares/auth.js';
import { refreshToken } from '../services/jsonWebToken.js';




//~ signup
router.post('/signup', validate(userSchema), doSignUp);

//~ login
router.post('/signin', doSignIn);

//~ logout
router.get('/signout', [getRefreshToken], doSignOut);

//~ fetch one user
router.get('/users/:userId(\\d+)', [validateToken, auth, admin], fetchOneUser);

//~ Update user 
router.patch('/users/:userId(\\d+)', validate(userUpdateSchema), [validateToken, auth], updateUser)

//~ Update user 
router.delete('/users/:userId(\\d+)', [validateToken, auth], deleteUser);

router.post('/refreshToken', [getRefreshToken], refreshToken);

export { router };