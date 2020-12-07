const request = require('supertest');
const fs = require('fs-extra');
const path = require('path');

const exampleConfig = {
  settings: {
    features: {
      chaosMonkey: false,
      cors: true,
      authentication: false
    },
    authentication: {
      username: 'test',
      password: 'test'
    }
  },
  routes: [
    {
      id: 'b0e91a33-787c-4d54-8c58-10ac970e2865',
      route: '/getExample',
      httpMethod: 'GET',
      statusCode: '200',
      delay: '0',
      payload: {
        test: true
      },
      disabled: false
    },
    {
      id: 'b0e91a33-787c-4d54-8c58-10ac970e2861',
      route: '/postExample',
      httpMethod: 'POST',
      statusCode: '200',
      delay: '0',
      payload: {
        test: true
      },
      disabled: false
    },
    {
      id: 'b0e91a33-787c-4d54-8c58-10ac970e2862',
      route: '/putExample',
      httpMethod: 'PUT',
      statusCode: '200',
      delay: '0',
      payload: {
        test: true
      },
      disabled: false
    },
    {
      id: 'b0e91a33-787c-4d54-8c58-10ac970e2863',
      route: '/deleteExample',
      httpMethod: 'DELETE',
      statusCode: '200',
      delay: '0',
      payload: {
        test: true
      },
      disabled: false
    },
    {
      id: 'b0e91a33-787c-4d54-8c58-10ac970e2865',
      route: '/test1',
      httpMethod: 'GET',
      statusCode: '200',
      delay: '0',
      payload: {
        test: true
      },
      disabled: false
    },
    {
      id: 'bd8893f7-68d5-4090-8ae2-20529191cd88',
      route: '/test2',
      httpMethod: 'POST',
      statusCode: '200',
      delay: '0',
      payload: {
        test: true
      },
      disabled: false
    },
    {
      route: '/disabledExample',
      httpMethod: 'GET',
      statusCode: '200',
      delay: '0',
      payload: {
        test: true
      },
      disabled: true
    },
    {
      route: '/delayExample',
      httpMethod: 'GET',
      statusCode: '200',
      delay: '2000',
      payload: {
        test: true
      },
      disabled: false
    },
    {
      route: '/500Example',
      httpMethod: 'GET',
      statusCode: '500',
      delay: '0',
      payload: {
        test: true
      },
      disabled: false
    },
    {
      route: '/headersExample',
      httpMethod: 'GET',
      statusCode: '200',
      delay: '0',
      headers: [
        {
          header: 'Content-Type',
          value: 'application/json'
        }
      ],
      disabled: false
    },
    {
      route: '/testParameter?id=1',
      httpMethod: 'GET',
      statusCode: '200',
      delay: '0',
      payload: {
        test: true
      },
      disabled: false
    },
  ]
};

const fsExtra = jest.mock(
  'fs-extra',
  jest.fn(() => {
    return {
      readJsonSync: jest.fn(() => exampleConfig)
    };
  })
);

const app = require('./');

describe('Mockit Routes', () => {
  describe('dynamic routes', () => {
    describe('http methods', () => {
      it('when a route is configured with `GET` set as the httpMethod then that route can only be accessed through GET', async () => {
        await request(app).get('/getExample').expect(200, { test: true });
      });
      it('when a route is configured with `POST` set as the httpMethod then that route can only be accessed through POST', async () => {
        await request(app).post('/postExample').expect(200, { test: true });
      });
      it('when a route is configured with `PUT` set as the httpMethod then that route can only be accessed through PUT', async () => {
        await request(app).put('/putExample').expect(200, { test: true });
      });
      it('when a route is configured with `DELETE` set as the httpMethod then that route can only be accessed through DELETE', async () => {
        await request(app).del('/deleteExample').expect(200, { test: true });
      });
      it('when a route is contain query parameter case match', async () => {
        await request(app).get('/testParameter?id=1').expect(200, { test: true });
      });
      it('when a route is contain query parameter case not match', async () => {
        await request(app).get('/testParameter?ids=1').expect(404, {});
        await request(app).get('/testParameter?id=1&test=1').expect(404, {});
      });
    });

    describe('headers', () => {
      it('when a route is configured with headers the headers are sent back in the response', async () => {
        await request(app)
          .get('/headersExample')
          .expect('Content-Type', 'application/json; charset=utf-8');
      });
    });

    describe('disabled routes', () => {
      it('when a route is marked as disabled in the configuration file, the route cannot be accessed and returns a 404', async () => {
        await request(app).get('/disabledExample').expect(404);
      });
    });

    describe('delayed routes', () => {
      it('when a route has a delay configured on it, the response will come back after the delay has fulfilled', async () => {
        await request(app).get('/delayExample').expect(200, { test: true });
      });
    });

    describe('status codes', () => {
      it('when a route has a status code configured on it, that status code is returned', async () => {
        await request(app).get('/500Example').expect(500);
      });
    });
  });
});
