// __tests__/fetch.test.js
import React from 'react';
import { render, fireEvent, cleanup } from 'react-testing-library';
import 'jest-dom/extend-expect';
import Route from './';
import RouteItem from './RouteItem';

afterEach(cleanup);

const buildRoute = () => ({
  id: '1',
  route: '/test',
  delay: '500',
  statusCode: '200',
  httpMethod: 'GET'
});

describe('Route', () => {
  describe('renders', () => {
    it('renders the route, delay, statuscode, http method rendered', () => {
      const { getByLabelText, getAllByLabelText, getByText } = render(
        <Route routeItem={buildRoute()} />
      );
      const routes = getAllByLabelText('Route');
      const route = routes[0];

      expect(getByLabelText('route-route')).toBeVisible();
      expect(getByText('/test', route)).toBeVisible();
      expect(getByText('500 ms', route)).toBeVisible();
      expect(getByText('200', route)).toBeVisible();
      expect(getByText('GET', route)).toBeVisible();
    });

    it('the route renders with an edit and delete button', () => {
      const { getByLabelText } = render(<Route routeItem={buildRoute()} />);
      expect(getByLabelText('Edit Route')).toBeVisible();
      expect(getByLabelText('Delete Route')).toBeVisible();
    });
  });

  describe('props and actions', () => {
    describe('onRouteEdit', () => {
      it('is called when the edit route button is clicked', () => {
        const spy = jest.fn();
        const { getByLabelText } = render(
          <Route routeItem={buildRoute()} onRouteEdit={spy} />
        );
        fireEvent.click(getByLabelText('Edit Route'));
        expect(spy).toHaveBeenCalled();
      });
    });
    describe('onRouteDelete', () => {
      it('is called when the delete route button is clicked', () => {
        const spy = jest.fn();
        const { getByLabelText } = render(
          <Route routeItem={buildRoute()} onRouteDelete={spy} />
        );
        fireEvent.click(getByLabelText('Delete Route'));
        expect(spy).toHaveBeenCalled();
      });
    });

    it.only('when clicking on the route the user is navigated to that route in the browser', () => {
      const globalOpen = global.open;
      global.open = jest.fn();
      const { getByLabelText } = render(<Route routeItem={buildRoute()} />);
      fireEvent.click(getByLabelText('Route'));
      expect(global.open).toBeCalledWith('localhost:/test', '_blank');
      global.open = globalOpen;
    });
  });

  describe('RouteItem', () => {
    it('renders the given title and value', () => {
      const { getByLabelText } = render(
        <RouteItem title="TestTitle" value="TestValue" />
      );
      expect(getByLabelText('route-testtitle-title')).toHaveTextContent(
        'TestTitle'
      );
      expect(getByLabelText('route-testtitle-value')).toHaveTextContent(
        'TestValue'
      );
    });
  });
});
