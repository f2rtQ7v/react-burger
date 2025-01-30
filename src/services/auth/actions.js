import { createAsyncThunk } from '@reduxjs/toolkit';
import { auth } from '../../utils/api.js';

export const createUser = createAsyncThunk('auth/register', data => auth.createUser(data));
export const getUser = createAsyncThunk('auth/getUser', () => auth.getUser());
export const updateUser = createAsyncThunk('auth/updateUser', data => auth.updateUser(data));
export const deleteUser = createAsyncThunk('auth/deleteUser', () => auth.deleteUser());
export const login = createAsyncThunk('auth/login', data => auth.login(data));
export const logout = createAsyncThunk('auth/logout', () => auth.logout());
export const forgotPassword = createAsyncThunk('auth/forgotPassword', data => auth.forgotPassword(data));
export const resetPassword = createAsyncThunk('auth/resetPassword', data => auth.resetPassword(data));
