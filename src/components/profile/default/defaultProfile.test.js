import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { ContextProvider } from '../../context/ContextProvider';
import { DefaultProfile } from './index';

describe('defaultProfile should', () => {
  const defaultProps = {};

  const renderViewWrapper = (props = defaultProps) => {
    const wrapper = render(
      <div data-testid='container'>
        <ContextProvider>
          <DefaultProfile {...props} />
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
    expect(await screen.findAllByRole('button')).toHaveLength(2);
  });
  it('render login and register button', async () => {
    renderViewWrapper();
    expect(await screen.findByRole('button', { name: 'Login' }));
    expect(await screen.findByRole('button', { name: 'Register' }));
  });
  it('render login page on button click', async () => {
    renderViewWrapper();
    fireEvent.click(await screen.findByRole('button', { name: 'Login' }));
    expect(window.location.pathname).toMatch('/login');
  });
  it('render register page on button click', async () => {
    renderViewWrapper();
    fireEvent.click(await screen.findByRole('button', { name: 'Register' }));
    expect(window.location.pathname).toMatch('/signup');
  });
});
