const API_PREFIX = '';

export const setAuthToken = (token) => {
  if (token) {
    localStorage.setItem('access_token', token);
    return;
  }

  localStorage.removeItem('access_token');
};

export const clearAuthToken = () => {
  localStorage.removeItem('access_token');
};

const getHeaders = () => {
  const token = localStorage.getItem('access_token');
  const headers = {
    'Content-Type': 'application/json',
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  return headers;
};

const request = async (path, options = {}) => {
  const response = await fetch(`${API_PREFIX}${path}`, {
    ...options,
    headers: {
      ...getHeaders(),
      ...(options.headers || {}),
    },
  });

  let payload = null;
  try {
    payload = await response.json();
  } catch {
    payload = null;
  }

  if (!response.ok) {
    const message = payload?.mensaje || payload?.error || 'Error de comunicacion con el servidor.';
    throw new Error(message);
  }

  return payload;
};

export const loginUser = async (username, password) => {
  const response = await fetch(`${API_PREFIX}/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ username, password }),
  });

  let payload = null;
  try {
    payload = await response.json();
  } catch {
    payload = null;
  }

  if (!response.ok) {
    throw new Error(payload?.error || payload?.mensaje || 'Credenciales incorrectas.');
  }

  if (!payload?.access_token) {
    throw new Error('No se recibió el token de acceso.');
  }

  return payload.access_token;
};

export const fetchItems = (endpoint) => request(endpoint);

export const createItem = (endpoint, body) =>
  request(endpoint, {
    method: 'POST',
    body: JSON.stringify(body),
  });

export const updateItem = (endpoint, id, body) =>
  request(`${endpoint}/${id}`, {
    method: 'PUT',
    body: JSON.stringify(body),
  });

export const deleteItem = (endpoint, id) =>
  request(`${endpoint}/${id}`, {
    method: 'DELETE',
  });

export const returnLoan = (id) =>
  request(`/prestamos/${id}/devolver`, {
    method: 'PUT',
    body: JSON.stringify({}),
  });
