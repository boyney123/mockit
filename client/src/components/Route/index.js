import React from "react";
import url from "url";
import RouteItem from "./RouteItem";

import { MOCKIT_SERVER_URL } from "../../utils/consts";

const Route = ({ routeItem, onRouteDelete, onRouteEdit }) => {
  const {
    delay = 0,
    route,
    statusCode,
    httpMethod,
    disabled = false,
  } = routeItem;
  const routeClassName = disabled ? "disabled" : "";

  const openRoute = (route) => {
    return () => {
      window.open(url.resolve(MOCKIT_SERVER_URL, route), "_blank");
    };
  };

  const editRoute = (event) => {
    event.stopPropagation();
    onRouteEdit(routeItem);
  };

  const deleteRoute = (event) => {
    event.stopPropagation();
    onRouteDelete(routeItem);
  };

  return (
    <div className="column is-full">
      <div
        className={`route ${routeClassName}`}
        onClick={openRoute(route)}
        aria-label="Route"
      >
        <nav className="level">
          <RouteItem title="Route" value={route} />
          <RouteItem title="Delay" value={`${delay} ms`} />
          <RouteItem title="Status Code" value={statusCode} />
          <RouteItem title="HTTP" value={httpMethod} />

          <div className="level-item has-text-centered">
            <div>
              <p className="title is-size-4">
                <button
                  className="button is-info mr10"
                  onClick={editRoute}
                  aria-label="Edit Route"
                >
                  <strong>Edit</strong>
                </button>
                <button
                  className="button is-danger"
                  onClick={deleteRoute}
                  aria-label="Delete Route"
                >
                  <strong>Delete</strong>
                </button>
              </p>
            </div>
          </div>
        </nav>
      </div>
    </div>
  );
};

export default Route;
