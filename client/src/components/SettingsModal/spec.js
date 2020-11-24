// __tests__/fetch.test.js
import React from 'react';
import { render, fireEvent, cleanup } from 'react-testing-library';
import 'jest-dom/extend-expect';
import SettingsDialog from './';
import * as utils from '../../utils/routes-api';

afterEach(cleanup);

jest.mock('../../utils/routes-api', () => {
  return { updateSettings: jest.fn() };
});

describe('Settings Dialog', () => {
  describe('renders', () => {
    it('with a header', () => {
      const { getByText } = render(<SettingsDialog />);
      expect(getByText('Settings')).toBeVisible();
    });
  });

  describe('features', () => {
    describe('Basic Auth', () => {
      it('renders the feature with an input', () => {
        const { getByLabelText } = render(<SettingsDialog />);
        expect(getByLabelText('feature-basic-auth')).toBeVisible();
        expect(getByLabelText('feature-basic-auth-input')).toBeVisible();
      });

      it('clicking on the feature enables basic authenication and updates the input value', () => {
        const { getByLabelText } = render(<SettingsDialog />);

        expect(getByLabelText('feature-basic-auth-input').checked).toEqual(
          false
        );
        fireEvent.change(getByLabelText('feature-basic-auth-input'), {
          target: { checked: true }
        });
        expect(getByLabelText('feature-basic-auth-input').checked).toEqual(
          true
        );
      });
    });
    describe('CORS', () => {
      it('renders the feature with an input', () => {
        const { getByLabelText } = render(<SettingsDialog />);
        expect(getByLabelText('feature-cors')).toBeVisible();
        expect(getByLabelText('feature-cors-input')).toBeVisible();
      });

      it('clicking on the feature enables basic authenication and updates the input value', () => {
        const { getByLabelText } = render(<SettingsDialog />);

        expect(getByLabelText('feature-cors-input').checked).toEqual(true);
        fireEvent.change(getByLabelText('feature-cors-input'), {
          target: { checked: false }
        });
        expect(getByLabelText('feature-cors-input').checked).toEqual(false);
      });
    });
    describe('Chaos Monkey', () => {
      it('renders the feature with an input', () => {
        const { getByLabelText } = render(<SettingsDialog />);
        expect(getByLabelText('feature-chaos-monkey')).toBeVisible();
        expect(getByLabelText('feature-chaos-monkey-input')).toBeVisible();
      });

      it('clicking on the feature enables basic authenication and updates the input value', () => {
        const { getByLabelText } = render(<SettingsDialog />);

        expect(getByLabelText('feature-chaos-monkey-input').checked).toEqual(
          false
        );
        fireEvent.change(getByLabelText('feature-chaos-monkey-input'), {
          target: { checked: true }
        });
        expect(getByLabelText('feature-chaos-monkey-input').checked).toEqual(
          true
        );
      });
    });
    describe('Grouped Routes', () => {
      it('renders the feature with an input', () => {
        const { getByLabelText } = render(<SettingsDialog />);
        expect(getByLabelText('feature-grouped-routes')).toBeVisible();
        expect(getByLabelText('feature-grouped-routes-input')).toBeVisible();
      });

      it('clicking on the feature enables grouped routes and updates the input value', () => {
        const { getByLabelText } = render(<SettingsDialog />);

        expect(getByLabelText('feature-grouped-routes-input').checked).toEqual(
          false
        );
        fireEvent.change(getByLabelText('feature-grouped-routes-input'), {
          target: { checked: true }
        });
        expect(getByLabelText('feature-grouped-routes-input').checked).toEqual(
          true
        );
      });
    });
  });

  describe('saving settings', () => {
    it('clicking save settings makes a request to update the users settings', () => {
      const { getByLabelText } = render(<SettingsDialog />);
      fireEvent.click(getByLabelText('save'));
      expect(utils.updateSettings).toHaveBeenCalled();
    });
  });

  describe('props', () => {
    describe('onClose', () => {
      it('is called when closing the modal dialog using the close button', () => {
        const spy = jest.fn();
        const { getByLabelText } = render(<SettingsDialog onClose={spy} />);
        fireEvent.click(getByLabelText('close'));
        expect(spy).toHaveBeenCalled();
      });
      it('is called when clicking the cancel button', () => {
        const spy = jest.fn();
        const { getByLabelText } = render(<SettingsDialog onClose={spy} />);
        fireEvent.click(getByLabelText('cancel'));
        expect(spy).toHaveBeenCalled();
      });
    });
  });
});
