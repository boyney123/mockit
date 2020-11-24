// __tests__/fetch.test.js
import React from 'react';
import { render, fireEvent, cleanup } from 'react-testing-library';
import 'jest-dom/extend-expect';
import ConfirmationDialog from './';

afterEach(cleanup);

describe('Confirmation Dialog', () => {
  describe('renders', () => {
    it('a header with the given header value', () => {
      const { getByText } = render(
        <ConfirmationDialog heading="Test Header" />
      );
      expect(getByText('Test Header')).toBeVisible();
    });

    it('any given children inside the modal dialog', () => {
      const { getByTestId } = render(
        <ConfirmationDialog heading="Test Header">
          <h1 data-testid="my-child-example">test</h1>
        </ConfirmationDialog>
      );
      expect(getByTestId('my-child-example')).toBeVisible();
    });

    it('a delete and cancel button', () => {
      const { getByLabelText } = render(
        <ConfirmationDialog heading="Test Header" />
      );
      expect(getByLabelText('Delete')).toBeVisible();
      expect(getByLabelText('Cancel')).toBeVisible();
    });
  });

  describe('props', () => {
    describe('onClose', () => {
      it('is called when closing the modal dialog using the close button', () => {
        const spy = jest.fn();
        const { getByLabelText } = render(
          <ConfirmationDialog heading="Test Header" onClose={spy} />
        );
        fireEvent.click(getByLabelText('close'));
        expect(spy).toHaveBeenCalled();
      });
      it('is called when clicking the cancel button', () => {
        const spy = jest.fn();
        const { getByLabelText } = render(
          <ConfirmationDialog heading="Test Header" onClose={spy} />
        );
        fireEvent.click(getByLabelText('Cancel'));
        expect(spy).toHaveBeenCalled();
      });
    });
    describe('onConfirm', () => {
      it('is called when clicking the delete button', () => {
        const spy = jest.fn();
        const { getByLabelText } = render(
          <ConfirmationDialog heading="Test Header" onConfirm={spy} />
        );
        fireEvent.click(getByLabelText('Delete'));
        expect(spy).toHaveBeenCalled();
      });
    });
  });
});
