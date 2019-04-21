// __tests__/fetch.test.js
import React from "react";
import { render, fireEvent, cleanup } from "react-testing-library";
import "jest-dom/extend-expect";
import RouteModal from "./";
import * as utils from "../../utils/routes-api";
import {StatusCodes} from "../../utils/consts";

afterEach(cleanup);

const buildRoute = () => {
  return {
    id: "1",
    route: "/newRoute",
    delay: "0",
    disabled: false,
    payload: { test: true },
    statusCode: "200"
  };
};

jest.mock("../../utils/routes-api", () => {
  return { createNewRoute: jest.fn(), updateRoute: jest.fn() };
});

describe("Route Modal", () => {
  describe("renders", () => {
    it("with a header of `Add route` when the given route has no id", () => {
      const route = buildRoute();
      delete route["id"];
      const { getByText } = render(<RouteModal route={route} />);
      expect(getByText("Add Route")).toBeVisible();
    });

    it("with a header of `Edit route` when the given route has an id", () => {
      const route = buildRoute();
      const { getByText } = render(<RouteModal route={route} />);
      expect(getByText("Edit Route")).toBeVisible();
    });

    it("with an input for the route value, reads the route value and strips of any `/` values from it", () => {
      const route = buildRoute();
      const { getByLabelText } = render(<RouteModal route={route} />);

      expect(getByLabelText("route-name", { selector: "input" }).value).toEqual("newRoute");
    });

    it("with a dropdown list of all available http methods", () => {
      const route = buildRoute();
      const { getByLabelText, getByValue } = render(<RouteModal route={route} />);
      const dropdown = getByLabelText("route-http");
      const dropdownOptions = dropdown.children;

      expect(dropdownOptions.length).toEqual(4);

      expect(getByValue("GET", dropdownOptions)).toBeVisible();
      expect(getByValue("POST", dropdownOptions)).toBeVisible();
      expect(getByValue("PUT", dropdownOptions)).toBeVisible();
      expect(getByValue("DELETE", dropdownOptions)).toBeVisible();
    });

    it("with a dropdown list of all available status code", () => {
      const route = buildRoute();
      const { getByLabelText, getByValue } = render(<RouteModal route={route} />);
      const dropdown = getByLabelText("route-statuscode");
      const dropdownOptions = dropdown.children;

      expect(dropdownOptions.length).toEqual(Object.keys(StatusCodes).length);

      expect(getByValue("200", dropdownOptions)).toBeVisible();
      expect(getByValue("201", dropdownOptions)).toBeVisible();
      expect(getByValue("204", dropdownOptions)).toBeVisible();
      expect(getByValue("400", dropdownOptions)).toBeVisible();
      expect(getByValue("401", dropdownOptions)).toBeVisible();
      expect(getByValue("500", dropdownOptions)).toBeVisible();
    });

    it("with a dropdown list of all available delay values", () => {
      const route = buildRoute();
      const { getByLabelText, getByValue } = render(<RouteModal route={route} />);
      const dropdown = getByLabelText("route-delay");
      const dropdownOptions = dropdown.children;

      expect(dropdownOptions.length).toEqual(7);

      expect(getByValue("0", dropdownOptions)).toBeVisible();
      expect(getByValue("250", dropdownOptions)).toBeVisible();
      expect(getByValue("500", dropdownOptions)).toBeVisible();
      expect(getByValue("1000", dropdownOptions)).toBeVisible();
      expect(getByValue("1500", dropdownOptions)).toBeVisible();
      expect(getByValue("2000", dropdownOptions)).toBeVisible();
      expect(getByValue("5000", dropdownOptions)).toBeVisible();
    });

    it("with a link that randomly generates data", () => {
      const route = buildRoute();
      const { getByLabelText } = render(<RouteModal route={route} />);
      expect(getByLabelText("route-randomly-generate-data")).toBeVisible();
    });

    it("with a checkbox to disable the route", () => {
      const route = buildRoute();
      const { getByLabelText } = render(<RouteModal route={route} />);
      expect(getByLabelText("route-disable")).toBeVisible();
    });

    it("with a `Save Changes` button and `Cancel` button", () => {
      const route = buildRoute();
      const { getByLabelText } = render(<RouteModal route={route} />);
      expect(getByLabelText("route-save")).toBeVisible();
      expect(getByLabelText("route-cancel")).toBeVisible();
    });
  });

  describe("modal", () => {
    it("when entering a value into the route input field the value is updated", () => {
      const { getByLabelText } = render(<RouteModal route={buildRoute()} />);
      expect(getByLabelText("route-name").value).toEqual("newRoute");
      fireEvent.change(getByLabelText("route-name"), { target: { value: "testRoute" } });
      expect(getByLabelText("route-name").value).toEqual("testRoute");
    });

    it("when selecting a value from the dropdown list of HTTP methods the dropdown value is updated", () => {
      const { getByLabelText } = render(<RouteModal route={buildRoute()} />);
      expect(getByLabelText("route-http").value).toEqual("GET");
      fireEvent.change(getByLabelText("route-http"), { target: { value: "POST" } });
      expect(getByLabelText("route-http").value).toEqual("POST");
    });

    it("when selecting a value from the dropdown list of Status codes methods the dropdown value is updated", () => {
      const { getByLabelText } = render(<RouteModal route={buildRoute()} />);
      expect(getByLabelText("route-statuscode").value).toEqual("200");
      fireEvent.change(getByLabelText("route-statuscode"), { target: { value: "500" } });
      expect(getByLabelText("route-statuscode").value).toEqual("500");
    });

    it("when selecting a value from the delay list the dropdown value is updated", () => {
      const { getByLabelText } = render(<RouteModal route={buildRoute()} />);
      expect(getByLabelText("route-delay").value).toEqual("0");
      fireEvent.change(getByLabelText("route-delay"), { target: { value: "500" } });
      expect(getByLabelText("route-delay").value).toEqual("500");
    });

    it("when disabling the route the checkbox value is updated", () => {
      const { getByLabelText } = render(<RouteModal route={buildRoute()} />);
      expect(getByLabelText("route-disable").checked).toEqual(false);
      fireEvent.change(getByLabelText("route-disable"), { target: { checked: true } });
      expect(getByLabelText("route-disable").checked).toEqual(true);
    });

    it("when the save button is clicked and the route is a new route a request to create a new route is made", () => {
      const route = buildRoute();
      delete route["id"];
      const { getByLabelText } = render(<RouteModal route={route} />);
      fireEvent.click(getByLabelText("route-save"));
      expect(utils.createNewRoute).toHaveBeenCalledWith(route);
    });

    it("when the save button is clicked and the route is an existing route a request to edit the route", () => {
      const route = buildRoute();
      const { getByLabelText } = render(<RouteModal route={route} />);
      fireEvent.click(getByLabelText("route-save"));
      expect(utils.updateRoute).toHaveBeenCalledWith(route);
    });
  });

  describe("props", () => {
    describe("onClose", () => {
      it("is called when closing the modal dialog using the close button", () => {
        const spy = jest.fn();
        const { getByLabelText } = render(<RouteModal route={buildRoute()} onClose={spy} />);
        fireEvent.click(getByLabelText("close"));
        expect(spy).toHaveBeenCalled();
      });
      it("is called when clicking the cancel button", () => {
        const spy = jest.fn();
        const { getByLabelText } = render(<RouteModal route={buildRoute()} onClose={spy} />);
        fireEvent.click(getByLabelText("route-cancel"));
        expect(spy).toHaveBeenCalled();
      });
    });
  });
});
