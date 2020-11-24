// __tests__/fetch.test.js
import React from 'react';
import { render, fireEvent, cleanup } from 'react-testing-library';
import 'jest-dom/extend-expect';
import HeaderInput from './';

afterEach(cleanup);

describe('DoubleInput', () => {
  describe('renders', () => {
    it('two inputs one for the header and one for the value', () => {
      const { getByPlaceholderText } = render(<HeaderInput />);
      expect(getByPlaceholderText('header')).toBeVisible();
      expect(getByPlaceholderText('value')).toBeVisible();
    });

    it('two inputs are rendered with the given "header" and "value" data when given to the component', () => {
      const { getByPlaceholderText } = render(
        <HeaderInput
          data={{ id: 1, header: 'Content-Type', value: 'application/json' }}
        />
      );
      expect(getByPlaceholderText('header').value).toEqual('Content-Type');
      expect(getByPlaceholderText('value').value).toEqual('application/json');
    });
  });

  describe('props: events', () => {
    it('onBlur is called when both "header" and "value" have been entered', () => {
      const spy = jest.fn();
      const { getByPlaceholderText } = render(<HeaderInput onBlur={spy} />);
      fireEvent.change(getByPlaceholderText('header'), {
        target: { value: 'Content-Type' }
      });
      fireEvent.change(getByPlaceholderText('value'), {
        target: { value: 'application/json' }
      });
      expect(spy).toHaveBeenCalled();
    });

    it('onBlur is not called when "header" value is set but "value" is missing', () => {
      const spy = jest.fn();
      const { getByPlaceholderText } = render(<HeaderInput onBlur={spy} />);
      fireEvent.change(getByPlaceholderText('header'), {
        target: { value: 'Content-Type' }
      });
      expect(spy).not.toHaveBeenCalled();
    });

    it('onBlur is not called when "value" is set but the "header" value is not', () => {
      const spy = jest.fn();
      const { getByPlaceholderText } = render(<HeaderInput onBlur={spy} />);
      fireEvent.change(getByPlaceholderText('value'), {
        target: { value: 'application/json' }
      });
      expect(spy).not.toHaveBeenCalled();
    });

    it('onRemove is called with the headers id when the user clicks on the remove icon', () => {
      const spy = jest.fn();
      const data = { id: 1, header: 'Content-Type', value: 'application/json' };
      const { getByLabelText } = render(
        <HeaderInput data={data} onRemove={spy} />
      );
      fireEvent.click(getByLabelText('remove-header'));
      expect(spy).toHaveBeenCalledWith(1);
    });
  });
});
