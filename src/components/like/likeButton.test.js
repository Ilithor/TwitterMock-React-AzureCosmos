import React from 'react';
import { render, screen } from '@testing-library/react';
import {
  LikeButton,
  // eslint-disable-next-line no-unused-vars
  ILikeButtonComponentProps,
} from './LikeButton';

describe('likeButton should', () => {
  /**  @type {ILikeButtonComponentProps} */
  const defaultProps = {};
  /** Create an testing-library wrapper for the UX version of the component.
   *
   * @param {ILikeButtonComponentProps} [props]
   */
  const renderViewWrapper = (props = defaultProps) => {
    const wrapper = render(<LikeButton {...props} />);
    return wrapper;
  };
  it('render without crashing', () => {
    renderViewWrapper();
  });
  it('render 1 element', async () => {
    renderViewWrapper();
    expect(await screen.findAllByRole('button')).toHaveLength(1);
  });
});
