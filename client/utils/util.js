const createSelectors = (fn) => {
  return {
    useAuth: () => use(fn.auth),
    useToken: () => use(fn.token),
  };
};

export const useAuth = createSelectors((state) => state.auth);

export function setToken(token) {
  localStorage.setItem('authToken', JSON.stringify(token));
}

export function getToken() {
  const token = localStorage.getItem('authToken');
  return token ? JSON.parse(token) : null;
}

export function removeToken() {
  localStorage.removeItem('authToken');
}

