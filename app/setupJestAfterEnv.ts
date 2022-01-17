import 'cross-fetch/polyfill';
//import { fetch, Headers, Request, Response } from 'cross-fetch';
import '@testing-library/jest-native/extend-expect';
import { server } from '../mocks/server';
import AbortController from 'abort-controller';
(global as any).AbortController = AbortController;

beforeAll(() => server.listen(/*{ onUnhandledRequest: 'error' }*/));
afterEach(() => server.resetHandlers());
afterAll(() => server.close());
