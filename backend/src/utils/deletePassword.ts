import { UserType } from '../user-model/user-types';

export const deletePassword = (users: any) => {
  if (users.password) {
    const userWithoutPassword: Partial<UserType> = { ...users };
    delete userWithoutPassword.password;
    return userWithoutPassword;
  } else {
    return users.map((user: any) => deletePassword(user._doc));
  }
};
