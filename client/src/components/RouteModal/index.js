import React, { useState } from "react";
import JSONInput from "react-json-editor-ajrm";
import { HttpMethods, StatusCodes } from "../../utils/consts";
import { updateRoute as updateRouteRequest, createNewRoute } from "../../utils/routes-api";
import faker from "faker";

const HTTP_METHOD_LIST = [HttpMethods.GET, HttpMethods.POST, HttpMethods.PUT, HttpMethods.PATCH, HttpMethods.DELETE];
const STATUS_CODES = [
  StatusCodes.OK,
  StatusCodes.CREATED,
  StatusCodes.ACCEPTED,
  StatusCodes.NO_CONTENT,
  StatusCodes.BAD_REQUEST,
  StatusCodes.UNAUTHORIZED,
  StatusCodes.FORBIDDEN,
  StatusCodes.NOT_FOUND,
  StatusCodes.CONFLICT,
  StatusCodes.UNPROCESSABLE_ENTITY,
  StatusCodes.INTERNAL_SERVER_ERROR
];

const Modal = function(props) {
  const { onClose = () => {}, route: editedRoute } = props;

  const [route, updateRoute] = useState(editedRoute.route);
  const [httpMethod, updateHttpMethod] = useState(editedRoute.httpMethod);
  const [statusCode, updateStatusCode] = useState(editedRoute.statusCode);
  const [delay, updateDelay] = useState(editedRoute.delay);
  const [payload, updatePayload] = useState(editedRoute.payload);
  const [disabled, updateDisabled] = useState(editedRoute.disabled);

  const isNewRoute = editedRoute.id === undefined;

  const modalTitle = isNewRoute ? "Add Route" : "Edit Route";

  const saveChanges = async () => {
    try {
      const data = {
        ...editedRoute,
        route,
        httpMethod,
        statusCode,
        delay,
        payload,
        disabled
      };

      isNewRoute ? await createNewRoute(data) : await updateRouteRequest(data);
    } catch (error) {
      console.log("Error", error);
    }
  };

  return (
    <>
      <div className="modal is-active" data-testid="route-modal">
        <div className="modal-background animated fadeIn faster" />
        <div className="modal-card animated fadeInDown faster">
          <header className="modal-card-head">
            <p className="modal-card-title">{modalTitle}</p>
            <button className="delete" aria-label="close" onClick={onClose} />
          </header>
          <section className="modal-card-body">
            <div className="field">
              <label htmlFor="route-name" className="label">
                Route
              </label>
              <div className="control has-icons-left">
                <input aria-label="route-name" className="input" type="text" placeholder="Text input" value={route.replace("/", "")} onChange={e => updateRoute(`/${e.currentTarget.value}`)} />
                <span className="icon is-small is-left">/</span>
              </div>
            </div>
            <div className="field-body">
              <div className="field">
                <label htmlFor="route-http" className="label">
                  HTTP Method
                </label>
                <div className="control">
                  <div className="select">
                    <select aria-label="route-http" value={httpMethod} onChange={e => updateHttpMethod(e.currentTarget.value)}>
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
                    <select aria-label="route-statuscode" value={statusCode} onChange={e => updateStatusCode(e.currentTarget.value)}>
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
                    <select aria-label="route-delay" value={delay} onChange={e => updateDelay(e.currentTarget.value)}>
                      <option value="0">0</option>
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
            <div className="field mt10">
              <label className="label">Response</label>
              <div className="control">
                <JSONInput placeholder={payload} onChange={e => updatePayload(e.jsObject)} height="120px" width="100%" locale="en-gb" />
                <a className="button is-small is-pulled-right random-data is-primary is-inverted" onClick={() => updatePayload(faker.helpers.userCard())} aria-label="route-randomly-generate-data">
                  Randomly Generate Data
                </a>
              </div>
            </div>
            <hr />
            <div className="field">
              <div className="control">
                <label className="label">Settings</label>
                <label className="checkbox">
                  <input aria-label="route-disable" type="checkbox" checked={disabled} className="mr10" onChange={e => updateDisabled(e.target.checked)} />
                  <span>Disable Route</span>
                </label>
              </div>
            </div>
          </section>
          <footer className="modal-card-foot">
            <button aria-label="route-save" className="button is-success" onClick={saveChanges}>
              Save changes
            </button>
            <button aria-label="route-cancel" className="button" onClick={onClose}>
              Cancel
            </button>
          </footer>
        </div>
      </div>
    </>
  );
};

export default Modal;
