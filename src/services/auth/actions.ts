import { createAsyncThunk } from '@reduxjs/toolkit';
import { auth } from '../../utils/api.ts';

export const formActions = {
  createUser: createAsyncThunk('auth/register', (data: IUserData) => auth.createUser(data)),
  updateUser: createAsyncThunk('auth/updateUser', (data: IUserData) => auth.updateUser(data)),
  login: createAsyncThunk('auth/login', (data: IUserData) => auth.login(data)),
  forgotPassword: createAsyncThunk('auth/forgotPassword', (data: IUserData) => auth.forgotPassword(data)),
  resetPassword: createAsyncThunk('auth/resetPassword', (data: IUserData) => auth.resetPassword(data)),
};

export const actions = {
  ...formActions,
  getUser: createAsyncThunk('auth/getUser', () => auth.getUser()),
  deleteUser: createAsyncThunk('auth/deleteUser', () => auth.deleteUser()),
  logout: createAsyncThunk('auth/logout', () => auth.logout()),
};

export type TAuthFormAction = keyof typeof formActions;
export type TAuthAction = keyof typeof actions;
