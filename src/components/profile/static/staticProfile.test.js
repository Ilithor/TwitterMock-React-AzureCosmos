import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { ContextProvider } from '../../context/ContextProvider';
import { StaticProfile } from './index';

describe('staticProfile should', () => {
  const defaultProps = {};
  const fakeUserData = {
    createdAt: new Date('2019-10-16T21:00:38.249+00:00'),
    userImage: '',
    userHandle: 'Derp',
    aboutMe: 'Derp',
    location: 'Derpington, DP',
    website: 'www.derp.com',
  };
  const renderViewWrapper = (props = defaultProps) => {
    const wrapper = render(
      <div data-testid='container'>
        <ContextProvider>
          <StaticProfile {...props} />
        </ContextProvider>
      </div>
    );
    return wrapper;
  };
  it('render without crashing', () => {
    renderViewWrapper();
  });
  // it('render 1 element', async () => {
  //   renderViewWrapper(fakeUserData);
  //   expect(
  //     await screen.findAllByRole('button', {}, { timeout: 20000 })
  //   ).toHaveLength(1);
  // });
});
