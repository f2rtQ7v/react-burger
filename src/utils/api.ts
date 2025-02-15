const baseApiUrl = 'https://norma.nomoreparties.space/api';

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


const checkResponse = (res: Response) => res.ok
  ? res.json()
  : res.json().then(err => {
      return Promise.reject(errors[err.message.toLowerCase()] ?? err);
    });

function request(route: string, { body, ...options }: IRequestOptions = {}) {
  if (body && typeof body !== 'string') {
    (options.headers ??= {})['Content-Type'] = 'application/json';
    (options as IRequestOptions).body = JSON.stringify(body);
  }

  return fetch(baseApiUrl + route, options)
    .then(checkResponse)
    .then(r => r.success ? r : Promise.reject(r.message));
}

const token = {
  update(response: ITokenData) {
    localStorage.setItem('refreshToken', response.refreshToken); 
    localStorage.setItem('accessToken', response.accessToken);
  },
  delete() {
    localStorage.removeItem('refreshToken'); 
    localStorage.removeItem('accessToken');
  },
  refresh() {
    return request('/auth/token', {
      method: 'POST',
      body: {
        token: localStorage.getItem('refreshToken') ?? '',
      },
    }).then(response => {
      if (!response.success) {
        return Promise.reject(response);
      }

      token.update(response);
      return response;
    });
  },
};

const requestWithRefresh = async (route: string, options: IRequestOptions = {}) => {
  try {
    return await request(route, options);
  } catch (err) {
    const message = err instanceof Error ? err.message : `${err}`;
    if (message === 'jwt expired') {
      const { accessToken } = await token.refresh();
      (options.headers ??= {}).Authorization = accessToken;
      return await request(route, options);
    } else {
      return Promise.reject(err);
    }
  }
};


export const getIngredientsRequest = () =>
  request('/ingredients');

export const createOrderRequest = (ingredients: TOrderIngredients) =>
  requestWithRefresh('/orders', {
    method: 'POST',
    body: { ingredients },
  });

export const auth = {
  createUser(body: TUserData) {
    return request('/auth/register', {
      method: 'POST',
      body,
    }).then((r: TUserWithToken) => {
      token.update(r);
      return r;
    });
  },
  async getUser() {
    if (localStorage.getItem('accessToken')) {
      try {
        await token.refresh();
      } catch (err) {}
    }

    const accessToken = localStorage.getItem('accessToken');
    return accessToken
      ? request('/auth/user', {
          headers: {
            Authorization: accessToken,
          },
        }).catch(err => {
          token.delete();
          Promise.reject(err);
        })
      : { user: null };
  },
  updateUser(body: TUserData) {
    return requestWithRefresh('/auth/user', {
      method: 'PATCH',
      headers: {
        Authorization: localStorage.getItem('accessToken') ?? '',
      },
      body,
    });
  },
  deleteUser() {
    return requestWithRefresh('/auth/user', {
      method: 'DELETE',
      headers: {
        Authorization: localStorage.getItem('accessToken') ?? '',
      },
    }).then(r => {
      token.delete();
      return r;
    });
  },
  login(body: TUserData) {
    return request('/auth/login', {
      method: 'POST',
      body,
    }).then((r: TUserWithToken) => {
      token.update(r);
      return r;
    });
  },
  logout() {
    return request('/auth/logout', {
      method: 'POST',
      body: {
        token: localStorage.getItem('refreshToken') ?? '',
      },
    }).then(r => {
      token.delete();
      return r;
    });
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
