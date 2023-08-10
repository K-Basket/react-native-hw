import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from 'firebase/auth';
import { auth } from '../../firebase/config';
import { authSignOut, authStateChange, updateUserProfile } from './sliceAuth';
// const dispatch = useDispatch();

// Регистрация Usera в базе firebase
export const authSignUpUser =
  ({ login, email, password }) =>
  async (dispatch, getState) => {
    try {
      // созлдать usera в базе Firebase
      await createUserWithEmailAndPassword(auth, email, password);

      // обновить данные usera в базе firebase
      await updateProfile(auth.currentUser, {
        displayName: login,
      });

      // получить данные пользователя
      // const userCurrent = auth.currentUser;
      const { uid, displayName } = auth.currentUser;

      // отправить в Store данные пользователя
      dispatch(
        updateUserProfile({
          userId: uid,
          nickName: displayName,
          email,
        })
      );
    } catch (error) {
      throw error.message;
    }
  };

// Login зарегистрированного Usera
export const authSignInUser =
  ({ email, password }) =>
  async (dispatch, getState) => {
    try {
      const user = await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      throw error.message;
    }
  };

// Logout Usera
export const authSignOutUser = () => async (dispatch, getState) => {
  await signOut(auth);
  dispatch(authSignOut());
};

// проверка аутентификации пользователя
export const authStateChangeUser = () => async (dispatch, getState) => {
  await onAuthStateChanged(auth, user => {
    if (user) {
      const uid = user.uid;
      const displayName = user.displayName;
      const email = user.email;

      // отправить в Store данные пользователя после проверки аутентификации
      dispatch(
        updateUserProfile({
          userId: uid,
          nickName: displayName,
          email: email,
        })
      );
      // добавлен флаг для использования в RegistrationScreen.js и LoginScreen.js
      dispatch(authStateChange({ isLoggetIn: true }));
    }
  });
};
/*
после перезагрузки приложения в файле navigation.js с помощью useEffect будет
запущена функция authStateChangeUser, котораяя проверит наличие пользователя в базе Firebase
и вернет объект данных, после мы снова диспатчим в стейт данные - это замена библиотеки persistor
*/
