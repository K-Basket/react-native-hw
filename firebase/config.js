// import * as firebase from 'firebase';
// const { getDefaultConfig } = require('@expo/metro-config');
// Для роботи із firebase обовʼязково треба ініціалізувати проект
import { initializeApp } from 'firebase/app';
// Функція для підключення авторизації в проект
import { getAuth } from 'firebase/auth';
// Функція для підключення бази даних у проект
import { getFirestore } from 'firebase/firestore';
// Функція для підключення сховища файлів в проект
import { getStorage } from 'firebase/storage';

// const defaultConfig = getDefaultConfig(__dirname);
// defaultConfig.resolver.assetExts.push('cjs');

const firebaseConfig = {
  apiKey: 'AIzaSyCGEyw04CSWFqi0OEUsIX2p7B95PgEEq-s',
  authDomain: 'rn-social-46962.firebaseapp.com',
  projectId: 'rn-social-46962',
  storageBucket: 'rn-social-46962.appspot.com',
  messagingSenderId: '786483358997',
  appId: '1:786483358997:web:84f19d4b1878a473bf4d1c',
  measurementId: 'G-CGNJ4PGWFV',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

// module.exports = defaultConfig;
