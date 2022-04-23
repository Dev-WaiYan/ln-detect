const store = {
  setItem: (key, item) => {
    localStorage.setItem(key, item);
  },
  getItem: (key) => localStorage.getItem(key),
  removeItem: (key) => localStorage.removeItem(key),
};

export default store;
