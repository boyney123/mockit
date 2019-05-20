export const HttpMethods = {
  GET: "GET",
  PUT: "PUT",
  PATCH: "PATCH",
  POST: "POST",
  DELETE: "DELETE"
};

export const StatusCodes = {
  OK: "200",
  CREATED: "201",
  ACCEPTED: "202",
  NO_CONTENT: "204",
  BAD_REQUEST: "400",
  UNAUTHORIZED: "401",
  FORBIDDEN: "403",
  NOT_FOUND: "404",
  CONFLICT: "409",
  UNPROCESSABLE_ENTITY: "422",
  INTERNAL_SERVER_ERROR: "500"
};

export const MOCKIT_SERVER_URL = process.env.REACT_APP_MOCKIT_SERVER_URL || "localhost:3000";
