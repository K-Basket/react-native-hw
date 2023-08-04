import { combineReducers, configureStore } from '@reduxjs/toolkit';

const rootReducer = combineReducers({}); // объединяет все состояния в один объект

export const store = configureStore({
  reducer: rootReducer,
});
