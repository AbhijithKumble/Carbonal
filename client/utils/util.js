const createSelectors = (fn) => {
  return {
    useAuth: () => use(fn.auth),
    useToken: () => use(fn.token),
  };
};

export const useAuth = createSelectors((state) => state.auth);

