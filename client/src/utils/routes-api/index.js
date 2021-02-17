import url from 'url';
import { HttpMethods, StatusCodes } from '../consts';

const host = process.env.REACT_APP_MOCKIT_API_URL || 'localhost';

export const buildRoute = () => ({
  route: '/newRoute',
  httpMethod: HttpMethods.GET,
  statusCode: StatusCodes.OK,
  delay: '0',
  payload: { test: true }
});

export const createNewRoute = (route) => {
  return fetch(url.resolve(host, '/route'), {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(route)
  });
};

export const getRoutes = () => {
  return fetch(url.resolve(host, '/routes'), {
    method: 'GET'
  }).then(function (response) {
    return response.json();
  });
};

export const updateRoute = (data) => {
  return fetch(url.resolve(host, '/route'), {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  });
};

export const deleteRoute = (data) => {
  return fetch(url.resolve(host, '/route'), {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  });
};

export const updateSettings = (settings) => {
  return fetch(url.resolve(host, '/settings'), {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(settings)
  });
};
