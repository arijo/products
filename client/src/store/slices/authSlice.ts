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
      localStorage.setItem('auth', JSON.stringify({ username: action.payload.username, role: action.payload.role }));
    },
    logout(state) {
      state.username = null;
      state.role = null;
      localStorage.removeItem('auth');
    },
    loadFromStorage(state) {
      const authState = localStorage.getItem('auth');
      if (authState) {
        try {
          const { username, role } = JSON.parse(authState);
          state.username = username;
          state.role = role;
        } catch (error) {
          console.error('Error parsing auth state:', error);
          localStorage.removeItem('auth');
        }
      }
    },
  },
});

export const { login, logout, loadFromStorage } = authSlice.actions;
export default authSlice.reducer;