import React from 'react';
import {
  render,
  fireEvent,
  waitForElementToBeRemoved,
} from '@testing-library/react';
import { NewPost } from './index';
import * as postApi from '../../../util/fetch/post';
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
    const { findAllByRole } = renderViewWrapper();
    expect(await findAllByRole('button')).toHaveLength(1);
  });
  it('render text field and simulates post', async () => {
    const expectedBody = 'test message';
    const { findByRole } = renderViewWrapper();
    fireEvent.click(await findByRole('button'));
    const textarea = await findByRole('textbox', {
      name: /new post/gi,
      exact: false,
    });
    fireEvent.change(textarea, { target: { value: expectedBody } });
    const spy = jest.spyOn(postApi, 'createPost');
    fireEvent.click(await findByRole('button', { name: /submit/i }));
    await waitForElementToBeRemoved(await findByRole('dialog')).then(() => {
      expect(spy).toBeCalledTimes(1);
      expect(spy).toBeCalledWith({ body: expectedBody });
    });
  });
});
