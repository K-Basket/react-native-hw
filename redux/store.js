import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { sliceAuth } from './auth/sliceAuth';

const rootReducer = combineReducers({
  [sliceAuth.name]: sliceAuth.reducer,
}); // объединяет все состояния в один объект

export const store = configureStore({
  reducer: rootReducer,
});

// //=======================================================
// // или без использования combineReducers()
// export const storeTwo = configureStore({
//   reducer: {
//     auth: sliceAuth.reducer,
//   },
// });
