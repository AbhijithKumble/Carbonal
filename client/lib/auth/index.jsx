import { create } from 'zustand';
import { createSelectors, getToken, removeToken, setToken } from '../../utils/util';

const _useAuth = create((set, get) => ({
  status: 'idle',
  token: null,
  signIn: (token) => {
    setToken(token);
    set({ status: 'signIn', token });
  },
  signOut: () => {
    removeToken();
    set({ status: 'signOut', token: null });
  },
  hydrate: () => {
    try {
      const userToken = getToken();
      if (userToken !== null) {
        get().signIn(userToken);
      } else {
        get().signOut();
      }
    } catch (_e) {
      console.error("Error hydrating auth state:", _e);
    }
  },
}));

export const useAuth = createSelectors(_useAuth);
export const signOut = () => _useAuth.getState().signOut();
export const signIn = (token) => _useAuth.getState().signIn(token);
export const hydrateAuth = () => _useAuth.getState().hydrate();

