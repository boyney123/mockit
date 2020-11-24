const request = require('supertest');
const fs = require('fs-extra');
const path = require('path');

const buildExampleConfig = () => {
  return {
    settings: {
      features: {
        chaosMonkey: false,
        cors: true,
        authentication: true
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
        id: 'b0e91a33-787c-4d54-8c58-10ac970e2865',
        route: '/postExample',
        httpMethod: 'POST',
        statusCode: '200',
        delay: '0',
        payload: {
          test: true
        },
        disabled: false
      }
    ]
  };
};

const fsExtra = jest.mock(
  'fs-extra',
  jest.fn(() => {
    return {
      readJsonSync: jest.fn(() => buildExampleConfig())
    };
  })
);

const app = require('../../');

describe('Basic Auth Middleware', () => {
  describe('routes', () => {
    it('returns 401 when no Authentication is sent', async () => {
      await request(app).get('/getExample').expect(401);
    });
    it('returns 401 when Authentication fails', async () => {
      await request(app).get('/getExample').auth('test', 'random').expect(401);
    });
    it('returns the expected response when the correct Authenication header is sent', async () => {
      await request(app).post('/postExample').auth('test', 'test').expect(200);
    });
  });
});
