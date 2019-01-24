export interface Route {
  route: string;
  httpMethod: string;
  statusCode: string;
  delay: string;
  payload: any;
  id: string;
}

export enum HttpMethods {
  GET = "GET",
  PUT = "PUT",
  POST = "POST"
}

export enum StatusCodes {
  OK = "200",
  CREATED = "201",
  NO_CONTENT = "204",
  BAD_REQUEST = "400",
  FORBIDDEN = "403",
  INTERNAL_SERVER_ERROR = "500"
}
