import '@testing-library/jest-dom'
// NOTE: jest-dom adds handy assertions to Jest and is recommended, but not required

import * as React from 'react'
import ReactDOM from 'react-dom';
import {
  fireEvent,
  cleanup,
  waitFor,
  queryAllByLabelText,
  queryByLabelText,
  queryByTestId,
  act,
  getAllByLabelText,
  getByLabelText,
  getByTestId,
  getByText
} from '@testing-library/react'

import * as utils from './utils/routes-api';
import * as routesObject from './config/routes.json';
import App from './App';

let container;
jest.mock('./utils/routes-api');

afterAll(() => {
  jest.clearAllMocks();
})

beforeEach(() => {
  container = document.createElement('div');
  document.body.appendChild(container);
  utils.getRoutes.mockResolvedValue(require('./config/routes.json'));
  utils.buildRoute.mockResolvedValue({ route: '/test' });
  utils.deleteRoute.mockResolvedValue({});
});

afterEach(() => {
  document.body.removeChild(container);
  container = null;
  cleanup();
});

describe('App', () => {
  describe('renders', () => {
    it('the add route and settings button', async () => {
      await act(async () => {
        ReactDOM.render(<App />, container);
      });

      expect(getByLabelText(container, 'Add Route')).toBeVisible();
      expect(getByLabelText(container, 'Settings')).toBeVisible();
    });

    it('renders a list of stacked routes based on the routes in the configuration', async () => {
      await act(async () => {
        ReactDOM.render(<App />, container);
      });

      await waitFor(() => expect(queryAllByLabelText(container, 'Route')).toHaveLength(3));
      await waitFor(() => expect(getByLabelText(container, 'routes-stacked')).toBeVisible());
    });

    it('renders a list of routes that are grouped in the grouped feature is set to true',  async () => {
      const customSettings = { features: { groupedRoutes: true } };
      await act(async () => {
        utils.getRoutes.mockResolvedValue({
          settings: customSettings,
          routes: routesObject.routes
        });

        ReactDOM.render(<App />, container);
      });

      await waitFor(() => queryAllByLabelText(container, 'Route').length > 0);

      expect(queryAllByLabelText(container, 'Route')).toHaveLength(3);
      expect(getByLabelText(container, 'routes-grouped')).toBeVisible();
    });

    it('renders the no routes message when no routes have been added yet', async () => {
      await act(async () => {
        utils.getRoutes.mockResolvedValue({
          settings: routesObject.settings,
          routes: []
        });

        ReactDOM.render(<App />, container);
      });

      expect(getByLabelText(container, 'no-routes')).toBeVisible();
    });

    it('renders a footer on the screen with a link to the github repo', async () => {
      await act(async () => {
        ReactDOM.render(<App />, container);
      });

      expect(getByLabelText(container,'Site footer')).toBeVisible();
      expect(getByLabelText(container,'Github Repo')).toBeVisible();
      expect(getByLabelText(container,'Github Repo').text).toBe('David Boyne');
    });
  });

  describe('RouteListGrouped', () => {
    describe('edit route', () => {
      it('when edit is selected on the route the modal dialog is shown with that route', async () => {
        const customSettings = { features: { groupedRoutes: true } };
        await act(async () => {
          utils.getRoutes.mockResolvedValue({
            settings: customSettings,
            routes: routesObject.routes
          });
          ReactDOM.render(<App />, container);
        });

        await waitFor(() => expect(queryAllByLabelText(container, 'Edit Route')).length > 0);
        const routes = queryAllByLabelText(container, 'Route');
        const editButton = getByLabelText(routes[0], 'Edit Route');

        fireEvent(
          editButton,
          new MouseEvent('click', {
            bubbles: true,
            cancelable: true
          })
        );

        await waitFor(() => expect(queryAllByLabelText(container, 'Route')).length > 0);

        expect(getByTestId(container, 'route-modal')).toBeVisible();
      });
    });

    describe('delete route', () => {
      const clickDeleteRoute = async () => {
        const customSettings = { features: { groupedRoutes: true } };
        await act(async () => {
          utils.getRoutes.mockResolvedValue({
            settings: customSettings,
            routes: routesObject.routes
          });
          ReactDOM.render(<App />, container);
        });

        await waitFor(() => expect(queryAllByLabelText(container, 'Delete Route')).length > 0);

        const deleteButton = getAllByLabelText(container, 'Delete Route');
        act(() => {
          fireEvent.click(deleteButton[0]);
        });
      };

      it('when delete is selected on the route the confirmation dialog is shown on that route', async () => {
        await clickDeleteRoute();

        await waitFor(() => expect(queryAllByLabelText(container, 'Confirmation Dialog')).toHaveLength(1));
        expect(getByLabelText(container, 'Confirmation Dialog')).toBeVisible();
      });

      it('when clicking confirm on the route deletion a request is made to delete that route', async () => {
        await clickDeleteRoute();

        await waitFor(() => expect(queryAllByLabelText(container, 'Confirmation Dialog')).toHaveLength(1));


        await act(async () => {
          const modal = getByLabelText(container,'Confirmation Dialog');
          fireEvent.click(getByText(modal, 'Delete'));
        });

        expect(utils.deleteRoute).toHaveBeenCalled();
      });
    });
  });

  describe('RouteListStacked', () => {
    describe('edit route', () => {
      it('when edit is selected on the route the modal dialog is shown with that route', async () => {
        await act(async () => {
          ReactDOM.render(<App />, container);
        });

        const routes = queryAllByLabelText(container, 'Route');

        await waitFor(() => queryAllByLabelText(container, 'Edit Route').length > 0);

        const editButton = getByLabelText(routes[0], 'Edit Route');

        act(() => {
          fireEvent(
              editButton,
              new MouseEvent('click', {
                bubbles: true,
                cancelable: true
              })
          );
        })

        expect(getByTestId(container, 'route-modal')).toBeVisible();
      });
    });

    describe('delete route', () => {
      const clickDeleteRoute = async () => {
        utils.deleteRoute.mockResolvedValue({});
        await act(async () => {
          ReactDOM.render(<App />, container);
        });

        await waitFor(() => {
          expect(queryAllByLabelText(container, "Delete Route")).length > 0;
        });

        act(() => {
          const deleteButtons = queryAllByLabelText(container, 'Delete Route');
          fireEvent.click(deleteButtons[0]);
        });
      };

      it('when delete is selected on the route the confirmation dialog is shown on that route', async () => {
        await clickDeleteRoute();
        await waitFor(() => expect(queryByLabelText(container, 'Confirmation Dialog')).toBeInTheDocument());
        expect(getByLabelText(container, 'Confirmation Dialog')).toBeVisible();
      });

      it('when clicking confirm on the route deletion a request is made to delete that route', async () => {
        await clickDeleteRoute();

        const modal = getByLabelText(container,'Confirmation Dialog');

        await waitFor(async () => {
          fireEvent.click(getByText(modal, 'Delete'));
        });

        expect(utils.deleteRoute).toHaveBeenCalled();
      });
    });
  });

  describe('Features', () => {
    describe('Add route', () => {
      const showSettingsModal = async () => {
        await act(async () => {
          utils.getRoutes.mockResolvedValue(routesObject);
          utils.buildRoute.mockReturnValue({ route: '/test' });
          ReactDOM.render(<App />, container);
        });

        const addButton = getByLabelText(container,'Add Route');
        await act(async () => {
          fireEvent.click(addButton);
        });
      };

      it('when clicking on the Add Route button the modal is shown to the user', async () => {
        await showSettingsModal();
        expect(getByTestId(container, 'route-modal')).toBeVisible();
      });

      it('when the modal is visible and the user clicks the close button, the modal is closed', async () => {
        await showSettingsModal();
        await act(async () => {
          fireEvent.click(getByLabelText(container, 'close'));
        });
        expect(queryByTestId(container, 'route-modal')).toBeNull();
      });
    });

    describe('Settings modal', () => {
      it('when clicking on the settings button the settings modal is shown to the user', async () => {
        await act(async () => {
          ReactDOM.render(<App />, container);
        });
        const settingsButton = getByLabelText(container, 'Settings');
        fireEvent.click(settingsButton);
        expect(getByLabelText(container,'Settings Modal')).toBeVisible();
      });

      it('when the modal is visible and the user clicks on the close button, the modal is closed', async () => {
        await act(async () => {
          ReactDOM.render(<App />, container);
        });

        const settingsButton = getByLabelText(container, 'Settings');
        fireEvent.click(settingsButton);
        await waitFor(() => expect(getByLabelText(container,'Settings Modal')).toBeVisible());

        await act(async () => {
          fireEvent.click(getByLabelText(container, 'close'));
        });

        expect(queryByLabelText(container, 'Settings Modal')).toBeNull();
      });
    });

    it('when the chaos monkey feature is enabled then the monkey is shown above the list of routes', async () => {
      const customSettings = { features: { chaosMonkey: true } };
      await act(async () => {
        utils.getRoutes.mockResolvedValue({
          settings: customSettings,
          routes: routesObject.routes
        });
        ReactDOM.render(<App />, container);
      });

      await waitFor(() => expect(queryAllByLabelText(container, 'Chaos Monkey Feature')).length > 0);
      expect(getByLabelText(container, 'Chaos Monkey Feature')).toBeVisible();
    });

    it('when the chaos monkey is not enabled the monkey is not shown above the list of routes', async () => {
      const settings = { features: { chaosMonkey: false } };
      await act(async () => {
        utils.getRoutes.mockResolvedValue({
          settings: settings,
          routes: routesObject.routes
        });
        ReactDOM.render(<App />, container);
      });

      expect(queryByLabelText(container, 'Chaos Monkey Feature')).toBeNull();
    });
  });
});
