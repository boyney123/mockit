const request = require("supertest");
const fs = require("fs-extra");
const path = require("path");

jest.mock("./util", () => {
  return {
    hitByMonkey: jest.fn(() => true)
  };
});
const utils = require("./util");

const buildExampleConfig = () => {
  return {
    settings: {
      features: {
        chaosMonkey: true,
        cors: true,
        authentication: false
      }
    },
    routes: [
      {
        id: "b0e91a33-787c-4d54-8c58-10ac970e2865",
        route: "/getExample",
        httpMethod: "GET",
        statusCode: "200",
        delay: "0",
        payload: {
          test: true
        },
        disabled: false
      },
      {
        id: "b0e91a33-787c-4d54-8c58-10ac970e2865",
        route: "/postExample",
        httpMethod: "POST",
        statusCode: "200",
        delay: "0",
        payload: {
          test: true
        },
        disabled: false
      }
    ]
  };
};

const fsExtra = jest.mock(
  "fs-extra",
  jest.fn(() => {
    return {
      readJsonSync: jest.fn(() => buildExampleConfig())
    };
  })
);

const app = require("../../");

describe("Chaos Monkey", () => {
  describe("routes", () => {
    it("monkey returns a banana if the first check in the middleware fails", async () => {
      utils.hitByMonkey.mockImplementationOnce(() => true);

      await request(app)
        .get("/getExample")
        .expect(200, "Monkey left you a 🍌...");
    });

    it("monkey returns a 500 status code if the second check in the middleware fails", async () => {
      utils.hitByMonkey.mockImplementationOnce(() => false).mockImplementationOnce(() => true);

      await request(app)
        .get("/getExample")
        .expect(500);
    });

    it("monkey returns expected response if all checks pass", async () => {
      utils.hitByMonkey
        .mockImplementationOnce(() => false)
        .mockImplementationOnce(() => false)
        .mockImplementationOnce(() => false);

      await request(app)
        .get("/getExample")
        .expect(200);
    });
  });
});
