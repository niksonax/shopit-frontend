import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isAuthenticated: false,
  id: null,
  name: null,
  email: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setCredentials(state, action) {
      const { id, name, email } = action.payload;
      state.id = id;
      state.name = name;
      state.email = email;
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
