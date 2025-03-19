export const baseApiUrl = 'https://norma.nomoreparties.space/api';

const errors: {
  [key: string]: string;
} = {
  'email, password and name are required fields': 'Имя, e-mail и пароль являются обязательными полями',
  'user already exists': 'Пользователь с указанным e-mail уже существует',
  'user with such email already exists': 'Пользователь с указанным e-mail уже существует',
  'email or password are incorrect': 'Неправильно введён e-mail или пароль',
  'invalid credentials provided': 'Указаны недействительные учетные данные',
  'incorrect reset token': 'Указан неправильный код восстановления пароля',
  'ingredient ids must be provided': 'Не переданы идентификаторы ингредиентов',
  'token required': 'Токен авторизации не указан или некорректен',
  'invalid signature': 'Некорректный токен авторизации',
};


function request(route: string, { body, ...options }: IRequestOptions = {}) {
  if (body && typeof body !== 'string') {
    (options.headers ??= {})['Content-Type'] = 'application/json';
    (options as IRequestOptions).body = JSON.stringify(body);
  }

  return fetch(baseApiUrl + route, options).then((response: Response) => {
    return response.json().then(result => {
      return response.ok && result.success
        ? result
        : Promise.reject(new Error(errors[result.message.toLowerCase()] ?? result.message));
    });
  });
}

function requestWithRefresh(route: string) {
  return request(route, {
    method: 'POST',
    body: {
      token: localStorage.getItem('refreshToken') ?? '',
    },
  });
}

async function requestWithAccess(route: string, options: IRequestOptions = {}) {
  token.addAccess(options);
  try {
    return await request(route, options);
  } catch (err) {
    const message = err instanceof Error ? err.message : `${err}`;
    if (message === 'jwt expired') {
      await refreshToken();
      token.addAccess(options);
      return await request(route, options);
    } else {
      return Promise.reject(err);
    }
  }
}


const token = {
  addAccess(options: IRequestOptions) {
    (options.headers ??= {}).Authorization = localStorage.getItem('accessToken') ?? '';
  },
  update(response: ITokenData & TWithUser) {
    localStorage.setItem('refreshToken', response.refreshToken);
    localStorage.setItem('accessToken', response.accessToken);
    return response;
  },
  // eslint-disable-next-line
  delete(response: any) {
    localStorage.removeItem('refreshToken'); 
    localStorage.removeItem('accessToken');
    return response instanceof Error ? Promise.reject(response) : response;
  },
};


export const refreshToken = () =>
  requestWithRefresh('/auth/token').then(token.update);

export const getIngredientsRequest = () =>
  request('/ingredients');

export const createOrderRequest = (ingredients: TOrderIngredients) =>
  requestWithAccess('/orders', {
    method: 'POST',
    body: { ingredients },
  });

export const getOrderRequest = (orderNumber: number) =>
  requestWithAccess(`/orders/${orderNumber}`, {
    method: 'GET',
  });

export const auth = {
  createUser(body: TUserData) {
    return request('/auth/register', {
      method: 'POST',
      body,
    }).then(token.update);
  },
  async getUser() {
    return localStorage.getItem('accessToken')
      ? requestWithAccess('/auth/user').catch(token.delete)
      : { user: null };
  },
  updateUser(body: TUserData) {
    return requestWithAccess('/auth/user', {
      method: 'PATCH',
      body,
    });
  },
  deleteUser() {
    return requestWithAccess('/auth/user', {
      method: 'DELETE',
    }).then(token.delete);
  },
  login(body: TUserData) {
    return request('/auth/login', {
      method: 'POST',
      body,
    }).then(token.update);
  },
  logout() {
    return requestWithRefresh('/auth/logout').then(token.delete);
  },
  forgotPassword(body: TUserData) {
    return request('/password-reset', {
      method: 'POST',
      body,
    });
  },
  resetPassword(body: TUserData) {
    return request('/password-reset/reset', {
      method: 'POST',
      body,
    });
  },
};
