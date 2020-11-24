import React, { useMemo } from 'react';
import Route from '../Route';
import styled from 'styled-components';
import _ from 'lodash';

const Wrapper = styled.details`
  padding-left: 20px;
`;

const RouteTitle = styled.summary`
  color: #1d1d1d;
  font-weight: 600;
  cursor: pointer;
  font-size: 1.3em;
  padding-left: 50px;
  position: relative;

  &:before {
    position: absolute;
    content: ' ';
    height: 2px;
    background-color: #209cee;
    left: 0;
    right: 0;
    top: 50%;
    transform: translateY(-50%);
    z-index: -1;
  }

  &:focus {
    outline: none;
  }

  &::-webkit-details-marker {
    background: white;
    padding-right: 10px;
    padding-left: 10px;
  }
`;

const RouteTitleText = styled.span`
  background-color: white;
  padding-right: 10px;
  margin-left: -10px;
`;

const renderLevel = (routes, onRouteEdit, onRouteDelete, index = 0) => {
  return (
    <React.Fragment>
      {_.map(routes, (item, key) => {
        const hasChildren = _.size(_.omit(item, ['children'])) > 0;
        const itemIndex = hasChildren ? index + 1 : index;

        return (
          <Wrapper open key={key} aria-label={`route-group-${key}`}>
            <RouteTitle>
              <RouteTitleText aria-label="route-group-header">
                /{key}
              </RouteTitleText>
            </RouteTitle>
            {hasChildren && (
              <Route
                routeItem={item}
                onRouteDelete={onRouteDelete}
                onRouteEdit={onRouteEdit}
              />
            )}
            {_.size(item.children) > 0 &&
              renderLevel(item.children, onRouteEdit, onRouteDelete, itemIndex)}
          </Wrapper>
        );
      })}
    </React.Fragment>
  );
};

export default function ({ routes, onRouteDelete, onRouteEdit }) {
  const groupedRoutes = useMemo(() => {
    // We need to order routes by route length. Otherwise, if a deeper router would appear
    // before a a shallower route, the shallow route would overwrite the deep route
    // when using _.set
    const orderedRoutes = _.orderBy(routes, (route) => {
      return route.route.split('/').length;
    });

    const routesObject = {};
    orderedRoutes.forEach((route) => {
      const paths = route.route.split('/');
      const routeDepth = paths.length;
      const parentPath = paths.slice(1, paths.length - 1);
      const lastLevel = paths[paths.length - 1];

      // routes with a depth lower than three are the first-level routes since all routes
      // start with a slash, so their split path becomes ['', 'path']
      if (routeDepth < 3) {
        routesObject[lastLevel] = {
          ...route,
          children: {}
        };
      } else {
        let pathToChild = [];
        parentPath.forEach((parent, index) => {
          const currentLevelPath = parentPath.slice(0, index + 1);
          const currentLevelPathWithChildren = [];
          currentLevelPath.forEach((path) => {
            currentLevelPathWithChildren.push(path, 'children');
          });
          pathToChild = currentLevelPathWithChildren;
        });
        _.set(routesObject, [...pathToChild, lastLevel], { ...route });
      }
    });

    return routesObject;
  }, [routes]);

  return (
    <div aria-label="routes-grouped">
      {renderLevel(groupedRoutes, onRouteEdit, onRouteDelete)}
    </div>
  );
}
