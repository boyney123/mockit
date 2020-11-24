import React from 'react';

import Route from '../Route';

const Routes = function ({
  routes = [],
  onRouteEdit = () => {},
  onRouteDelete = () => {}
}) {
  return (
    <div aria-label="routes-stacked">
      {routes.map((route, key) => (
        <Route
          routeItem={route}
          key={key}
          onRouteEdit={onRouteEdit}
          onRouteDelete={onRouteDelete}
        />
      ))}
    </div>
  );
};

export default Routes;
