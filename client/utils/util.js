// utils/util.js

/**
 * Create selectors for Zustand store
 * @param {Function} store - Zustand store
 * @returns {Object} - Object with selectors
 */
export const createSelectors = (store) => {
  const selectors = {};
  for (const key of Object.keys(store.getState())) {
    selectors[key] = () => store((state) => state[key]);
  }
  return selectors;
};

/**
 * Retrieve the token from localStorage
 * @returns {string | null} - Token or null if not found
 */
export const getToken = () => {
  try {
    return localStorage.getItem('auth_token');
  } catch (error) {
    console.error("Error getting token from localStorage:", error);
    return null;
  }
};

/**
 * Save the token to localStorage
 * @param {string} token - Token to be stored
 */
export const setToken = (token) => {
  try {
    localStorage.setItem('auth_token', token);
  } catch (error) {
    console.error("Error saving token to localStorage:", error);
  }
};

/**
 * Remove the token from localStorage
 */
export const removeToken = () => {
  try {
    localStorage.removeItem('auth_token');
  } catch (error) {
    console.error("Error removing token from localStorage:", error);
  }
};

