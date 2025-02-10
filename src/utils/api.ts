const baseApiUrl = 'https://norma.nomoreparties.space/api';

const errors = {
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

const checkResponse = res => res.ok
  ? res.json()
  : res.json().then(err => {
      return Promise.reject(errors[err.message.toLowerCase()] ?? err);
    });

function request(route, options = {}) {
  if (options.body) {
    (options.headers ??= {})['Content-Type'] = 'application/json';
    options.body = JSON.stringify(options.body);
  }

  return fetch(baseApiUrl + route, options)
    .then(checkResponse)
    .then(r => r.success ? r : Promise.reject(r.message));
}

const updateTokens = response => {
  localStorage.setItem('refreshToken', response.refreshToken); 
  localStorage.setItem('accessToken', response.accessToken);
  return response;
};

const deleteTokens = response => {
  localStorage.removeItem('refreshToken'); 
  localStorage.removeItem('accessToken');
  return response;
};


export const getIngredientsRequest = () =>
  request('/ingredients');

export const createOrderRequest = ingredients =>
  fetchWithRefresh('/orders', {
    method: 'POST',
    body: { ingredients },
  });



export const refreshToken = () => {
  return request('/auth/token', {
    method: 'POST',
    body: {
      token: localStorage.getItem('refreshToken'),
    },
  }).then(response => {
    return response.success
      ? updateTokens(response)
      : Promise.reject(response);
  });
};

export const fetchWithRefresh = async (url, options) => {
  try {
    return await request(url, options);
  } catch (err) {
    if (err.message === 'jwt expired') {
      const refreshData = await refreshToken();
      options.headers.Authorization = refreshData.accessToken;
      return await request(url, options);
    } else {
      return Promise.reject(err);
    }
  }
};


export const auth = {
  createUser(body) {
    return request('/auth/register', {
      method: 'POST',
      body,
    }).then(updateTokens);
  },
  async getUser() {
    if (localStorage.getItem('accessToken')) {
      try {
        await refreshToken();
      } catch (err) {}
    }

    const token = localStorage.getItem('accessToken');
    return token
      ? request('/auth/user', {
          method: 'GET',
          headers: {
            Authorization: token,
          },
        }).catch(err => Promise.reject(deleteTokens(err)))
      : { user: null };
  },
  updateUser(body) {
    return fetchWithRefresh('/auth/user', {
      method: 'PATCH',
      headers: {
        Authorization: localStorage.getItem('accessToken'),
      },
      body,
    });
  },
  deleteUser() {
    return fetchWithRefresh('/auth/user', {
      method: 'DELETE',
      headers: {
        Authorization: localStorage.getItem('accessToken'),
      },
    }).then(deleteTokens);
  },
  login(body) {
    return request('/auth/login', {
      method: 'POST',
      body,
    }).then(updateTokens);
  },
  logout() {
    return request('/auth/logout', {
      method: 'POST',
      body: {
        token: localStorage.getItem('refreshToken'),
      },
    }).then(deleteTokens);
  },
  forgotPassword(body) {
    return request('/password-reset', {
      method: 'POST',
      body,
    });
  },
  resetPassword(body) {
    return request('/password-reset/reset', {
      method: 'POST',
      body,
    });
  },
};
