import React, { useState } from 'react';

import { updateSettings } from '../../utils/routes-api';

const SettingsModal = function ({
  onClose = () => {},
  onConfirm = () => {},
  heading,
  children,
  settings: applicationSettings = {}
} = {}) {
  const [settings, setSettings] = useState(applicationSettings);

  const {
    features: { chaosMonkey, cors, authentication, groupedRoutes } = {}
  } = settings;

  const setFeature = (feature, value) => {
    const newSettings = {
      ...settings
    };

    newSettings['features'][feature] = value;

    setSettings(newSettings);
  };

  const saveSettings = () => {
    try {
      updateSettings(settings).then(() => onClose());
    } catch (error) {
      console.log('Error');
    }
  };

  return (
    <>
      <div className="modal is-active" aria-label="Settings Modal">
        <div className="modal-background animated fadeIn faster" />
        <div className="modal-card animated fadeInDown faster">
          <header className="modal-card-head">
            <p className="modal-card-title">Settings</p>
            <button className="delete" aria-label="close" onClick={onClose} />
          </header>
          <section className="modal-card-body">
            <div className="field" aria-label="feature-basic-auth">
              <label className="label">Basic Authentication</label>
              <p className="mb10">
                Enable basic authentication on all routes. This can be
                configured with a username and password in the configuration
                file.
              </p>
              <div className="control">
                <input
                  id="basicAuthFeature"
                  type="checkbox"
                  name="basicAuthFeature"
                  className="switch is-primary"
                  checked={authentication}
                  onChange={(e) =>
                    setFeature('authentication', e.target.checked)
                  }
                  aria-label="feature-basic-auth-input"
                />
                <label htmlFor="basicAuthFeature">
                  Enable Basic Authentication
                </label>
              </div>
            </div>
            <hr />
            <div className="field" aria-label="feature-cors">
              <label className="label">CORS</label>
              <p className="mb10">
                Cross-origin resource sharing (CORS) is a mechanism that allows
                restricted resources on a web page to be requested from another
                domain outside the domain from which the first resource was
                served. This feature enables CORS for all routes.
              </p>
              <div className="control">
                <input
                  id="corsFeature"
                  type="checkbox"
                  name="corsFeature"
                  className="switch is-primary"
                  checked={cors}
                  onChange={(e) => setFeature('cors', e.target.checked)}
                  aria-label="feature-cors-input"
                />
                <label htmlFor="corsFeature">Enable CORS</label>
              </div>
            </div>
            <hr />
            <div className="field" aria-label="feature-chaos-monkey">
              <label className="label">Chaos Monkey</label>
              <p className="mb10">
                Unleash the monkey. The monkey will randomly take down end
                points and enforce failures on your routes.
              </p>
              <div className="control">
                <input
                  id="chaosMonkeyFeature"
                  type="checkbox"
                  name="chaosMonkeyFeature"
                  className="switch is-primary"
                  checked={chaosMonkey}
                  onChange={(e) => setFeature('chaosMonkey', e.target.checked)}
                  aria-label="feature-chaos-monkey-input"
                />
                <label htmlFor="chaosMonkeyFeature">Enable Monkey 🙊</label>
              </div>
            </div>
            <hr />
            <div className="field" aria-label="feature-grouped-routes">
              <label className="label">Group routes</label>
              <p className="mb10">
                With the ability to group routes, you can quickly hide a whole
                list of routes that share the same basepath.
              </p>
              <div className="control">
                <input
                  id="groupedRoutesFeature"
                  type="checkbox"
                  name="groupedRoutesFeature"
                  className="switch is-primary"
                  checked={groupedRoutes}
                  onChange={(e) =>
                    setFeature('groupedRoutes', e.target.checked)
                  }
                  aria-label="feature-grouped-routes-input"
                />
                <label htmlFor="groupedRoutesFeature">
                  Enable Grouped Routes
                </label>
              </div>
            </div>
          </section>

          <footer className="modal-card-foot">
            <button
              className="button is-primary"
              onClick={saveSettings}
              aria-label="save"
            >
              Save
            </button>
            <button className="button" onClick={onClose} aria-label="cancel">
              Cancel
            </button>
          </footer>
        </div>
      </div>
    </>
  );
};

export default SettingsModal;
