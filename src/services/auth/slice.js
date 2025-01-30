import { createSlice } from '@reduxjs/toolkit';
import { createUser, getUser, updateUser, deleteUser, login, logout, forgotPassword, resetPassword } from './actions.js';

const initialState = {
  isAuthChecked: false,
  user: null,
  request: false,
  error: null,
  forgotPassword: false,
};

const slice = createSlice({
  name: 'auth',
  initialState,
  selectors: {
    checkAuth: state => !!state.user,
  },
  reducers: {
    resetError: state => {
      state.error = null;
    },
  },
  extraReducers: builder => builder
    .addCase(createUser.pending, (state) => {
      state.request = true;
      state.error = null;
    })
    .addCase(createUser.rejected, (state, action) => {
      state.request = false;
      state.error = action.payload || action.error?.message || 'Неизвестная ошибка при регистрации пользователя';
    })
    .addCase(createUser.fulfilled, (state, action) => {
      state.request = false;
      state.user = action.payload.user;
    })

    .addCase(getUser.pending, (state) => {
      state.request = true;
      state.error = null;
    })
    .addCase(getUser.rejected, (state, action) => {
      state.isAuthChecked = true;
      state.request = false;
      state.error = action.payload || action.error?.message || 'Неизвестная ошибка при получении данных пользователя';
    })
    .addCase(getUser.fulfilled, (state, action) => {
      state.isAuthChecked = true;
      state.user = action.payload.user;
      state.request = false;
    })

    .addCase(updateUser.pending, (state) => {
      state.request = true;
      state.error = null;
    })
    .addCase(updateUser.rejected, (state, action) => {
      state.request = false;
      state.error = action.payload || action.error?.message || 'Неизвестная ошибка при обновлении данных пользователя';
    })
    .addCase(updateUser.fulfilled, (state, action) => {
      state.user = action.payload.user;
      state.request = false;
    })

    .addCase(deleteUser.pending, (state) => {
      state.request = true;
      state.error = null;
    })
    .addCase(deleteUser.rejected, (state, action) => {
      state.request = false;
      state.error = action.payload || action.error?.message || 'Неизвестная ошибка при удалении пользователя';
    })
    .addCase(deleteUser.fulfilled, (state) => {
      state.user = null;
      state.request = false;
    })

    .addCase(login.pending, (state) => {
      state.request = true;
      state.error = null;
    })
    .addCase(login.rejected, (state, action) => {
      state.request = false;
      state.error = action.payload || action.error?.message || 'Неизвестная ошибка при логине';
    })
    .addCase(login.fulfilled, (state, action) => {
      state.user = action.payload.user;
      state.request = false;
      state.error = null;
    })

    .addCase(logout.pending, (state) => {
      state.request = true;
      state.error = null;
    })
    .addCase(logout.rejected, (state, action) => {
      state.request = false;
      state.error = action.payload || action.error?.message || 'Неизвестная ошибка при выходе';
    })
    .addCase(logout.fulfilled, (state, action) => {
      state.user = action.payload.user;
      state.request = false;
      state.error = null;
    })

    .addCase(forgotPassword.pending, (state) => {
      state.request = true;
      state.error = null;
    })
    .addCase(forgotPassword.rejected, (state, action) => {
      state.request = false;
      state.error = action.payload || action.error?.message || 'Неизвестная ошибка при восстановлении пароля';
    })
    .addCase(forgotPassword.fulfilled, (state) => {
      state.forgotPassword = true;
      state.request = false;
      state.error = null;
    })

    .addCase(resetPassword.pending, (state) => {
      state.request = true;
      state.error = null;
    })
    .addCase(resetPassword.rejected, (state, action) => {
      state.request = false;
      state.error = action.payload || action.error?.message || 'Неизвестная ошибка при восстановлении пароля';
    })
    .addCase(resetPassword.fulfilled, (state) => {
      state.forgotPassword = false;
      state.request = false;
      state.error = null;
    })
});

export const { checkAuth } = slice.selectors;
export const { resetError } = slice.actions;
export default slice.reducer;
