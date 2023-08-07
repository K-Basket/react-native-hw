import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebase/config';

export const authSignUpUser =
  ({ email, password }) =>
  async () => {
    try {
      const user = await createUserWithEmailAndPassword(auth, email, password);
      console.log('user :>> ', user);
    } catch (error) {
      throw error;
    }
  }; // Register

export const authSignInUser = () => async (dispatch, getState) => {}; // login

export const authSignOutUser = () => async (dispatch, getState) => {}; // logout
