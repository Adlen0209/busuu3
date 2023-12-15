import { Router } from 'express';
const router = Router();
import { doSignUp, doSignIn, doSignOut, fetchOneUser, updateUser, deleteUser } from '../controllers/userController.js';
import { userSchema, userUpdateSchema } from '../../schema/user.schema.js';
import { validate } from '../middlewares/validateSchema.js';
import { getRefreshToken } from '../middlewares/getRefreshToken.js';
import { validateToken } from '../middlewares/validateToken.js';
import { auth, admin } from '../middlewares/auth.js';
import { refreshToken } from '../services/jsonWebToken.js';
router.post('/signup', validate(userSchema), doSignUp);
router.post('/signin', doSignIn);
router.get('/signout', [getRefreshToken], doSignOut);
router.get('/users/:userId(\\d+)', [validateToken, auth, admin], fetchOneUser);
router.patch('/users/:userId(\\d+)', validate(userUpdateSchema), [validateToken, auth], updateUser);
router.delete('/users/:userId(\\d+)', [validateToken, auth], deleteUser);
router.post('/refreshToken', [getRefreshToken], refreshToken);
export { router };
//# sourceMappingURL=user.js.map