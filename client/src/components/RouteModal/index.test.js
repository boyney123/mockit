import React from 'react';
import ReactDOM from 'react-dom';
import {
  render,
  act,
  fireEvent,
  getByLabelText,
  cleanup,
  getByText
} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import RouteModal from './';
import * as utils from '../../utils/routes-api';

let container;
jest.mock('../../utils/routes-api');

afterAll(() => {
  jest.clearAllMocks();
})

beforeEach(() => {
  container = document.createElement('div');
  document.body.appendChild(container);

  utils.createNewRoute.mockResolvedValue({});
  utils.updateRoute.mockResolvedValue({});
});

afterEach(() => {
  document.body.removeChild(container);
  container = null;
  cleanup();
});

const buildRoute = () => {
  return {
    id: '1',
    route: '/newRoute',
    delay: '0',
    disabled: false,
    payload: { test: true },
    statusCode: '200',
    headers: [
      { id: 1, header: 'Content-Type', value: 'application/json' },
      { id: 2, header: 'x-api-key', value: 'test' }
    ]
  };
};


describe('Route Modal', () => {
  describe('renders', () => {
    it('with a header of `Add route` when the given route has no id', () => {
      const route = buildRoute();
      delete route['id'];
      const { getByText } = render(<RouteModal route={route} />);
      expect(getByText('Add Route')).toBeVisible();
    });

    it('with a header of `Edit route` when the given route has an id', () => {
      const route = buildRoute();
      const { getByText } = render(<RouteModal route={route} />);
      expect(getByText('Edit Route')).toBeVisible();
    });

    it('with an input for the route value, reads the route value and strips of any `/` values from it', () => {
      const route = buildRoute();
      const { getByLabelText } = render(<RouteModal route={route} />);

      expect(getByLabelText('route-name', { selector: 'input' }).value).toEqual(
        'newRoute'
      );
    });

    it('with a dropdown list of all available http methods', () => {
      const route = buildRoute();
      const { getByLabelText, getByText } = render(
        <RouteModal route={route} />
      );
      const dropdown = getByLabelText('route-http');
      const dropdownOptions = dropdown.children;

      expect(dropdownOptions.length).toEqual(5);

      expect(getByText('GET', dropdownOptions)).toBeVisible();
      expect(getByText('POST', dropdownOptions)).toBeVisible();
      expect(getByText('PUT', dropdownOptions)).toBeVisible();
      expect(getByText('DELETE', dropdownOptions)).toBeVisible();
      expect(getByText('PATCH', dropdownOptions)).toBeVisible();
    });

    it('with a dropdown list with three groups', () => {
      const route = buildRoute();
      const { getByLabelText } = render(<RouteModal route={route} />);
      const dropdown = getByLabelText('route-statuscode');
      const dropdownOptionGroups = dropdown.childNodes;

      expect(dropdownOptionGroups.length).toEqual(3);
      expect(getByLabelText('2xx', dropdownOptionGroups)).toBeVisible();
      expect(getByLabelText('4xx', dropdownOptionGroups)).toBeVisible();
      expect(getByLabelText('5xx', dropdownOptionGroups)).toBeVisible();
    });

    it('with a dropdown list of all available status code', () => {
      const route = buildRoute();
      const { getByLabelText } = render(
        <RouteModal route={route} />
      );
      const dropdown = getByLabelText('route-statuscode');

      expect(getByText(dropdown, '200')).toBeVisible();
      expect(getByText(dropdown, '201')).toBeVisible();
      expect(getByText(dropdown, '202')).toBeVisible();
      expect(getByText(dropdown, '204')).toBeVisible();
      expect(getByText(dropdown, '400')).toBeVisible();
      expect(getByText(dropdown, '401')).toBeVisible();
      expect(getByText(dropdown, '403')).toBeVisible();
      expect(getByText(dropdown, '404')).toBeVisible();
      expect(getByText(dropdown, '409')).toBeVisible();
      expect(getByText(dropdown, '422')).toBeVisible();
      expect(getByText(dropdown, '500')).toBeVisible();
      expect(getByText(dropdown, '503')).toBeVisible();
      expect(getByText(dropdown, '504')).toBeVisible();
    });

    it('with a dropdown list of all available delay values', async () => {
      const route = buildRoute();
      await act(async () => {
        ReactDOM.render(
            <RouteModal route={route} />,
            container
        );
      });

      const dropdown = getByLabelText(container, 'route-delay');
      const dropdownOptions = dropdown.children;

      expect(dropdownOptions.length).toEqual(7);

      expect(getByText(dropdown, '0')).toBeVisible();
      expect(getByText(dropdown, '250')).toBeVisible();
      expect(getByText(dropdown, '500')).toBeVisible();
      expect(getByText(dropdown, '1000')).toBeVisible();
      expect(getByText(dropdown, '1500')).toBeVisible();
      expect(getByText(dropdown, '2000')).toBeVisible();
      expect(getByText(dropdown, '5000')).toBeVisible();
    });

    it('with a link that randomly generates data', () => {
      const route = buildRoute();
      const { getByLabelText } = render(<RouteModal route={route} />);
      expect(getByLabelText('route-randomly-generate-data')).toBeVisible();
    });

    it('with a list of headers when the route has headers', () => {
      const route = buildRoute();
      const { getAllByLabelText } = render(<RouteModal route={route} />);
      const headers = getAllByLabelText('header');
      expect(headers).toHaveLength(2);
    });

    it('a message saying "No headers added" when no headers are in the route', () => {
      const route = buildRoute();
      delete route['headers'];
      const { getByLabelText } = render(<RouteModal route={route} />);
      expect(getByLabelText('no-headers-message')).toBeVisible();
    });

    it('with a checkbox to disable the route', () => {
      const route = buildRoute();
      const { getByLabelText } = render(<RouteModal route={route} />);
      expect(getByLabelText('route-disable')).toBeVisible();
    });

    it('with a `Save Changes` button and `Cancel` button', () => {
      const route = buildRoute();
      const { getByLabelText } = render(<RouteModal route={route} />);
      expect(getByLabelText('route-save')).toBeVisible();
      expect(getByLabelText('route-cancel')).toBeVisible();
    });
  });

  describe('headers', () => {
    it('when clicking `Add Header` two new inputs are shown', () => {
      const route = buildRoute();
      delete route['headers'];
      const { getByLabelText } = render(<RouteModal route={route} />);
      fireEvent.click(getByLabelText('add-header'));

      expect(getByLabelText('header')).toBeVisible();
      expect(getByLabelText('header-key').value).toBe('');
      expect(getByLabelText('header-value').value).toBe('');
    });

    it('when clicking the remove button on the header the header is removed', () => {
      const route = buildRoute();
      delete route['headers'];
      route['headers'] = [{ id: '1', header: 'x-api-key', value: 'test' }];

      const { getByLabelText, queryByLabelText } = render(
        <RouteModal route={route} />
      );
      fireEvent.click(getByLabelText('remove-header'));

      expect(queryByLabelText('header')).toBeNull();
    });

    it('when clicking `Save Route` with empty headers on the screen they are removed before sending the data', async () => {
      const route = buildRoute();
      route.headers.push({ id: 99, header: '', value: '' });

      const { getByLabelText } = render(<RouteModal route={route} />);
      fireEvent.click(getByLabelText('route-save'));

      const expectedResult = Object.assign({}, route);
      expectedResult.headers.pop();

      expect(utils.updateRoute).toHaveBeenCalledWith(expectedResult);
    });
  });

  describe('modal', () => {
    it('when entering a value into the route input field the value is updated', () => {
      const { getByLabelText } = render(<RouteModal route={buildRoute()} />);
      expect(getByLabelText('route-name').value).toEqual('newRoute');
      fireEvent.change(getByLabelText('route-name'), {
        target: { value: 'testRoute' }
      });
      expect(getByLabelText('route-name').value).toEqual('testRoute');
    });

    it('when selecting a value from the dropdown list of HTTP methods the dropdown value is updated', () => {
      const { getByLabelText } = render(<RouteModal route={buildRoute()} />);
      expect(getByLabelText('route-http').value).toEqual('GET');
      fireEvent.change(getByLabelText('route-http'), {
        target: { value: 'POST' }
      });
      expect(getByLabelText('route-http').value).toEqual('POST');
    });

    it('when selecting a value from the dropdown list of Status codes methods the dropdown value is updated', () => {
      const { getByLabelText } = render(<RouteModal route={buildRoute()} />);
      expect(getByLabelText('route-statuscode').value).toEqual('200');
      fireEvent.change(getByLabelText('route-statuscode'), {
        target: { value: '500' }
      });
      expect(getByLabelText('route-statuscode').value).toEqual('500');
    });

    it('when selecting a value from the delay list the dropdown value is updated', () => {
      const { getByLabelText } = render(<RouteModal route={buildRoute()} />);
      expect(getByLabelText('route-delay').value).toEqual('0');
      fireEvent.change(getByLabelText('route-delay'), {
        target: { value: '500' }
      });
      expect(getByLabelText('route-delay').value).toEqual('500');
    });

    it('when disabling the route the checkbox value is updated', () => {
      const { getByLabelText } = render(<RouteModal route={buildRoute()} />);
      expect(getByLabelText('route-disable').checked).toEqual(false);
      fireEvent.change(getByLabelText('route-disable'), {
        target: { checked: true }
      });
      expect(getByLabelText('route-disable').checked).toEqual(true);
    });

    it('when the save button is clicked and the route is a new route a request to create a new route is made', () => {
      const route = buildRoute();
      delete route['id'];
      const { getByLabelText } = render(<RouteModal route={route} key='createNewRoute' />);
      fireEvent.click(getByLabelText('route-save'));
      expect(utils.createNewRoute).toHaveBeenCalledWith(route);
    });

    it('when the save button is clicked and the route is an existing route a request to edit the route', () => {
      const route = buildRoute();
      const { getByLabelText } = render(<RouteModal route={route} />);
      fireEvent.click(getByLabelText('route-save'));
      expect(utils.updateRoute).toHaveBeenCalledWith(route);
    });
  });

  describe('props', () => {
    describe('onClose', () => {
      it('is called when closing the modal dialog using the close button', () => {
        const spy = jest.fn();
        const { getByLabelText } = render(
          <RouteModal route={buildRoute()} onClose={spy} />
        );
        fireEvent.click(getByLabelText('close'));
        expect(spy).toHaveBeenCalled();
      });
      it('is called when clicking the cancel button', () => {
        const spy = jest.fn();
        const { getByLabelText } = render(
          <RouteModal route={buildRoute()} onClose={spy} />
        );
        fireEvent.click(getByLabelText('route-cancel'));
        expect(spy).toHaveBeenCalled();
      });
    });
  });
});
