import { createSlice, ActionReducerMapBuilder, PayloadAction } from '@reduxjs/toolkit';
import { actions, TAuthAction } from './actions.ts';
import createRequestState from '@utils/create-request-state.ts';

const SLICE_NAME = 'auth';

type TAuthRequestStates = {
  [k in TAuthAction]: IRequestState;
};

type TAuthState = TWithUser & TAuthRequestStates & {
  isAuthChecked: boolean;
  passwordResetRequired: boolean;
};

type TActionCallback<T = unknown> = (
  state: TAuthState,
  action: PayloadAction<T>,
) => void;

type TActionCallbacks = {
  [k in TAuthAction]: TActionCallback<TWithUser> | {
    fullfield: TActionCallback<TWithUser>;
    rejected: TActionCallback;
  };
};

const initialState: TAuthState = {
  user: null,
  isAuthChecked: false,
  passwordResetRequired: false,
  ...Object.fromEntries(Object
    .keys(actions)
    .map(n => [ n, createRequestState() ])
  ) as TAuthRequestStates,
};

function createReducers(
  builder: ActionReducerMapBuilder<TAuthState>,
  callbacks: TActionCallbacks
) {
  Object.entries(callbacks).forEach(([ k, callback ]) => {
    const key = k as TAuthAction;
    builder
      .addCase(actions[key].pending, (state) => {
        state[key].request = true;
        state[key].error = null;
      })
      .addCase(actions[key].rejected, (state, action) => {
        state[key].request = false;
        state[key].error = action.error?.message || `${SLICE_NAME}/${key}: неизвестная ошибка`;
        callback instanceof Function || callback.rejected(state, action);
      })
      .addCase(actions[key].fulfilled, (state, action) => {
        state[key].request = false;
        (callback instanceof Function ? callback : callback.fullfield)(state, action);
      });
  });
}

const slice = createSlice({
  name: SLICE_NAME,
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
  extraReducers(builder) {
    createReducers(builder, {
      createUser: (state, action) => state.user = action.payload.user,
      getUser: {
        fullfield: (state, action) => {
          state.isAuthChecked = true;
          state.user = action.payload.user;
        },
        rejected: state => state.isAuthChecked = true,
      },
      updateUser: (state, action) => state.user = action.payload.user,
      deleteUser: (state) => state.user = null,
      login: (state, action) => state.user = action.payload.user,
      logout: (state) => state.user = null,
      forgotPassword: (state) => state.passwordResetRequired = true,
      resetPassword: (state) => state.passwordResetRequired = false,
    });
  },
});

export const { getAuthState, checkAuth } = slice.selectors;
export const { resetError } = slice.actions;
export default slice.reducer;
