import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from 'firebase/auth';
import { auth } from '../../firebase/config';

// создаем пользователя в базе firebase
export const authSignUpUser =
  ({ login, email, password }) =>
  async (dispatch, getState) => {
    try {
      const user = await createUserWithEmailAndPassword(auth, email, password);
      console.log('user :>> ', user);
    } catch (error) {
      throw error.message;
    }
  }; // Register

// вход существующего пользователя
export const authSignInUser =
  ({ email, password }) =>
  async (dispatch, getState) => {
    try {
      const user = await signInWithEmailAndPassword(auth, email, password);
      console.log('userLogin :>> ', user);
    } catch (error) {
      throw error.message;
    }
  }; // login

export const authSignOutUser = () => async (dispatch, getState) => {}; // logout
