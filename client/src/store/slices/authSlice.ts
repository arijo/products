import { createSlice } from '@reduxjs/toolkit';

interface AuthState {
  username: string | null;
  role: 'USER' | 'ADMIN' | null;
}

const initialState: AuthState = {
  username: null,
  role: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login(state, action: { payload: { username: string; role: 'USER' | 'ADMIN' } }) {
      state.username = action.payload.username;
      state.role = action.payload.role;
    },
    logout(state) {
      state.username = null;
      state.role = null;
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;