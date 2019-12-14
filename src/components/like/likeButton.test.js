import React from 'react';
import { mount } from 'enzyme';
import ConnectedLikeButton, {
  LikeButton,
  // eslint-disable-next-line no-unused-vars
  ILikeButtonComponentProps,
} from './LikeButton';
import TestWithReduxStore from '../../fixtures/component/TestWithReduxStore';

jest.mock('axios');

describe('like.likeButton should', () => {
  /**  @type {ILikeButtonComponentProps} */
  const defaultProps = {};
  /** Create an enzyme+jest wrapper for the default version of the component.
   * (typically the redux connected version)
   *
   * @param {ILikeButtonComponentProps} [props]
   */
  const renderDefaultWrapper = (props = defaultProps) => {
    const wrapper = mount(
      <TestWithReduxStore>
        <ConnectedLikeButton {...props} />
      </TestWithReduxStore>
    );
    return wrapper.update();
  };
  /** Create an enzyme+jest wrapper for the UX version of the component.
   *
   * @param {ILikeButtonComponentProps} [props]
   */
  const renderViewWrapper = (props = defaultProps) => {
    const wrapper = mount(<LikeButton {...props} />);
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
    /** @type {ILikeButtonComponentProps} */
    const props = {
      postId: '1',
      getLikePost: () => {},
    };
    // Act
    const wrapper = renderDefaultWrapper(props);
    // Assert
    expect(wrapper.length).toBe(1);
  });

  it('renders with a clickable button', () => {
    // Arrange
    /** @type {ILikeButtonComponentProps} */
    const props = {
      postId: '131290129043',
      getLikePost: () => {},
    };
    const expected = 1;
    // Act
    const wrapper = renderDefaultWrapper(props);
    const actual = wrapper.find('button').length;
    // Assert
    expect(actual).toEqual(expected);
  });

  it('pass the correct post id to the like fn (view component)', () => {
    // Arrange
    let actual;
    /** @type {ILikeButtonComponentProps} */
    const props = {
      postId: '131290129043',
      getLikePost: response => {
        actual = response;
      },
    };
    const expected = props.postId;
    // Act
    const wrapper = renderViewWrapper(props);

    wrapper.find('button').simulate('click');

    // Assert
    expect(actual).toEqual(expected);
  });
});
