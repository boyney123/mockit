import React from "react";

import Route from "../Route";

const Routes = function({ routes = [], onRouteEdit = () => {}, onRouteDelete = () => {} }) {
  return routes.map((route, key) => <Route routeItem={route} key={key} onRouteEdit={onRouteEdit} onRouteDelete={onRouteDelete} />);
};

export default Routes;
