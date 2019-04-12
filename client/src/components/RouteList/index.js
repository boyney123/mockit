import React, { useState } from "react";
import url from "url";
import { routes } from "../../config/routes.json";
import { MOCKIT_SERVER_URL } from "../../utils/consts";

const openRoute = route => {
  return () => {
    window.open(url.resolve(MOCKIT_SERVER_URL, route), "_blank");
  };
};

const RouteItem = function({ title, value }) {
  return (
    <div className="level-item has-text-centered">
      <div>
        <p className="heading">{title}</p>

        <p className="title is-size-6">{value}</p>
      </div>
    </div>
  );
};

const Routes = function(props) {
  const { onRouteEdit = () => {}, onRouteDelete = () => {} } = props;

  const editRoute = item => {
    return event => {
      event.stopPropagation();
      onRouteEdit(item);
    };
  };

  const deleteRoute = item => {
    return event => {
      event.stopPropagation();
      onRouteDelete(item);
    };
  };

  return (
    <>
      {routes.length === 0 && <p className="no-routes has-text-centered">No routes found. Click "Add Route" to get started.</p>}
      {routes.map(item => {
        const { delay = 0, route, statusCode, httpMethod, disabled = false } = item;
        const routeClassName = disabled ? "disabled" : "";
        return (
          <div className="columns">
            <div className="column is-full">
              <div className={`route ${routeClassName}`} onClick={openRoute(route)}>
                <nav className="level">
                  <RouteItem title="Route" value={route} />
                  <RouteItem title="Delay" value={`${delay} ms`} />
                  <RouteItem title="Status Code" value={statusCode} />
                  <RouteItem title="HTTP" value={httpMethod} />

                  <div className="level-item has-text-centered">
                    <div>
                      <p className="title is-size-4">
                        <a className="button is-info mr10" onClick={editRoute(item)}>
                          <strong>Edit</strong>
                        </a>
                        <a className="button is-danger" onClick={deleteRoute(item)}>
                          <strong>Delete</strong>
                        </a>
                      </p>
                    </div>
                  </div>
                </nav>
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
};

export default Routes;
