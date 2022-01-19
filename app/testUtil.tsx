import React from 'react';
import { render as rtlRender } from '@testing-library/react-native';
import {
	combineReducers,
	configureStore,
	EnhancedStore
 } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';

import curUserReducer from '../features/user/curUserSlice';
import curOrgReducer from '../features/org/curOrgSlice';
import locationReducer from '../features/user/locationSlice';
import authApi from '../features/user/authSlice';
import accountApi from '../features/user/accountSlice';
import orgsApi from '../features/org/orgsSlice';

const rootReducer = combineReducers({
	curUser: curUserReducer,
	curOrg: curOrgReducer,
	location: locationReducer,
	[authApi.reducerPath]: authApi.reducer,
	[accountApi.reducerPath]: accountApi.reducer,
	[orgsApi.reducerPath]: orgsApi.reducer
});

const middlewares = [
	authApi.middleware,
	accountApi.middleware,
	orgsApi.middleware
];

if (__DEV__ && !process.env.JEST_WORKER_ID) {
	const createDebugger = require('redux-flipper').default;
	middlewares.push(createDebugger());
}

type RootState = ReturnType<typeof rootReducer>;

type Store = {
	preloadedState?: RootState;
	store?: EnhancedStore<RootState>;
}

type Wrapper = {
	children: JSX.Element | JSX.Element[];
}

const render = (
	ui: React.ReactElement<any, string | React.JSXElementConstructor<any>>,
	{
		preloadedState,
		store = configureStore({
			preloadedState,
			reducer: rootReducer,
			middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(middlewares)
		}),
		...renderOptions
	}: Store = {}) => {

	function Wrapper({ children }: Wrapper) {
		return <Provider store={store}>{children}</Provider>
	}

	return rtlRender(ui, { wrapper: Wrapper, ...renderOptions });
}

// Re-export everything
export * from '@testing-library/react-native';
// Override render method
export { render };
