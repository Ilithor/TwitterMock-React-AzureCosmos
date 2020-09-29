import '@testing-library/jest-dom/extend-expect';
import './__mock__/api/mockServiceWorker';

beforeAll(() => {
  jest.setTimeout(25000);
});
