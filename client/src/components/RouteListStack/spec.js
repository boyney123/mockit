// __tests__/fetch.test.js
import React from "react";
import { render, fireEvent, cleanup } from "react-testing-library";
import "jest-dom/extend-expect";
import RouteListStack from "./";

afterEach(cleanup);

const buildRoutes = () => {
  return [
    {
      id: "1",
      route: "/test",
      delay: "500",
      statusCode: "200",
      httpMethod: "GET",
    },
    {
      id: "2",
      route: "/test2",
      delay: "0",
      statusCode: "200",
      httpMethod: "GET",
    },
  ];
};

describe("RouteListStack", () => {
  describe("renders", () => {
    it("the list of given routes", () => {
      const { getAllByLabelText } = render(
        <RouteListStack routes={buildRoutes()} />
      );
      const routes = getAllByLabelText("Route");
      expect(routes.length).toBe(2);
    });
  });
  describe("props", () => {
    it("when the user clicks on the edit button on the rendered route the given `onRouteEdit` callback is triggered", () => {
      const spy = jest.fn();
      const { getByLabelText } = render(
        <RouteListStack routes={buildRoutes()} onRouteEdit={spy} />
      );
      fireEvent.click(getByLabelText("Edit Route"));
      expect(spy).toHaveBeenCalled();
    });
    it("when the user clicks on the delete button on the rendered route the given `onRouteDelete` callback is triggered", () => {
      const spy = jest.fn();
      const { getByLabelText } = render(
        <RouteListStack routes={buildRoutes()} onRouteDelete={spy} />
      );
      fireEvent.click(getByLabelText("Delete Route"));
      expect(spy).toHaveBeenCalled();
    });
  });
});
