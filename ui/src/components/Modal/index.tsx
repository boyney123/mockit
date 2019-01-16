import * as React from "react";

import JSONInput from "react-json-editor-ajrm";

import { Route } from "../../types";

const server = `${process.env.REACT_APP_MOCKIT_API_URL}/routes`;

const buildLink = (route: string): string => {
  return `${process.env.REACT_APP_MOCKIT_SERVER_URL}${route}`;
};

export interface ModalProps {
  route: Route;
  onClose: any;
}

interface JSONInputEvent {
  jsObject: any;
  error: any;
}

interface ModalState {
  route: Route;
}

function isJSONEvent(arg: any): arg is JSONInputEvent {
  return arg.jsObject !== undefined;
}

export default class extends React.Component<ModalProps, ModalState> {
  constructor(props: ModalProps) {
    super(props);
    this.state = {
      route: props.route
    };

    this.updateRoute = this.updateRoute.bind(this);
    this.saveChanges = this.saveChanges.bind(this);
  }

  updateRoute(prop: string) {
    return (e: React.FormEvent<HTMLInputElement> | React.FormEvent<HTMLSelectElement> | JSONInputEvent) => {
      if (isJSONEvent(e) && e.error) {
        return;
      }

      let value = isJSONEvent(e) ? e.jsObject : e.currentTarget.value;

      const { route } = this.state;

      if (prop === "route") {
        value = `/${value}`;
      }

      this.setState({
        route: {
          ...route,
          [prop]: value
        }
      });
    };
  }

  async saveChanges() {
    try {
      const payload = JSON.stringify(this.state.route);

      const response = await fetch(server, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: payload
      });
      console.log("Done", response);
    } catch (error) {
      console.log("Error", error);
    }
  }

  render() {
    const { route: item } = this.state;
    const { route, delay, httpMethod, statusCode, payload } = item;

    let cleanedRoute = route;

    if (route.charAt(0) == "/") {
      cleanedRoute = route.substr(1, route.length);
    }

    return (
      <div className="modal is-active">
        <div className="modal-background animated fadeIn faster" />
        <div className="modal-card animated fadeInDown faster">
          <header className="modal-card-head">
            <p className="modal-card-title">Edit Route</p>
            <button className="delete" aria-label="close" onClick={this.props.onClose} />
          </header>
          <section className="modal-card-body">
            <div className="field">
              <label className="label">Route</label>
              <div className="control has-icons-left">
                <input className="input" type="text" placeholder="Text input" value={cleanedRoute} onChange={this.updateRoute("route")} />
                <span className="icon is-small is-left">/</span>
              </div>
            </div>
            <div className="field-body">
              <div className="field">
                <label className="label">HTTP Method</label>
                <div className="control">
                  <div className="select">
                    <select>
                      <option value="get">{httpMethod}</option>
                    </select>
                  </div>
                </div>
              </div>
              <div className="field">
                <label className="label">Status Code</label>
                <div className="control">
                  <div className="select">
                    <select>
                      <option value="201">{statusCode}</option>
                    </select>
                  </div>
                </div>
              </div>
              <div className="field">
                <label className="label">Delay</label>
                <div className="control">
                  <div className="select">
                    <select value={delay} onChange={this.updateRoute("delay")}>
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
            <div className="field">
              <label className="label">Response</label>
              <div className="control">
                <JSONInput id="a_unique_id" placeholder={payload} onChange={this.updateRoute("payload")} height="120px" width="100%" />
              </div>
            </div>
          </section>
          <footer className="modal-card-foot">
            <button className="button is-success" onClick={this.saveChanges}>
              Save changes
            </button>
            <button className="button" onClick={this.props.onClose}>
              Cancel
            </button>
          </footer>
        </div>
      </div>
    );
  }
}
