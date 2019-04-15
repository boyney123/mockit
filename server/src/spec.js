const request = require("supertest");
const fs = require("fs-extra");
const path = require("path");

const app = require("./");

const generateRoute = overrides => ({
  route: "/test",
  httpMethod: "GET",
  statusCode: "200",
  delay: "0",
  payload: {
    test: true
  },
  ...overrides
});

const writeConfiguration = async (config = { routes: [] }) => {
  return await fs.writeJson(path.resolve(__dirname, "../configuration/routes.json"), config);
};

const getConfiguration = () => {
  return fs.readJsonSync(path.resolve(__dirname, "../configuration/routes.json"));
};

const clearConfiguration = async () => {
  await writeConfiguration();
};

describe("Route API", () => {
  beforeEach(() => {
    clearConfiguration();
  });

  describe("/ (POST)", () => {
    ["route", "httpMethod", "statusCode", "delay", "payload"].forEach(requiredProperty => {
      it(`returns a 400 status code when ${requiredProperty} property is missing from the payload`, async () => {
        const payload = generateRoute();

        delete payload[requiredProperty];

        await request(app)
          .post("/route")
          .send({ ...payload })
          .set("Accept", "application/json")
          .expect(400);
      });
    });

    it("returns a 201 and writes the given route to the configuration file with a generated ID", async () => {
      const route = generateRoute();

      await request(app)
        .post("/route")
        .send({ ...route })
        .set("Accept", "application/json")
        .expect(201);

      const config = getConfiguration();

      expect(config.routes).toHaveLength(1);
      expect(config.routes[0].id).toBeDefined();
      expect(config.routes[0]).toEqual(expect.objectContaining(route));
    });
  });

  describe("/ (PUT)", () => {
    ["route", "httpMethod", "statusCode", "delay", "payload", "id"].forEach(requiredProperty => {
      it(`returns a 400 status code when ${requiredProperty} property is missing from the payload`, async () => {
        const payload = generateRoute({ id: "1234" });

        delete payload[requiredProperty];

        await request(app)
          .put("/route")
          .send({ ...payload })
          .set("Accept", "application/json")
          .expect(400);
      });
    });

    it("returns a 200 and updates the given route to the configuration file with a generated ID", async () => {
      const originalRoute = generateRoute({ id: "1234" });

      await writeConfiguration({ routes: [generateRoute(), generateRoute(), originalRoute] });

      // make changes to the route
      const updatedRoute = {
        ...originalRoute,
        route: "/change",
        payload: "changeToPayload",
        delay: 5000
      };

      await request(app)
        .put("/route")
        .send({ ...updatedRoute })
        .set("Accept", "application/json")
        .expect(204);

      const config = getConfiguration();

      expect(config.routes).toHaveLength(3);
      expect(config.routes[2]).toEqual(expect.objectContaining(updatedRoute));
    });
  });

  describe("/ (DELETE)", () => {
    ["id"].forEach(requiredProperty => {
      it(`returns a 400 status code when ${requiredProperty} property is missing from the payload`, async () => {
        const payload = generateRoute({ id: "1234" });

        delete payload[requiredProperty];

        await request(app)
          .delete("/route")
          .send({ ...payload })
          .set("Accept", "application/json")
          .expect(400);
      });
    });

    it("returns a 200 and deletes the given route", async () => {
      const route = generateRoute({ id: "1234" });

      await writeConfiguration({ routes: [generateRoute(), generateRoute(), route] });

      await request(app)
        .delete("/route")
        .send({ id: "1234" })
        .set("Accept", "application/json")
        .expect(204);

      const config = getConfiguration();

      expect(config.routes).toHaveLength(2);
    });
  });

  describe("/settings", () => {
    it("returns a 204 and updated the settings in the configuration with the settings provided in the payload", async () => {
      await writeConfiguration({ settings: { test: true } });

      await request(app)
        .post("/settings")
        .send({ newSetting: true })
        .set("Accept", "application/json")
        .expect(204);

      const config = getConfiguration();

      expect(config).toEqual({
        settings: {
          newSetting: true,
          test: true
        }
      });
    });
  });
});
