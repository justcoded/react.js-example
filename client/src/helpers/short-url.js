import axios from 'axios';

import {
  API_URL
} from '../constants/google-shortener';

const CACHE_KEY = 'shortUrlsCache';

const request = (url) => {
  const options = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  return axios.post(API_URL, JSON.stringify({longUrl: url}), options)
    .then((response) => {
      return response.data.id
    });
};

const getCache = () => {
  const rawCache = localStorage.getItem(CACHE_KEY);

  return rawCache ? JSON.parse(rawCache) : {};
};

const loadFromCache = (url) => {
  return getCache()[url];
};

const setCache = (key, value) => {
  localStorage.setItem(CACHE_KEY, JSON.stringify({...getCache(), [key]: value}));
};

export default (url) => {
  return new Promise((resolve) => {
    const cacheValue = loadFromCache(url);

    if (cacheValue) {
      return resolve(cacheValue);
    }

    request(url).then((shortUrl) => {
      setCache(url, shortUrl);
      resolve(shortUrl);
    });
  });
};