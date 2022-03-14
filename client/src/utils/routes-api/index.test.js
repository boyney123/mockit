import {
  createNewRoute,
  updateRoute,
  deleteRoute,
  buildRoute as buildRouteUtil,
  updateSettings
} from './index';

const mockFetchPromise = Promise.resolve({
  json: () => Promise.resolve({})
});

jest.spyOn(window, 'fetch').mockImplementation(() => mockFetchPromise); // 4

const buildRoute = () => ({
  route: '/test',
  httpMethod: 'GET',
  delay: '2000',
  payload: { test: true },
  statusCode: '200'
});

describe('routes-api', () => {
  beforeEach(() => {
    window.fetch.mockClear();
  });

  describe('buildRoute', () => {
    it('returns a new route object', () => {
      const route = buildRouteUtil();
      expect(route).toEqual({
        route: '/newRoute',
        httpMethod: 'GET',
        statusCode: '200',
        delay: '0',
        payload: { test: true }
      });
    });
  });

  describe('createNewRoute', () => {
    it('makes a POST request with the given route to the /route end point', async () => {
      const route = buildRoute();

      await createNewRoute(route);

      expect(window.fetch).toHaveBeenCalled();
      expect(window.fetch.mock.calls[0][1]).toEqual({
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(route)
      });
    });
  });

  describe('updateRoute', () => {
    it('makes a POST request with the given route to the /route end point', async () => {
      const route = buildRoute();

      await updateRoute(route);

      expect(window.fetch).toHaveBeenCalled();
      expect(window.fetch.mock.calls[0][1]).toEqual({
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(route)
      });
    });
  });

  describe('deleteRoute', () => {
    it('makes a DELETE request with the given route to the /route end point', async () => {
      const route = buildRoute();

      await deleteRoute(route);

      expect(window.fetch).toHaveBeenCalled();
      expect(window.fetch.mock.calls[0][1]).toEqual({
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(route)
      });
    });
  });

  describe('updateSettings', () => {
    it('makes a POST request with the given route to the /settings end point', async () => {
      const route = buildRoute();

      await updateSettings(route);

      expect(window.fetch).toHaveBeenCalled();
      expect(window.fetch.mock.calls[0][1]).toEqual({
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(route)
      });
    });
  });
});
