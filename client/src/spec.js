// __tests__/fetch.test.js
import React from "react";
import {
  render,
  fireEvent,
  cleanup,
  queryAllByLabelText,
} from "react-testing-library";
import * as utils from "./utils/routes-api";
import "jest-dom/extend-expect";
import App from "./App";

jest.mock("./utils/routes-api", () => {
  return {
    deleteRoute: jest.fn(),
    buildRoute: jest.fn(() => {
      return { route: "/test" };
    }),
  };
});

afterEach(cleanup);

describe("App", () => {
  describe("renders", () => {
    it("the add route and settings button", () => {
      const { getByLabelText } = render(<App />);

      expect(getByLabelText("Add Route")).toBeVisible();
      expect(getByLabelText("Settings")).toBeVisible();
    });

    it("renders a list of stacked routes based on the routes in the configuration", () => {
      const { container, getByLabelText } = render(<App />);
      const routes = queryAllByLabelText(container, "Route");
      expect(routes).toHaveLength(3);
      expect(getByLabelText("routes-stacked")).toBeVisible();
    });

    it("renders a list of routes that are grouped in the grouped feature is set to true", () => {
      const settings = { features: { groupedRoutes: true } };
      const { container, getByLabelText } = render(<App settings={settings} />);
      const routes = queryAllByLabelText(container, "Route");
      expect(routes).toHaveLength(3);
      expect(getByLabelText("routes-grouped")).toBeVisible();
    });

    it("renders the no routes message when no routes have been added yet", () => {
      const { getByLabelText } = render(<App customRoutes={[]} />);
      expect(getByLabelText("no-routes")).toBeVisible();
    });

    it("renders a footer on the screen with a link to the github repo", () => {
      const { getByLabelText } = render(<App />);
      expect(getByLabelText("Site footer")).toBeVisible();
      expect(getByLabelText("Github Repo")).toBeVisible();
      expect(getByLabelText("Github Repo").text).toBe("David Boyne");
    });
  });

  describe("RouteListGrouped", () => {
    describe("edit route", () => {
      it("when edit is selected on the route the modal dialog is shown with that route", () => {
        const settings = { features: { groupedRoutes: true } };
        const { container, getByTestId, getByLabelText } = render(
          <App settings={settings} />
        );
        const routes = queryAllByLabelText(container, "Route");
        const editButton = getByLabelText("Edit Route", { element: routes[0] });

        fireEvent(
          editButton,
          new MouseEvent("click", {
            bubbles: true,
            cancelable: true,
          })
        );

        expect(getByTestId("route-modal")).toBeVisible();
      });
    });

    describe("delete route", () => {
      const clickDeleteRoute = () => {
        const settings = { features: { groupedRoutes: true } };
        const { getByLabelText, container, getByText } = render(
          <App settings={settings} />
        );
        const routes = queryAllByLabelText(container, "Route");
        const deleteButton = getByLabelText("Delete Route", {
          element: routes[0],
        });

        fireEvent.click(deleteButton);

        return { getByLabelText, getByText };
      };

      it("when delete is selected on the route the confirmation dialog is shown on that route", () => {
        const { getByLabelText } = clickDeleteRoute();
        expect(getByLabelText("Confirmation Dialog")).toBeVisible();
      });

      it("when clicking confirm on the route deletion a request is made to delete that route", () => {
        const { getByLabelText, getByText } = clickDeleteRoute();

        const modal = getByLabelText("Confirmation Dialog");

        fireEvent.click(getByText("Delete", { element: modal }));

        expect(utils.deleteRoute).toHaveBeenCalled();
      });
    });
  });

  describe("RouteListStacked", () => {
    describe("edit route", () => {
      it("when edit is selected on the route the modal dialog is shown with that route", () => {
        const { container, getByTestId, getByLabelText } = render(<App />);
        const routes = queryAllByLabelText(container, "Route");
        const editButton = getByLabelText("Edit Route", { element: routes[0] });

        fireEvent(
          editButton,
          new MouseEvent("click", {
            bubbles: true,
            cancelable: true,
          })
        );

        expect(getByTestId("route-modal")).toBeVisible();
      });
    });

    describe("delete route", () => {
      const clickDeleteRoute = () => {
        const { getByLabelText, container, getByText } = render(<App />);
        const routes = queryAllByLabelText(container, "Route");
        const deleteButton = getByLabelText("Delete Route", {
          element: routes[0],
        });

        fireEvent.click(deleteButton);

        return { getByLabelText, getByText };
      };

      it("when delete is selected on the route the confirmation dialog is shown on that route", () => {
        const { getByLabelText } = clickDeleteRoute();
        expect(getByLabelText("Confirmation Dialog")).toBeVisible();
      });

      it("when clicking confirm on the route deletion a request is made to delete that route", () => {
        const { getByLabelText, getByText } = clickDeleteRoute();

        const modal = getByLabelText("Confirmation Dialog");

        fireEvent.click(getByText("Delete", { element: modal }));

        expect(utils.deleteRoute).toHaveBeenCalled();
      });
    });
  });

  describe("Features", () => {
    describe("Add route", () => {
      const showSettingsModal = () => {
        const { getByLabelText, getByTestId, queryByTestId } = render(<App />);
        const addButton = getByLabelText("Add Route");
        fireEvent.click(addButton);
        return { getByLabelText, getByTestId, queryByTestId };
      };

      it("when clicking on the Add Route button the modal is shown to the user", () => {
        const { getByTestId } = showSettingsModal();
        expect(getByTestId("route-modal")).toBeVisible();
      });
      it("when the modal is visible and the user clicks the close button, the modal is closed", () => {
        const { getByLabelText, queryByTestId } = showSettingsModal();

        fireEvent.click(getByLabelText("close"));
        expect(queryByTestId("route-modal")).toBeNull();
      });
    });

    describe("Settings modal", () => {
      it("when clicking on the settings button the settings modal is shown to the user", () => {
        const { getByLabelText } = render(<App />);
        const settingsButton = getByLabelText("Settings");
        fireEvent.click(settingsButton);
        expect(getByLabelText("Settings Modal")).toBeVisible();
      });

      it("when the modal is visible and the user clicks on the close button, the modal is closed", () => {
        const { getByLabelText, queryByLabelText } = render(<App />);
        const settingsButton = getByLabelText("Settings");
        fireEvent.click(settingsButton);
        fireEvent.click(getByLabelText("close"));
        expect(queryByLabelText("Settings Modal")).toBeNull();
      });
    });

    it("when the chaos monkey feature is enabled then the monkey is shown above the list of routes", () => {
      const settings = { features: { chaosMonkey: true } };

      const { getByLabelText } = render(<App settings={settings} />);

      expect(getByLabelText("Chaos Monkey Feature")).toBeVisible();
    });

    it("when the chaos monkey is not enabled the monkey is not shown above the list of routes", () => {
      const settings = { features: { chaosMonkey: false } };

      const { queryByLabelText } = render(<App settings={settings} />);

      expect(queryByLabelText("Chaos Monkey Feature")).toBeNull();
    });
  });
});
