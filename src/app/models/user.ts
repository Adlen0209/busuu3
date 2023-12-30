import { CoreModel } from './coreModel.js';
import { User } from '../datamapper/index.js';

class UserModel extends CoreModel {
  //& Properties
  infoNotFound = `User doesn't exist`;
  infoEmail = `Email already exist !`;
  infoEmailNotFound = `User unknown !`;

  //& Methods
  emailExist = (email: string) => {
    return User.findUserByEmail(email);
  };

  createOneItem = (item: object) => {
    console.log(item)
    return User.create(item);
  };

  userFound = (userId: number) => {
    return User.findOne(userId);
  };

  updateOneItem = (item: object) => {
    return User.update(item);
  };

  deleteOneItem = (userId: number) => {
    return User.delete(userId);
  };
}

const userModel = new UserModel();
export { userModel };