import React, { useState } from "react";
import useScrollReval from "./hooks/useScrollReveal";
import RouteList from "./components/RouteList";
import Logo from "./components/Logo";

import { buildRoute, deleteRoute } from "./utils/routes-api";

import RouteModal from "./components/RouteModal";
import SettingsModal from "./components/SettingsModal";
import ConfirmationDialog from "./components/ConfirmationDialog";

import { settings } from "./config/routes.json";

import "./scss/index.scss";

export default function() {
  useScrollReval([
    { selector: ".hero .title, .card, .subtitle " },
    { selector: ".route", options: { duration: 750, distance: "40px", easing: "cubic-bezier(0.5, -0.01, 0, 1.005)", interval: 64, origin: "bottom", viewFactor: 0.32 } }
  ]);

  const [selectedRoute, setSelectedRoute] = useState();
  const [routeToBeRemoved, setRouteToBeRemoved] = useState();
  const [settingsModalVisible, showSettingsModal] = useState(false);

  const { features: { chaosMonkey = false } = {} } = settings;

  return (
    <>
      <section className="hero is-info is-medium main-background">
        <nav>
          <div className="is-pulled-left">
            <h1>MockIt</h1>
          </div>
          <div className="is-pulled-right">
            <a className="button is-primary mr10" onClick={() => setSelectedRoute(buildRoute())}>
              <strong>Add Route</strong>
            </a>
            <a className="button is-info" onClick={() => showSettingsModal(true)}>
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
            <p className="chaos-monkey has-text-centered">
              <span role="img" aria-label="monkey">
                🐒
              </span>
            </p>
            <p className=" mb20 has-text-centered">The chaos monkey is enabled and causing havoc on all APIs...</p>
          </>
        )}

        <RouteList onRouteEdit={route => setSelectedRoute(route)} onRouteDelete={route => setRouteToBeRemoved(route)} />
      </main>
      <footer class="footer">
        <div class="content has-text-centered">
          <p>
            <strong>MockIt</strong> an OpenSource tool developed by{" "}
            <a href="https://github.com/boyney123" target="_blank" rel="noopener noreferrer">
              David Boyne
            </a>
          </p>
        </div>
      </footer>
    </>
  );
}
