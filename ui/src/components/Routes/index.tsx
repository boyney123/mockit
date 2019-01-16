import * as React from "react";

import { Route } from "../../types";

import { routes } from "../../config/routes.json";

const buildLink = (route: string): string => {
  return `${process.env.REACT_APP_SERVER_URL}${route}`;
};

export interface RoutesProps {
  onEdit: (route: Route) => void;
}

export default class extends React.Component<RoutesProps, {}> {
  editRoute(item: Route): any {
    return (event: any) => {
      event.stopPropagation();
      this.props.onEdit(item);
    };
  }

  openRoute(route: string) {
    return (event: any) => {
      window.open(buildLink(route), "_blank");
    };
  }

  render() {
    routes as Array<Route>;

    const { onEdit = () => {} } = this.props;

    return routes.map(item => {
      const { delay = 0, route, statusCode, httpMethod } = item;

      return (
        <div className="columns">
          <div className="column is-full">
            <div className="route" onClick={this.openRoute(route)}>
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
                      <i className="far fa-edit" onClick={this.editRoute(item as Route)} />

                      <i className="far fa-trash-alt" />
                    </p>
                  </div>
                </div>
              </nav>

              {/* <header className="card-header">
        
                       <a href={buildLink(route.route)} target="_blank" className="card-header-title">
        
                         <span>{route.route}</span>
        
                       </a>
        
                       <div className="icon">something</div>
        
                     </header> */}

              {/* <div className="card-content">
        
                       <div className="content">test data</div>
        
                     </div>
        
                     <footer className="card-footer">
        
                       <a className="card-footer-item">Edit</a>
        
                       <a className="card-footer-item">Delete</a>
        
                     </footer> */}
            </div>
          </div>
        </div>
      );
    });
  }
}

// class Routes extends Component {
//   render() {
//     return routes.map(item => {
//       const { delay = 0, route, statusCode, httpMethod } = item;

//       return (
//         <div className="columns">
//           <div className="column is-full">
//             <div className="route" onClick={() => window.open(buildLink(route), "_blank")}>
//               <nav className="level">
//                 <div className="level-item has-text-centered">
//                   <div>
//                     <p className="heading">Route</p>
//                     <p className="title is-size-6">{route}</p>
//                   </div>
//                 </div>

//                 <div className="level-item has-text-centered">
//                   <div>
//                     <p className="heading">
//                       Delay <i className="far fa-clock" />
//                     </p>
//                     <p className="title is-size-6">{delay} ms</p>
//                   </div>
//                 </div>

//                 <div className="level-item has-text-centered">
//                   <div>
//                     <p className="heading">Status Code </p>
//                     <p className="title is-size-6">{statusCode}</p>
//                   </div>
//                 </div>
//                 <div className="level-item has-text-centered">
//                   <div>
//                     <p className="heading">HTTP</p>
//                     <p className="title is-size-6">{httpMethod}</p>
//                   </div>
//                 </div>
//                 <div className="level-item has-text-centered">
//                   <div>
//                     <p className="title is-size-5">
//                       <i className="far fa-edit" />
//                       <i className="far fa-trash-alt" />
//                     </p>
//                   </div>
//                 </div>
//               </nav>
//               {/* <header className="card-header">
//               <a href={buildLink(route.route)} target="_blank" className="card-header-title">
//                 <span>{route.route}</span>
//               </a>
//               <div className="icon">something</div>
//             </header> */}

//               {/* <div className="card-content">
//               <div className="content">test data</div>
//             </div>
//             <footer className="card-footer">
//               <a className="card-footer-item">Edit</a>
//               <a className="card-footer-item">Delete</a>
//             </footer> */}
//             </div>
//           </div>
//         </div>
//       );
//     });
//   }
// }

// export default Routes;
