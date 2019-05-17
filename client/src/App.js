import React, { useState } from "react";
import useScrollReval from "./hooks/useScrollReveal";
import RouteList from "./components/RouteList";
import Logo from "./components/Logo";

import { buildRoute, deleteRoute } from "./utils/routes-api";

import RouteModal from "./components/RouteModal";
import SettingsModal from "./components/SettingsModal";
import ConfirmationDialog from "./components/ConfirmationDialog";

import { settings, routes } from "./config/routes.json";

import "./scss/index.scss";

export default function({ settings: propSettings }) {
  useScrollReval([{ selector: ".hero .title, .card, .subtitle " }]);

  const [selectedRoute, setSelectedRoute] = useState();
  const [routeToBeRemoved, setRouteToBeRemoved] = useState();
  const [settingsModalVisible, showSettingsModal] = useState(false);

  const { features: { chaosMonkey = false } = {} } = propSettings || settings;

  return (
    <>
      <section className="hero is-info is-medium main-background">
        <nav>
          <div className="is-pulled-left">
            <h1>MockIt</h1>
          </div>
          <div className="is-pulled-right">
            <a className="button is-primary mr10" aria-label="Add Route" onClick={() => setSelectedRoute(buildRoute())}>
              <strong>Add Route</strong>
            </a>
            <a className="button is-info" aria-label="Settings" onClick={() => showSettingsModal(true)}>
              <strong>Settings</strong>
            </a>
          </div>
        </nav>

        <div className="hero-body">
          <div className="container has-text-centered">
            <Logo />
            <p className="subtitle">A tool to quickly mock out end points, setup delays and more...</p>
          </div>
        </div>
      </section>

      {selectedRoute && <RouteModal route={selectedRoute} onClose={() => setSelectedRoute(null)} />}

      {routeToBeRemoved && (
        <ConfirmationDialog heading={`Delete Route`} onConfirm={() => deleteRoute(routeToBeRemoved)} onClose={() => setRouteToBeRemoved(null)}>
          <p>
            Are you sure you want to delete the route : <strong>{routeToBeRemoved.route}</strong> ?
          </p>
        </ConfirmationDialog>
      )}

      {settingsModalVisible && <SettingsModal onClose={() => showSettingsModal(false)} />}

      <main>
        {chaosMonkey && (
          <>
            <p className="chaos-monkey has-text-centered" aria-label="Chaos Monkey Feature">
              <span role="img" aria-label="monkey">
                🐒
              </span>
            </p>
            <p className=" mb20 has-text-centered">The chaos monkey is enabled and causing havoc on all APIs...</p>
          </>
        )}

        <RouteList routes={routes} onRouteEdit={route => setSelectedRoute(route)} onRouteDelete={route => setRouteToBeRemoved(route)} />
      </main>
      <footer className="footer" aria-label="Site footer">
        <div className="content has-text-centered">
          <p>
            <a href="https://github.com/boyney123/mockit" target="_blank" rel="noopener noreferrer">
              <strong>MockIt </strong>
            </a>{" "}
            an OpenSource tool developed by{" "}
            <a href="https://github.com/boyney123" aria-label="Github Repo" target="_blank" rel="noopener noreferrer">
              David Boyne
            </a>
          </p>
        </div>
      </footer>
    </>
  );
}
