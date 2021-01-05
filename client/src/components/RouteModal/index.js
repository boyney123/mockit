import React, { useState, useEffect } from 'react';
import JSONInput from 'react-json-editor-ajrm';
import HeaderInput from '../HeaderInput';
import { HttpMethods, StatusCodes } from '../../utils/consts';
import {
  updateRoute as updateRouteRequest,
  createNewRoute
} from '../../utils/routes-api';
import faker from 'faker';
import uuid from 'uuid/v4';

const HTTP_METHOD_LIST = [
  HttpMethods.GET,
  HttpMethods.POST,
  HttpMethods.PUT,
  HttpMethods.PATCH,
  HttpMethods.DELETE
];
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
  StatusCodes.INTERNAL_SERVER_ERROR,
  StatusCodes.SERVICE_UNAVAILABLE,
  StatusCodes.GATEWAY_TIMEOUT
];

/**
 * add header adds some input fields
 *
 * Clicking X removes the field from the array....
 */

const Modal = function (props) {
  const { onClose = () => {}, route: editedRoute } = props;

  const [route, updateRoute] = useState(editedRoute.route);
  const [httpMethod, updateHttpMethod] = useState(editedRoute.httpMethod);
  const [statusCode, updateStatusCode] = useState(editedRoute.statusCode);
  const [delay, updateDelay] = useState(editedRoute.delay);
  const [payload, updatePayload] = useState(editedRoute.payload);
  const [disabled, updateDisabled] = useState(editedRoute.disabled);
  const [headers, updateHeaders] = useState(editedRoute.headers || []);

  const isNewRoute = editedRoute.id === undefined;

  const modalTitle = isNewRoute ? 'Add Route' : 'Edit Route';

  const setHeader = (updatedHeader) => {
    const { id } = updatedHeader;

    const updatedHeaders = headers.map((header, index) => {
      if (id !== header.id) return header;
      return {
        ...header,
        ...updatedHeader
      };
    });

    updateHeaders(updatedHeaders);
  };

  const addNewHeader = () =>
    updateHeaders(headers.concat([{ id: uuid(), header: '', value: '' }]));
  const removeHeader = (route) => {
    const filteredHeaders = headers.filter(({ id } = {}) => id !== route);
    updateHeaders(filteredHeaders);
  };

  const saveChanges = () => {
    try {
      const cleanedHeaders = headers.filter(
        ({ header, value }) => header !== '' && value !== ''
      );

      const data = {
        ...editedRoute,
        route,
        httpMethod,
        statusCode,
        delay,
        payload,
        disabled,
        headers: cleanedHeaders
      };

      (isNewRoute ? createNewRoute(data) : updateRouteRequest(data)).then(() => onClose());
    } catch (error) {
      console.log('Error', error);
    }
  };

  const statusCodeStartingWith = (startingNumber) => {
    return STATUS_CODES.filter((routeStatusCode) =>
      routeStatusCode.startsWith(startingNumber)
    );
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
                <input
                  aria-label="route-name"
                  className="input"
                  type="text"
                  placeholder="Text input"
                  value={route.replace('/', '')}
                  onChange={(e) => updateRoute(`/${e.currentTarget.value}`)}
                />
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
                    <select
                      aria-label="route-http"
                      value={httpMethod}
                      onChange={(e) => updateHttpMethod(e.currentTarget.value)}
                    >
                      {HTTP_METHOD_LIST.map((method) => (
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
                    <select
                      aria-label="route-statuscode"
                      value={statusCode}
                      onChange={(e) => updateStatusCode(e.currentTarget.value)}
                    >
                      <optgroup aria-label="2xx" label="2xx">
                        {statusCodeStartingWith('2').map((routeStatusCode) => (
                          <option key={routeStatusCode} value={routeStatusCode}>
                            {routeStatusCode}
                          </option>
                        ))}
                      </optgroup>
                      <optgroup aria-label="4xx" label="4xx">
                        {statusCodeStartingWith('4').map((routeStatusCode) => (
                          <option key={routeStatusCode} value={routeStatusCode}>
                            {routeStatusCode}
                          </option>
                        ))}
                      </optgroup>
                      <optgroup aria-label="5xx" label="5xx">
                        {statusCodeStartingWith('5').map((routeStatusCode) => (
                          <option key={routeStatusCode} value={routeStatusCode}>
                            {routeStatusCode}
                          </option>
                        ))}
                      </optgroup>
                    </select>
                  </div>
                </div>
              </div>
              <div className="field">
                <label className="label">Delay </label>
                <div className="control">
                  <div className="select">
                    <select
                      aria-label="route-delay"
                      value={delay}
                      onChange={(e) => updateDelay(e.currentTarget.value)}
                    >
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
                <JSONInput
                  placeholder={payload}
                  onChange={(e) => updatePayload(e.jsObject)}
                  height="120px"
                  width="100%"
                  locale="en-gb"
                />
                <a
                  className="button is-small is-pulled-right random-data is-primary is-inverted"
                  onClick={() => updatePayload(faker.helpers.userCard())}
                  aria-label="route-randomly-generate-data"
                >
                  Randomly Generate Data
                </a>
              </div>
            </div>
            <hr />
            <div className="field mt10">
              <label className="label" aria-label="no-headers-message">
                Response Headers (optional)
              </label>
              {headers.length === 0 && <i>No headers added.</i>}
              {headers.map((header, index) => {
                return (
                  <HeaderInput
                    data={header}
                    onBlur={setHeader}
                    onRemove={removeHeader}
                  />
                );
              })}
              <button
                aria-label="add-header"
                className="button is-primary is-small is-pulled-right"
                onClick={addNewHeader}
              >
                Add Header
              </button>
            </div>
            <div className="field">
              <div className="control">
                <label className="label">Settings</label>
                <label className="checkbox">
                  <input
                    aria-label="route-disable"
                    type="checkbox"
                    checked={disabled}
                    className="mr10"
                    onChange={(e) => updateDisabled(e.target.checked)}
                  />
                  <span>Disable Route</span>
                </label>
              </div>
            </div>
          </section>
          <footer className="modal-card-foot">
            <button
              aria-label="route-save"
              className="button is-success"
              onClick={saveChanges}
            >
              Save changes
            </button>
            <button
              aria-label="route-cancel"
              className="button"
              onClick={onClose}
            >
              Cancel
            </button>
          </footer>
        </div>
      </div>
    </>
  );
};

export default Modal;
