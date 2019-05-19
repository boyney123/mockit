// __tests__/fetch.test.js
import React from "react";
import { render, cleanup } from "react-testing-library";
import "jest-dom/extend-expect";
import RouteListGroup from "./";

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
      route: "/test/test2",
      delay: "500",
      statusCode: "200",
      httpMethod: "GET"
    },
    {
      id: "1",
      route: "/test/test2/test3",
      delay: "500",
      statusCode: "200",
      httpMethod: "GET"
    },
    {
      id: "1",
      route: "/test/test2/test3/test4",
      delay: "500",
      statusCode: "200",
      httpMethod: "GET"
    }
  ];
};

describe("RouteListGroup", () => {
  describe("renders", () => {
    it.only("the list of given routes with their own groups based of the route path", () => {
      const { getAllByLabelText, getByLabelText, getByText } = render(<RouteListGroup routes={buildRoutes()} />);
      const routes = getAllByLabelText("Route");

      expect(getByLabelText("route-group-test")).toBeVisible();
      expect(getByLabelText("route-group-test2")).toBeVisible();
      expect(getByLabelText("route-group-test3")).toBeVisible();
      expect(getByLabelText("route-group-test4")).toBeVisible();

      expect(getByText("/test")).toBeVisible();
      expect(getByText("/test2")).toBeVisible();
      expect(getByText("/test3")).toBeVisible();
      expect(getByText("/test4")).toBeVisible();

      expect(routes).toHaveLength(4);
    });
  });
});
