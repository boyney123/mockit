import React, { useMemo } from "react";
import _ from "lodash";
import styled from "styled-components";
import Route from "./Route";

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
    content: " ";
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

const Routes = function({ routes, ...props }) {
  const groupedRoutes = useMemo(() => {
    // This function takes all the routes and groupes them by paths.
    // Parent routes get a children object containing their direct children.
    // Children in their turn can also have children.
    //
    // An example of grouped routes would be
    // {
    //   user: {
    //     id: "1f4dfdf3-5712-48b7-9310-6314f8ee2adc",
    //     route: "/user",
    //     payload: {
    //       httpMethod: "get",
    //       newRoute: true,
    //       Money: 100
    //     },
    //     httpMethod: "POST",
    //     statusCode: "201",
    //     delay: "500",
    //     children: {
    //       login: {
    //         id: "1f4dfdf3-5712-48b7-9310-6314f8ee2adc",
    //         route: "/user/get/it/now",
    //         payload: {
    //           httpMethod: "get",
    //           newRoute: true,
    //           Money: 100
    //         },
    //         httpMethod: "POST",
    //         statusCode: "201",
    //         delay: "500"
    //       }
    //     }
    //   },
    //   fruit: {
    //     id: "1f4dfdf3-5712-48b7-9310-6314f8ee2add",
    //     route: "/fruit",
    //     payload: {
    //       httpMethod: "get",
    //       newRoute: true,
    //       Money: 100
    //     },
    //     httpMethod: "POST",
    //     statusCode: "201",
    //     delay: "0",
    //     disabled: true,
    //     children: {}
    //   },
    //   cart: {
    //     children: {
    //       purchase: {
    //         children: {
    //           vise: {
    //             id: "1f4dfdf3-5712-48b7-9310-6314f8ee2add",
    //             route: "/nothing/more/deleted",
    //             payload: {
    //               httpMethod: "get",
    //               newRoute: true,
    //               Money: 100
    //             },
    //             httpMethod: "POST",
    //             statusCode: "201",
    //             delay: "0"
    //           }
    //         }
    //       }
    //     }
    //   }
    // }

    // We need to order routes by route length. Otherwise, if a deeper router would appear
    // before a a shallower route, the shallow route would overwrite the deep route
    // when using _.set
    const orderedRoutes = _.orderBy(routes, route => {
      return route.route.split("/").length;
    });

    const routesObject = {};
    orderedRoutes.forEach(route => {
      const paths = route.route.split("/");
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
          currentLevelPath.forEach(path => {
            currentLevelPathWithChildren.push(path, "children");
          });
          pathToChild = currentLevelPathWithChildren;
        });
        _.set(routesObject, [...pathToChild, lastLevel], { ...route });
      }
    });

    return routesObject;
  }, [routes]);

  const renderLevel = (routes, index) => {
    return (
      <React.Fragment>
        {_.map(routes, (item, key) => {
          if (_.size(_.omit(item, ["children"])) > 0) {
            return (
              <Wrapper open key={key}>
                <RouteTitle>
                  <RouteTitleText>/{key}</RouteTitleText>
                </RouteTitle>
                <Route routeItem={item} {...props} />
                {_.size(item.children) > 0 &&
                  renderLevel(item.children, index + 1)}
              </Wrapper>
            );
          }

          return (
            <Wrapper open key={key}>
              <RouteTitle>
                <RouteTitleText>/{key}</RouteTitleText>
              </RouteTitle>
              {_.size(item.children) > 0 && renderLevel(item.children, index)}
            </Wrapper>
          );
        })}
      </React.Fragment>
    );
  };

  return (
    <React.Fragment>
      {routes.length === 0 ? (
        <p className="no-routes has-text-centered">
          No routes found. Click "Add Route" to get started.
        </p>
      ) : (
        renderLevel(groupedRoutes, 0)
      )}
    </React.Fragment>
  );
};

export default Routes;
