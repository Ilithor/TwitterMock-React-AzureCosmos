import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { mount } from 'enzyme';
import ConnectedUserProfileDisplay, {
  // eslint-disable-next-line no-unused-vars
  IUserProfileDisplayComponentProps,
} from './index';
import TestWithReduxStore from '../../../../fixtures/component/TestWithReduxStore';

jest.mock('axios');

describe('user.userProfileDisplay should', () => {
  /** @type {IUserProfileDisplayComponentProps} */
  const defaultProps = {};
  /** Create an enzyme+jest wrapper for the default version of the component.
   * (typically the redux connected version)
   *
   * @param {IUserProfileDisplayComponentProps} [props]
   */
  const renderDefaultWrapper = (props = defaultProps) => {
    const wrapper = mount(
      <TestWithReduxStore>
        <Router>
          <ConnectedUserProfileDisplay {...props} />
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
    /** @type {IUserProfileDisplayComponentProps} */
    const props = {
      classes: {},
      handle: 'user',
      bio: {},
      createdAt: '01/01/1969',
    };
    // Act
    const wrapper = renderDefaultWrapper(props);
    // Assert
    expect(wrapper.length).toBe(1);
  });
  it('renders with a clickable button', () => {
    // Arrange
    /** @type {IUserProfileDisplayComponentProps} */
    const props = {
      classes: {},
      handle: 'user',
      bio: {},
      createdAt: '01/01/1969',
    };
    const expected = 3;
    // Act
    const wrapper = renderDefaultWrapper(props);
    const actual = wrapper.find('button').length;
    // Assert
    expect(actual).toEqual(expected);
  });
});
