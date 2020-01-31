import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { mount } from 'enzyme';
import {
  LoginForm,
  // eslint-disable-next-line no-unused-vars
  ILoginFormComponentProps,
} from './index';
import TestWithReduxStore from '../../fixtures/component/TestWithReduxStore';

jest.mock('axios');

describe('login.loginForm should', () => {
  /** @type {ILoginFormComponentProps} */
  const defaultProps = {};
  /** Create an enzyme+jest wrapper for the default version of the component.
   * (typically the redux connected version)
   *
   * @param {ILoginFormComponentProps} [props]
   */
  const renderDefaultWrapper = (props = defaultProps) => {
    const wrapper = mount(
      <TestWithReduxStore>
        <Router>
          <LoginForm {...props} />
        </Router>
      </TestWithReduxStore>
    );
    return wrapper.update();
  };
  it('render without crashing', () => {
    renderDefaultWrapper();
  });
  it('render 1 element', () => {
    const wrapper = renderDefaultWrapper();
    expect(wrapper.length).toBe(1);
  });
  it('render with valid props', () => {
    // Arrange
    /** @type {ILoginFormComponentProps} */
    const props = {
      handleSubmit: () => {},
      classes: {},
      error: {},
      email: 'test@test.com',
      handleChange: () => {},
      password: '1234',
      isLoading: false,
    };
    // Act
    const wrapper = renderDefaultWrapper(props);
    // Assert
    expect(wrapper.length).toBe(1);
  });
  it('renders with a clickable button', () => {
    // Arrange
    /** @type {ILoginFormComponentProps} */
    const props = {
      handleSubmit: () => {},
      classes: {},
      error: {},
      email: 'test@test.com',
      handleChange: () => {},
      password: '1234',
      isLoading: false,
    };
    const expected = 1;
    // Act
    const wrapper = renderDefaultWrapper(props);
    const actual = wrapper.find('button').length;
    // Assert
    expect(actual).toEqual(expected);
  });
});
