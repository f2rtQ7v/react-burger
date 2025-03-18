import { configureStore } from '@reduxjs/toolkit';
import reducer, { actions, initialState } from './slice.ts';

const user = {
  email: 'email',
  name: 'name',
};

const resetPasswordData = {
  password: 'password',
  token: 'token',
};

const error = 'ERROR';

const createLocalStorageMock = () => ({
  store: {},
  getItem: jest.fn(function(key) {
    return this.store[key];
  }),
  setItem: jest.fn(function(key, value) {
    this.store[key] = `${value}`;
  }),
  removeItem: jest.fn(function(key) {
    delete this.store[key];
  }),
});

function mockFetchSuccess(response = {}) {
  jest.spyOn(global, 'fetch').mockResolvedValue({
    ok: true,
    json: () => Promise.resolve({ success: true, ...response }),
  });
}

function mockFetchFail() {
  jest.spyOn(global, 'fetch').mockResolvedValue({
    ok: false,
    json: () => Promise.resolve({ success: false, message: error }),
  });
}

describe('user test', () => {

  let store = null;

  beforeEach(() => {
    store = configureStore({
      reducer,
      preloadedState: initialState,
    });

    global.localStorage = createLocalStorageMock();
    jest.spyOn(global.localStorage, 'setItem');
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('should return initial state', () => {
    expect(reducer(undefined, {})).toEqual(initialState);
  });

  it('should be pending user creation', () => {
    const action = {
      type: actions.createUser.pending.type,
    };

    expect(reducer(initialState, action)).toEqual({
      ...initialState,
      createUser: {
        request: true,
        error: null,
      },
    });
  });

  it('should create user', async () => {
    mockFetchSuccess({ user });

    await store.dispatch(actions.createUser(user));

    expect(localStorage.setItem).toBeCalledTimes(2);
    expect(fetch).toBeCalledTimes(1);
    expect(store.getState()).toEqual({ ...initialState, user });
  });

  it('should not create user', async () => {
    mockFetchFail();

    await store.dispatch(actions.createUser(user));

    expect(localStorage.setItem).toBeCalledTimes(0);
    expect(fetch).toBeCalledTimes(1);
    expect(store.getState()).toEqual({
      ...initialState,
      createUser: {
        request: false,
        error,
      },
    });
  });

  it('should be pending user data', () => {
    const action = {
      type: actions.getUser.pending.type,
    };

    expect(reducer(initialState, action)).toEqual({
      ...initialState,
      getUser: {
        request: true,
        error: null,
      },
    });
  });

  it('should get user data', async () => {
    global.localStorage.store.accessToken = 'token';

    mockFetchSuccess({ user });

    await store.dispatch(actions.getUser());

    expect(fetch).toBeCalledTimes(1);
    expect(store.getState()).toEqual({
      ...initialState,
      isAuthChecked: true,
      user,
    });
  });

  it('should not get user data', async () => {
    global.localStorage.store.accessToken = 'token';

    mockFetchFail();

    await store.dispatch(actions.getUser());

    expect(fetch).toBeCalledTimes(1);
    expect(store.getState()).toEqual({
      ...initialState,
      isAuthChecked: true,
      getUser: {
        request: false,
        error,
      },
    });
  });

  it('should be pending user data update', () => {
    const action = {
      type: actions.updateUser.pending.type,
    };

    expect(reducer(initialState, action)).toEqual({
      ...initialState,
      updateUser: {
        request: true,
        error: null,
      },
    });
  });

  it('should update user', async () => {
    mockFetchSuccess({ user });

    await store.dispatch(actions.updateUser(user));

    expect(fetch).toBeCalledTimes(1);
    expect(store.getState()).toEqual({ ...initialState, user });
  });

  it('should not update user', async () => {
    mockFetchFail();

    await store.dispatch(actions.updateUser(user));

    expect(fetch).toBeCalledTimes(1);
    expect(store.getState()).toEqual({
      ...initialState,
      updateUser: {
        request: false,
        error,
      },
    });
  });

  it('should be pending login', () => {
    const action = {
      type: actions.login.pending.type,
    };

    expect(reducer(initialState, action)).toEqual({
      ...initialState,
      login: {
        request: true,
        error: null,
      },
    });
  });

  it('should login user', async () => {
    mockFetchSuccess({ user });

    await store.dispatch(actions.login(user));

    expect(localStorage.setItem).toBeCalledTimes(2);
    expect(fetch).toBeCalledTimes(1);
    expect(store.getState()).toEqual({ ...initialState, user });
  });

  it('should not login user', async () => {
    mockFetchFail();

    await store.dispatch(actions.login(user));

    expect(localStorage.setItem).toBeCalledTimes(0);
    expect(fetch).toBeCalledTimes(1);
    expect(store.getState()).toEqual({
      ...initialState,
      login: {
        request: false,
        error,
      },
    });
  });

  it('should be pending logout', () => {
    const action = {
      type: actions.logout.pending.type,
    };

    expect(reducer(initialState, action)).toEqual({
      ...initialState,
      logout: {
        request: true,
        error: null,
      },
    });
  });

  it('should logout user', async () => {
    mockFetchSuccess();

    store.dispatch({
      type: actions.updateUser.fulfilled.type,
      payload: { user },
    });

    await store.dispatch(actions.logout());

    expect(localStorage.removeItem).toBeCalledTimes(2);
    expect(fetch).toBeCalledTimes(1);
    expect(store.getState()).toEqual(initialState);
  });

  it('should not logout user', async () => {
    mockFetchFail();

    store.dispatch({
      type: actions.updateUser.fulfilled.type,
      payload: { user },
    });

    await store.dispatch(actions.logout());

    expect(localStorage.removeItem).toBeCalledTimes(0);
    expect(fetch).toBeCalledTimes(1);
    expect(store.getState()).toEqual({
      ...initialState,
      user,
      logout: {
        request: false,
        error,
      },
    });
  });

  it('should be pending permission to change password', () => {
    const action = {
      type: actions.forgotPassword.pending.type,
    };

    expect(reducer(initialState, action)).toEqual({
      ...initialState,
      forgotPassword: {
        request: true,
        error: null,
      },
    });
  });

  it('should request password change', async () => {
    mockFetchSuccess();

    await store.dispatch(actions.forgotPassword({ email: user.email }));

    expect(fetch).toBeCalledTimes(1);
    expect(store.getState()).toEqual({
      ...initialState,
      passwordResetRequired: true,
    });
  });

  it('should fail request password change', async () => {
    mockFetchFail();

    await store.dispatch(actions.forgotPassword({ email: user.email }));

    expect(fetch).toBeCalledTimes(1);
    expect(store.getState()).toEqual({
      ...initialState,
      forgotPassword: {
        request: false,
        error,
      },
    });
  });

  it('should be pending password change', () => {
    const action = {
      type: actions.resetPassword.pending.type,
    };

    expect(reducer(initialState, action)).toEqual({
      ...initialState,
      resetPassword: {
        request: true,
        error: null,
      },
    });
  });

  it('should change password', async () => {
    mockFetchSuccess();

    store.dispatch({
      type: actions.forgotPassword.fulfilled.type,
    });

    await store.dispatch(actions.resetPassword(resetPasswordData));

    expect(fetch).toBeCalledTimes(1);
    expect(store.getState()).toEqual(initialState);
  });

  it('should fail password change', async () => {
    mockFetchFail();

    store.dispatch({
      type: actions.forgotPassword.fulfilled.type,
    });

    await store.dispatch(actions.resetPassword(resetPasswordData));

    expect(fetch).toBeCalledTimes(1);
    expect(store.getState()).toEqual({
      ...initialState,
      passwordResetRequired: true,
      resetPassword: {
        request: false,
        error,
      },
    });
  });
});
