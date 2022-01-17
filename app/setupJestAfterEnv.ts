import 'cross-fetch/polyfill';
//import { fetch, Headers, Request, Response } from 'cross-fetch';
import '@testing-library/jest-native/extend-expect';
import { server } from '../mocks/server';

// global.fetch = fetch;
// global.Headers = Headers;
// global.Request = Request;
// global.Response = Response;

beforeAll(() => server.listen(/*{ onUnhandledRequest: 'error' }*/));
afterEach(() => server.resetHandlers());
afterAll(() => server.close());
