import { createSlice } from '@reduxjs/toolkit';

export const sliceAuth = createSlice({
  name: 'auth',
  initialState: {
    userId: null,
    nickname: null,
    stateChange: null,
  },
  reducers: {
    updateUserProfile: (state, action) => ({
      ...state,
      userId: action.payload.userId,
    }),
    authStateChange: (state, action) => ({
      ...state,
      stateChange: action.payload.stateChange,
    }),
  },
});
