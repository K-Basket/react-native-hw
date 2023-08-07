import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from 'firebase/auth';
import { auth } from '../../firebase/config';
import { useDispatch } from 'react-redux';
import { sliceAuth } from './sliceAuth';
// const dispatch = useDispatch();

// создаем пользователя в базе firebase
export const authSignUpUser =
  ({ login, email, password }) =>
  async (dispatch, getState) => {
    try {
      const { user } = await createUserWithEmailAndPassword(
        auth,
        login,
        email,
        password
      );
      dispatch(sliceAuth.actions.updateUserProfile({ userId: user.uid }));
      // console.log('user.uid :>> ', user.uid);
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
      // console.log('userLogin :>> ', user);
    } catch (error) {
      throw error.message;
    }
  }; // login

export const authSignOutUser = () => async (dispatch, getState) => {}; // logout
