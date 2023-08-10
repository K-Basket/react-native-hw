import { createSlice } from '@reduxjs/toolkit';

const state = {
  userId: null,
  nickName: null,
  isLoggetIn: false,
  collectionId: null,
};

export const sliceAuth = createSlice({
  name: 'auth',
  initialState: state,
  reducers: {
    updateUserProfile: (state, action) => ({
      ...state,
      userId: action.payload.userId,
      nickName: action.payload.nickName,
    }),
    authStateChange: (state, action) => ({
      ...state,
      isLoggetIn: action.payload.isLoggetIn,
    }),
    authSignOut: () => state,
    updateCollectionId: (state, action) => {
      state.collectionId = action.payload;
    },
  },
});

export const {
  updateUserProfile,
  authStateChange,
  authSignOut,
  updateCollectionId,
} = sliceAuth.actions;
