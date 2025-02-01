import { createSlice } from '@reduxjs/toolkit';
import { createUser, getUser, updateUser, deleteUser, login, logout, forgotPassword, resetPassword } from './actions.js';

const createState = () => ({
  request: false,
  error: null,
});

const initialState = {
  isAuthChecked: false,
  user: null,

  createUser: createState(),
  getUser: createState(),
  updateUser: createState(),
  deleteUser: createState(),
  register: createState(),
  login: createState(),
  logout: createState(),
  forgotPassword: createState(),
  resetPassword: {
    forgotPassword: false,
    ...createState(),
  },
};

const slice = createSlice({
  name: 'auth',
  initialState,
  selectors: {
    checkAuth: state => !!state.user,
  },
  reducers: {
    resetError: (state, action) => {
      state[action.payload].error = null;
    },
  },
  extraReducers: builder => builder
    .addCase(createUser.pending, (state) => {
      state.createUser.request = true;
      state.createUser.error = null;
    })
    .addCase(createUser.rejected, (state, action) => {
      state.createUser.request = false;
      state.createUser.error = action.payload || action.error?.message || 'Неизвестная ошибка при регистрации пользователя';
    })
    .addCase(createUser.fulfilled, (state, action) => {
      state.createUser.request = false;
      state.user = action.payload.user;
    })

    .addCase(getUser.pending, (state) => {
      state.getUser.request = true;
      state.getUser.error = null;
    })
    .addCase(getUser.rejected, (state, action) => {
      state.isAuthChecked = true;
      state.getUser.request = false;
      state.getUser.error = action.payload || action.error?.message || 'Неизвестная ошибка при получении данных пользователя';
    })
    .addCase(getUser.fulfilled, (state, action) => {
      state.isAuthChecked = true;
      state.user = action.payload.user;
      state.getUser.request = false;
    })

    .addCase(updateUser.pending, (state) => {
      state.updateUser.request = true;
      state.updateUser.error = null;
    })
    .addCase(updateUser.rejected, (state, action) => {
      state.updateUser.request = false;
      state.updateUser.error = action.payload || action.error?.message || 'Неизвестная ошибка при обновлении данных пользователя';
    })
    .addCase(updateUser.fulfilled, (state, action) => {
      state.user = action.payload.user;
      state.updateUser.request = false;
    })

    .addCase(deleteUser.pending, (state) => {
      state.deleteUser.request = true;
      state.deleteUser.error = null;
    })
    .addCase(deleteUser.rejected, (state, action) => {
      state.deleteUser.request = false;
      state.deleteUser.error = action.payload || action.error?.message || 'Неизвестная ошибка при удалении пользователя';
    })
    .addCase(deleteUser.fulfilled, (state) => {
      state.user = null;
      state.deleteUser.request = false;
    })

    .addCase(login.pending, (state) => {
      state.login.request = true;
      state.login.error = null;
    })
    .addCase(login.rejected, (state, action) => {
      state.login.request = false;
      state.login.error = action.payload || action.error?.message || 'Неизвестная ошибка при логине';
    })
    .addCase(login.fulfilled, (state, action) => {
      state.user = action.payload.user;
      state.login.request = false;
    })

    .addCase(logout.pending, (state) => {
      state.logout.request = true;
      state.logout.error = null;
    })
    .addCase(logout.rejected, (state, action) => {
      state.logout.request = false;
      state.logout.error = action.payload || action.error?.message || 'Неизвестная ошибка при выходе';
    })
    .addCase(logout.fulfilled, (state, action) => {
      state.user = action.payload.user;
      state.logout.request = false;
    })

    .addCase(forgotPassword.pending, (state) => {
      state.forgotPassword.request = true;
      state.forgotPassword.error = null;
    })
    .addCase(forgotPassword.rejected, (state, action) => {
      state.forgotPassword.request = false;
      state.forgotPassword.error = action.payload || action.error?.message || 'Неизвестная ошибка при восстановлении пароля';
    })
    .addCase(forgotPassword.fulfilled, (state) => {
      state.resetPassword.forgotPassword = true;
      state.forgotPassword.request = false;
    })

    .addCase(resetPassword.pending, (state) => {
      state.resetPassword.request = true;
      state.resetPassword.error = null;
    })
    .addCase(resetPassword.rejected, (state, action) => {
      state.resetPassword.request = false;
      state.resetPassword.error = action.payload || action.error?.message || 'Неизвестная ошибка при восстановлении пароля';
    })
    .addCase(resetPassword.fulfilled, (state) => {
      state.resetPassword.forgotPassword = false;
      state.resetPassword.request = false;
    })
});

export const { checkAuth } = slice.selectors;
export const { resetError } = slice.actions;
export default slice.reducer;
