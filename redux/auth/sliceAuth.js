import { createSlice } from '@reduxjs/toolkit';

export const sliceAuth = createSlice({
  name: 'auth',
  initialState: {
    userId: null,
    nickname: null,
  },
  reducers: {},
});
