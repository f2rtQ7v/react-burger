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

const request = (route, options = {}) =>
  fetch(baseApiUrl + route, options)
    .then(checkResponse)
    .then(r => {
      return r.success ? r : Promise.reject(r.message);
    });

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
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ ingredients }),
  });



export const refreshToken = () => {
  return request('/auth/token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      token: localStorage.getItem('refreshToken'),
    }),
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
  createUser(data) {
    return request('/auth/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
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
  updateUser(data) {
    return fetchWithRefresh('/auth/user', {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: localStorage.getItem('accessToken'),
      },
      body: JSON.stringify(data),
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
  login(data) {
    return request('/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    }).then(updateTokens);
  },
  logout() {
    return request('/auth/logout', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ token: localStorage.getItem('refreshToken') }),
    }).then(deleteTokens);
  },
  forgotPassword(data) {
    return request('/password-reset', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
  },
  resetPassword(data) {
    return request('/password-reset/reset', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
  },
};
