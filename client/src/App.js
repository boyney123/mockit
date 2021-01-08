import React, { useState, useEffect, useCallback } from 'react';
import useScrollReval from './hooks/useScrollReveal';
import RouteListStack from './components/RouteListStack';
import RouteListGroup from './components/RouteListGroup';
import Logo from './components/Logo';
import { version } from '../package.json';

import {buildRoute, deleteRoute, getRoutes} from './utils/routes-api';

import RouteModal from './components/RouteModal';
import SettingsModal from './components/SettingsModal';
import ConfirmationDialog from './components/ConfirmationDialog';

import './scss/index.scss';

export default function ({ settings: propSettings, customRoutes }) {
  useScrollReval([{ selector: '.hero .title, .card, .subtitle ' }]);

  const [selectedRoute, setSelectedRoute] = useState(null);
  const [routeToBeRemoved, setRouteToBeRemoved] = useState(null);
  const [settingsModalVisible, showSettingsModal] = useState(false);
  const [routes, setRoutes] = useState(customRoutes || []);
  const [settings, setSettings] = useState(propSettings || {});

  useEffect(() => {
    if (selectedRoute === null && routeToBeRemoved === null && settingsModalVisible === false && (!propSettings || !customRoutes)) {
      getRoutes().then((response) => {
        !propSettings && setSettings(response.settings);
        !customRoutes && setRoutes(response.routes);
      })
    }
  }, [selectedRoute, routeToBeRemoved, settingsModalVisible])

  const onRemoveConfirmation = useCallback(() => {
    deleteRoute(routeToBeRemoved).then(() => setRouteToBeRemoved(null))
  });

  const onRemoveClose = useCallback(() => setRouteToBeRemoved(null));

  const onSettingsClose = useCallback(() => showSettingsModal(false));

  const { features: { chaosMonkey = false, groupedRoutes = false } = {} } = settings;

  return (
    <>
      <section className="hero is-info is-medium main-background">
        <nav>
          <div className="is-pulled-left">
            <h1>MockIt</h1>
          </div>
          <div className="is-pulled-right">
            <a
              className="button is-primary mr10"
              aria-label="Add Route"
              onClick={() => setSelectedRoute(buildRoute())}
            >
              <strong>Add Route</strong>
            </a>
            <a
              className="button is-info"
              aria-label="Settings"
              onClick={() => showSettingsModal(true)}
            >
              <strong>Settings</strong>
            </a>
          </div>
        </nav>

        <div className="hero-body">
          <div className="container has-text-centered">
            <Logo />
            <p className="subtitle">
              A tool to quickly mock out end points, setup delays and more...
            </p>
          </div>
        </div>
      </section>

      {selectedRoute && (
        <RouteModal
          route={selectedRoute}
          onClose={() => setSelectedRoute(null)}
        />
      )}

      {routeToBeRemoved && (
        <ConfirmationDialog
          heading={`Delete Route`}
          onConfirm={onRemoveConfirmation}
          onClose={onRemoveClose}
        >
          <p>
            Are you sure you want to delete the route :{' '}
            <strong>{routeToBeRemoved.route}</strong> ?
          </p>
        </ConfirmationDialog>
      )}

      {settingsModalVisible && (
        <SettingsModal onClose={onSettingsClose} settings={settings} />
      )}

      <main>
        {chaosMonkey && (
          <>
            <p
              className="chaos-monkey has-text-centered"
              aria-label="Chaos Monkey Feature"
            >
              <span role="img" aria-label="monkey">
                🐒
              </span>
            </p>
            <p className=" mb20 has-text-centered">
              The chaos monkey is enabled and causing havoc on all APIs...
            </p>
          </>
        )}
        {routes.length === 0 && (
          <p aria-label="no-routes" className="no-routes has-text-centered">
            No routes found. Click "Add Route" to get started.
          </p>
        )}

        {groupedRoutes ? (
          <RouteListGroup
            routes={routes}
            onRouteEdit={setSelectedRoute}
            onRouteDelete={setRouteToBeRemoved}
          />
        ) : (
          <RouteListStack
            routes={routes}
            onRouteEdit={setSelectedRoute}
            onRouteDelete={setRouteToBeRemoved}
          />
        )}
      </main>
      <footer className="footer" aria-label="Site footer">
        <div className="content has-text-centered">
          <p>
            <a
              href="https://github.com/boyney123/mockit"
              target="_blank"
              rel="noopener noreferrer"
            >
              <strong>MockIt v{version} </strong>
            </a>{' '}
            an OpenSource tool developed by{' '}
            <a
              href="https://github.com/boyney123"
              aria-label="Github Repo"
              target="_blank"
              rel="noopener noreferrer"
            >
              David Boyne
            </a>
          </p>
        </div>
      </footer>
    </>
  );
}
