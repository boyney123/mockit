// __tests__/fetch.test.js
import React from "react";
import { render, fireEvent, cleanup } from "react-testing-library";
import "jest-dom/extend-expect";
import RouteList from "./";

afterEach(cleanup);

const buildRoutes = () => {
  return [
    {
      id: "1",
      route: "/test",
      delay: "500",
      statusCode: "200",
      httpMethod: "GET"
    },
    {
      id: "2",
      route: "/test2",
      delay: "0",
      statusCode: "200",
      httpMethod: "GET"
    }
  ];
};

describe("RouteList", () => {
  describe("renders", () => {
    it("the list of given routes", () => {
      const { getAllByLabelText } = render(<RouteList routes={buildRoutes()} />);
      const routes = getAllByLabelText("Route");
      expect(routes.length).toBe(2);
    });
    it("a route has the route, delay, statuscode, http method rendered", () => {
      const { getByLabelText, getAllByLabelText, getByText } = render(<RouteList routes={buildRoutes()} />);
      const routes = getAllByLabelText("Route");
      const route = routes[0];

      expect(getByLabelText("route-route")).toBeVisible();
      expect(getByText("/test", route)).toBeVisible();
      expect(getByText("500 ms", route)).toBeVisible();
      expect(getByText("200", route)).toBeVisible();
      expect(getByText("GET", route)).toBeVisible();
    });

    it("the route renders with an edit and delete button", () => {
      const { getByLabelText } = render(<RouteList routes={buildRoutes()} />);
      expect(getByLabelText("Edit Route")).toBeVisible();
      expect(getByLabelText("Delete Route")).toBeVisible();
    });
  });

  describe("props", () => {
    describe("onRouteEdit", () => {
      it("is called when the edit route button is clicked", () => {
        const spy = jest.fn();
        const { getByLabelText } = render(<RouteList routes={buildRoutes()} onRouteEdit={spy} />);
        fireEvent.click(getByLabelText("Edit Route"));
        expect(spy).toHaveBeenCalled();
      });
    });
    describe("onRouteDelete", () => {
      it("is called when the delete route button is clicked", () => {
        const spy = jest.fn();
        const { getByLabelText } = render(<RouteList routes={buildRoutes()} onRouteDelete={spy} />);
        fireEvent.click(getByLabelText("Delete Route"));
        expect(spy).toHaveBeenCalled();
      });
    });
  });
});
