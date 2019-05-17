import React, { useState } from "react";
import url from "url";
import _ from "lodash";
import styled from "styled-components";

import { MOCKIT_SERVER_URL } from "../../utils/consts";

const Wrapper = styled.div`
  padding-left: 20px;
`;

const openRoute = route => {
  return () => {
    window.open(url.resolve(MOCKIT_SERVER_URL, route), "_blank");
  };
};

const RouteItem = function({ title, value }) {
  const buildAriaLabel = label =>
    label
      ? `route-${title.toLowerCase()}-${label}`
      : `route-${title.toLowerCase()}`;

  return (
    <div className="level-item has-text-centered" aria-label={buildAriaLabel()}>
      <div>
        <p className="heading" aria-label={buildAriaLabel("title")}>
          {title}
        </p>
        <p className="title is-size-6" aria-label={buildAriaLabel("value")}>
          {value}
        </p>
      </div>
    </div>
  );
};

const Routes = function(props) {
  const {
    onRouteEdit = () => {},
    onRouteDelete = () => {},
    routes = []
  } = props;

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

  const orderedRoutes = _.orderBy(routes, route => {
    return route.route.split("/").length;
  });
  const groupedRoutes = {};

  orderedRoutes.forEach(route => {
    const paths = route.route.split("/");

    _.set(groupedRoutes, paths.slice(1, paths.length), { ...route });
    // paths.forEach()
  });

  console.log(groupedRoutes);

  const renderLevel = (routes, index, titleFromParent) => {
    const fieldsInRoute = [
      "id",
      "route",
      "payload",
      "httpMethod",
      "statusCode",
      "delay",
      "disabled"
    ];
    return (
      <div>
        {_.map(routes, (item, key) => {
          const {
            delay = 0,
            route,
            statusCode,
            httpMethod,
            disabled = false
          } = item;
          const routeClassName = disabled ? "disabled" : "";

          if (_.size(_.pick(item, fieldsInRoute)) > 0) {
            return (
              <Wrapper>
                <div level={index}>
                  {titleFromParent}/{key}
                </div>
                <div className="columns" key={route} aria-label="Route">
                  <div className="column is-full">
                    <div
                      className={`route ${routeClassName}`}
                      onClick={openRoute(route)}
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
                                onClick={editRoute(item)}
                                aria-label="Edit Route"
                              >
                                <strong>Edit</strong>
                              </button>
                              <button
                                className="button is-danger"
                                onClick={deleteRoute(item)}
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
                </div>
                {_.size(_.omit(item, fieldsInRoute)) > 0 &&
                  renderLevel(_.omit(item, fieldsInRoute), index + 1)}
              </Wrapper>
            );
          }

          console.log(item);

          return (
            <Wrapper>
              {_.size(_.omit(item, fieldsInRoute)) > 0 &&
                renderLevel(
                  _.omit(item, fieldsInRoute),
                  index,
                  titleFromParent ? `${titleFromParent}/${key}` : key
                )}
            </Wrapper>
          );
        })}
      </div>
    );
  };

  return (
    <>
      {routes.length === 0 && (
        <p className="no-routes has-text-centered">
          No routes found. Click "Add Route" to get started.
        </p>
      )}
      {renderLevel(groupedRoutes, 0)}
    </>
  );
};

export default Routes;
