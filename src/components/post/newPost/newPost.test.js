import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { NewPost } from './index';
import { createPost } from '../../../util/fetch/post';
import { ContextProvider } from '../../context/ContextProvider';

describe('newPost should', () => {
  const defaultProps = {};
  const renderViewWrapper = (props = defaultProps) => {
    const wrapper = render(
      <div data-testid='container'>
        <ContextProvider>
          <NewPost {...props} />
        </ContextProvider>
      </div>
    );
    return wrapper;
  };
  it('render without crashing', () => {
    renderViewWrapper();
  });
  it('render 1 element', async () => {
    renderViewWrapper();
    expect(await screen.findAllByRole('button')).toHaveLength(1);
  });
  it('render text field', async () => {
    renderViewWrapper();
    fireEvent.click(await screen.findByRole('button'));
    fireEvent.change(
      await screen.findByRole('textarea', { name: 'body' }),
      'test'
    );
    const spy = jest.spyOn(createPost);
    fireEvent.click(await screen.findByRole('submit'));
    expect(spy).toBeCalledTimes(1);
    expect(spy).toBeCalledWith({});
  });
});
