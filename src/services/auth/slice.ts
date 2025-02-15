import { createSlice } from '@reduxjs/toolkit';
import { actions, TAuthAction } from './actions.ts';
import createRequestState from '../../utils/create-request-state.ts';

const { createUser, getUser, updateUser, deleteUser, login, logout, forgotPassword, resetPassword } = actions;

type TAuthState = TWithUser & {
  isAuthChecked: boolean;
  passwordResetRequired: boolean;
} & {
  [k in TAuthAction]: IRequestState;
};

const initialState: TAuthState = {
  isAuthChecked: false,
  user: null,
  passwordResetRequired: false,

  createUser: createRequestState(),
  getUser: createRequestState(),
  updateUser: createRequestState(),
  deleteUser: createRequestState(),
  login: createRequestState(),
  logout: createRequestState(),
  forgotPassword: createRequestState(),
  resetPassword: createRequestState(),
};

const slice = createSlice({
  name: 'auth',
  initialState,
  selectors: {
    getAuthState: state => state,
    checkAuth: state => !!state.user,
  },
  reducers: {
    resetError: (state, action: { payload: TAuthAction }) => {
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
      state.createUser.error = action.error?.message || 'Неизвестная ошибка при регистрации пользователя';
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
      state.getUser.error = action.error?.message || 'Неизвестная ошибка при получении данных пользователя';
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
      state.updateUser.error = action.error?.message || 'Неизвестная ошибка при обновлении данных пользователя';
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
      state.deleteUser.error = action.error?.message || 'Неизвестная ошибка при удалении пользователя';
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
      state.login.error = action.error?.message || 'Неизвестная ошибка при логине';
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
      state.logout.error = action.error?.message || 'Неизвестная ошибка при выходе';
    })
    .addCase(logout.fulfilled, (state) => {
      state.user = null;
      state.logout.request = false;
    })

    .addCase(forgotPassword.pending, (state) => {
      state.forgotPassword.request = true;
      state.forgotPassword.error = null;
    })
    .addCase(forgotPassword.rejected, (state, action) => {
      state.forgotPassword.request = false;
      state.forgotPassword.error = action.error?.message || 'Неизвестная ошибка при восстановлении пароля';
    })
    .addCase(forgotPassword.fulfilled, (state) => {
      state.passwordResetRequired = true;
      state.forgotPassword.request = false;
    })

    .addCase(resetPassword.pending, (state) => {
      state.resetPassword.request = true;
      state.resetPassword.error = null;
    })
    .addCase(resetPassword.rejected, (state, action) => {
      state.resetPassword.request = false;
      state.resetPassword.error = action.error?.message || 'Неизвестная ошибка при восстановлении пароля';
    })
    .addCase(resetPassword.fulfilled, (state) => {
      state.passwordResetRequired = false;
      state.resetPassword.request = false;
    })
});

export const { getAuthState, checkAuth } = slice.selectors;
export const { resetError } = slice.actions;
export default slice.reducer;
