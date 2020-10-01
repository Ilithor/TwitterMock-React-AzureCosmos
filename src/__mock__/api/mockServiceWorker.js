import { rest } from 'msw';
import { setupServer } from 'msw/node';
import { act } from '@testing-library/react';
import {
  dummyUserList,
  dummyLikeList,
  dummyNotificationList,
  dummyPostList,
  dummyCommentList,
} from './data';
const debug = true;

const respondWithData = data => (req, res, ctx) =>
  new Promise(r => {
    debug && console.log(JSON.stringify(req.url));
    act(() => {
      r(res(ctx.delay(15), ctx.status(200), ctx.json(data)));
    });
  });

/** @type {import('msw/lib/types/setupWorker/glossary').RequestHandlersList} */
const handlers = [
  rest.get(/\/user\/:userHandle/, (req, res, ctx) => {
    const { userHandle } = req.params;
    return respondWithData(
      dummyUserList.find(user => user.userHandle === userHandle)
    );
  }),
  rest.get(/\/user\/list/, respondWithData(dummyUserList)),
  rest.get(/\/user\/like/, respondWithData(dummyLikeList)),
  rest.get(/\/user\/notification/, respondWithData(dummyNotificationList)),
  rest.get(/\/post/, respondWithData(dummyPostList)),
  rest.get(/\/post\/:postId/, (req, res, ctx) => {
    const { postId } = req.params;
    return respondWithData(dummyPostList.find(post => post.postId === postId));
  }),
  rest.get(/\/post\/comment/, respondWithData(dummyCommentList)),
  rest.post(/\/post/, respondWithData()),
];

const server = setupServer(...handlers);

beforeAll(() =>
  server.listen({
    onUnhandledRequest: 'error',
  })
);
afterEach(() => {
  server.resetHandlers();
});
afterAll(() => {
  server.close();
});
