import React from 'react';
import { render, screen } from '@testing-library/react';
import { ContextProvider } from '../../context/ContextProvider';
import {
  Post,
  // eslint-disable-next-line no-unused-vars
  IPostComponentProps,
} from './index';
import {
  dummyLikeList,
  dummyPostList,
  dummyUserList,
} from '../../../__mock__/api/data';

describe('post should', () => {
  /**  @type {IPostComponentProps} */
  const defaultProps = {};
  /** Create an testing-library wrapper for the UX version of the component.
   *
   * @param {IPostComponentProps} [props]
   */
  const renderViewWrapper = (props = defaultProps) => {
    const wrapper = render(
      <div data-testid='container'>
        <ContextProvider>
          <Post {...props} />
        </ContextProvider>
      </div>
    );
    return wrapper;
  };
  it('render without crashing', () => {
    renderViewWrapper();
  });
  it('render 1 element', async () => {
    const { rerender } = renderViewWrapper();
    rerender(
      <div data-testid='container'>
        <ContextProvider>
          <Post
            like={dummyLikeList[0]}
            post={dummyPostList[0]}
            user={dummyUserList[0]}
          />
        </ContextProvider>
      </div>
    );
    expect(await screen.findByText(dummyPostList[0].body, { exact: false }));
    expect(
      await screen.findAllByRole('button', {}, { timeout: 20000 })
    ).toHaveLength(3);
  });
});
