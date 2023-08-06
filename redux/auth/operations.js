import { db } from '../../firebase/config';

export const authSignUpUser =
  ({ login, email, password }) =>
  async (dispatch, getState) => {
    try {
      const user = await db
        .auth()
        .createUserWithEmailAndPassword(email, password);
      console.log('user :>> ', user);
    } catch (error) {
      console.error(error.message);
    }
  }; // Register

export const authSignInUser = () => async (dispatch, getState) => {}; // login

export const authSignOutUser = () => async (dispatch, getState) => {}; // logout
