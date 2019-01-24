import * as React from "react";
import { Route } from "../../types";
import { routes } from "../../config/routes.json";

export interface RoutesProps {
  onEdit: (route: Route) => void;
}

const buildLink = (route: string): string => {
  return `${process.env.REACT_APP_MOCKIT_SERVER_URL}${route}`;
};

const openRoute = (route: string) => {
  return () => {
    window.open(buildLink(route), "_blank");
  };
};

const Routes: React.SFC<RoutesProps> = (props: RoutesProps) => {
  const { onEdit = () => {} } = props;

  const editRoute = (item: Route) => {
    return (event: any) => {
      event.stopPropagation();
      onEdit(item);
    };
  };

  return (
    <>
      {routes.map(item => {
        const { delay = 0, route, statusCode, httpMethod } = item;
        return (
          <div className="columns">
            <div className="column is-full">
              <div className="route" onClick={openRoute(route)}>
                <nav className="level">
                  <div className="level-item has-text-centered">
                    <div>
                      <p className="heading">Route</p>

                      <p className="title is-size-6">{route}</p>
                    </div>
                  </div>

                  <div className="level-item has-text-centered">
                    <div>
                      <p className="heading">
                        Delay <i className="far fa-clock" />
                      </p>

                      <p className="title is-size-6">{delay} ms</p>
                    </div>
                  </div>

                  <div className="level-item has-text-centered">
                    <div>
                      <p className="heading">Status Code </p>

                      <p className="title is-size-6">{statusCode}</p>
                    </div>
                  </div>

                  <div className="level-item has-text-centered">
                    <div>
                      <p className="heading">HTTP</p>

                      <p className="title is-size-6">{httpMethod}</p>
                    </div>
                  </div>

                  <div className="level-item has-text-centered">
                    <div>
                      <p className="title is-size-4">
                        <i className="far fa-edit" onClick={editRoute(item as Route)} />

                        <i className="far fa-trash-alt" />
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
