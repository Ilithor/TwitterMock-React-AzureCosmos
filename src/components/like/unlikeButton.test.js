import React from 'react';
import { render, screen } from '@testing-library/react';
import {
  UnlikeButton,
  // eslint-disable-next-line no-unused-vars
  IUnlikeButtonComponentProps,
} from './UnlikeButton';

describe('unlikeButton should', () => {
  /**  @type {IUnlikeButtonComponentProps} */
  const defaultProps = {};
  /** Create an testing-library wrapper for the UX version of the component.
   *
   * @param {IUnlikeButtonComponentProps} [props]
   */
  const renderViewWrapper = (props = defaultProps) => {
    const wrapper = render(<UnlikeButton {...props} />);
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
