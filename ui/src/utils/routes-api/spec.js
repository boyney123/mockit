import { createNewRoute } from "./index";
import { Route } from "../../types";
import url from "url";

const mockFetchPromise = Promise.resolve({
  json: () => Promise.resolve({})
});

jest.spyOn(window, "fetch").mockImplementation(() => mockFetchPromise); // 4

describe("routes-api", () => {
  beforeEach(() => {
    window.fetch.mockClear();
  });

  describe("createNewRoute", () => {
    it.only("makes a POST request with the given route to the /route end point", async () => {
      const route: Route = {
        route: "/test",
        httpMethod: "GET",
        delay: "2000",
        payload: { test: true },
        statusCode: "200"
      };

      const result = await createNewRoute(route);

      expect(window.fetch).toHaveBeenCalled();
      expect(window.fetch.mock.calls[0][1]).toEqual({
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(route)
      });
    });
  });
});

/**
 * TODO: Move other APIS into the tests and API until function.
 * Refactor UI and write tests....
 */
