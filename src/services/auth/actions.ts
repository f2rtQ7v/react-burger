import { createAsyncThunk } from '@reduxjs/toolkit';
import { auth } from '../../utils/api.ts';

export const actions = {
  createUser: createAsyncThunk('auth/register', data => auth.createUser(data)),
  getUser: createAsyncThunk('auth/getUser', () => auth.getUser()),
  updateUser: createAsyncThunk('auth/updateUser', data => auth.updateUser(data)),
  deleteUser: createAsyncThunk('auth/deleteUser', () => auth.deleteUser()),
  login: createAsyncThunk('auth/login', data => auth.login(data)),
  logout: createAsyncThunk('auth/logout', () => auth.logout()),
  forgotPassword: createAsyncThunk('auth/forgotPassword', data => auth.forgotPassword(data)),
  resetPassword: createAsyncThunk('auth/resetPassword', data => auth.resetPassword(data)),
};

export type TAuthAction = keyof typeof actions;
