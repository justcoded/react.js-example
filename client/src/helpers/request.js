import axios from 'axios';

const authFailListeners = [];

axios.interceptors.response.use(null, function(err) {
  const response = err.response;

  if (response.status === 401) {
    authFailListeners.forEach((cb) => cb(response.data));
  }

  return Promise.reject(err);
});

export const addOnAuthFailListener = (cb) => {
  authFailListeners.push(cb);
};

export default axios;