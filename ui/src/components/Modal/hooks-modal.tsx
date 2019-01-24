import React, { useState } from "react";
import JSONInput from "react-json-editor-ajrm";
import { Route, HttpMethods, StatusCodes } from "../../types";

import faker from "faker";

console.log(faker.helpers.userCard());

export interface ModalProps {
  route: Route;
  onClose: any;
  action: string;
}

const HTTP_METHOD_LIST = [HttpMethods.GET, HttpMethods.POST, HttpMethods.PUT];
const STATUS_CODES = [StatusCodes.OK, StatusCodes.CREATED, StatusCodes.NO_CONTENT, StatusCodes.BAD_REQUEST, StatusCodes.FORBIDDEN, StatusCodes.INTERNAL_SERVER_ERROR];

const server = `${process.env.REACT_APP_MOCKIT_API_URL}/routes`;

const Modal: React.SFC<ModalProps> = (props: ModalProps) => {
  const { onClose = () => {}, action = "new", route: data } = props;

  const defaults = {
    route: "",
    httpMethod: HttpMethods.GET,
    statusCode: StatusCodes.OK,
    delay: "0",
    payload: { test: true }
  };

  const modalData = {
    ...defaults,
    ...data
  };

  const [route, updateRoute] = useState(modalData.route);
  const [httpMethod, updateHttpMethod] = useState(modalData.httpMethod);
  const [statusCode, updateStatusCode] = useState(modalData.statusCode);
  const [delay, updateDelay] = useState(modalData.delay);
  const [payload, updatePayload] = useState(modalData.payload);

  const modalTitle = action === "new" ? "Add Route" : "Edit Route";

  let cleanedRoute = route;
  if (route.charAt(0) == "/") {
    cleanedRoute = route.substr(1, route.length);
  }

  const saveChanges = async () => {
    try {
      const data = {
        route,
        httpMethod,
        statusCode,
        delay,
        payload,
        id: modalData.id
      };

      const method = action === "new" ? HttpMethods.POST : HttpMethods.PUT;

      const response = await fetch(server, {
        method,
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      });
      onClose();
    } catch (error) {
      console.log("Error", error);
    }
  };

  return (
    <>
      <div className="modal is-active">
        <div className="modal-background animated fadeIn faster" />
        <div className="modal-card animated fadeInDown faster">
          <header className="modal-card-head">
            <p className="modal-card-title">{modalTitle}</p>
            <button className="delete" aria-label="close" onClick={onClose} />
          </header>
          <section className="modal-card-body">
            <div className="field">
              <label className="label">Route</label>
              <div className="control has-icons-left">
                <input className="input" type="text" placeholder="Text input" value={cleanedRoute} onChange={e => updateRoute(`/${e.currentTarget.value}`)} />
                <span className="icon is-small is-left">/</span>
              </div>
            </div>
            <div className="field-body">
              <div className="field">
                <label className="label">HTTP Method</label>
                <div className="control">
                  <div className="select">
                    <select value={httpMethod} onChange={e => updateHttpMethod(e.currentTarget.value)}>
                      {HTTP_METHOD_LIST.map(method => (
                        <option key={method} value={method}>
                          {method}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
              <div className="field">
                <label className="label">Status Code</label>
                <div className="control">
                  <div className="select">
                    <select value={statusCode} onChange={e => updateStatusCode(e.currentTarget.value)}>
                      {STATUS_CODES.map(test => (
                        <option key={test} value={test}>
                          {test}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
              <div className="field">
                <label className="label">Delay </label>
                <div className="control">
                  <div className="select">
                    <select value={delay} onChange={e => updateDelay(e.currentTarget.value)}>
                      <option value="250">250</option>
                      <option value="500">500</option>
                      <option value="1000">1000</option>
                      <option value="1500">1500</option>
                      <option value="2000">2000</option>
                      <option value="5000">5000</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
            <div className="field">
              <label className="label">Response</label>
              <div className="control">
                <JSONInput placeholder={payload} onChange={(e: any) => updatePayload(e.jsObject)} height="120px" width="100%" />
                <a className="button is-small is-pulled-right random-data is-primary is-inverted" onClick={() => updatePayload(faker.helpers.userCard())}>
                  Randomly Generate Data
                </a>
              </div>
            </div>
          </section>
          <footer className="modal-card-foot">
            <button className="button is-success" onClick={saveChanges}>
              Save changes
            </button>
            <button className="button" onClick={onClose}>
              Cancel
            </button>
          </footer>
        </div>
      </div>
    </>
  );
};

export default Modal;
