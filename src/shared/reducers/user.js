import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isAuthenticated: false,
  email: null,
  name: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setCredentials(state, action) {
      const { email, name } = action.payload;
      state.email = email;
      state.name = name;
    },
    setAuthenticated(state, action) {
      const { isAuthenticated } = action.payload;
      state.isAuthenticated = isAuthenticated;
    },
  },
});

export const { setCredentials, setAuthenticated } = userSlice.actions;

export const userReducer = userSlice.reducer;

export const selectCurrentUser = (state) => state.userReducer;
export const isUserAuthenticated = (state) => state.userReducer.isAuthenticated;
