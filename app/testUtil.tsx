/*
import React from 'react';
import { render as rtlRender } from '@testing-library/react';
import { combineReducers, configureStore, EnhancedStore } from '@reduxjs/toolkit';
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
})

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
		store = configureStore({reducer: rootReducer, preloadedState}),
		...renderOptions
	}: Store = {}) => {

	function Wrapper({ children }: Wrapper) {
		return <Provider store={store}>{children}</Provider>
	}

	return rtlRender(ui, { wrapper: Wrapper, ...renderOptions });
}

// Re-export everything
export * from '@testing-library/react';
// Override render method
export { render };
*/

import {
	AnyAction,
	combineReducers,
	configureStore,
	EnhancedStore,
	Middleware,
	Reducer,
} from "@reduxjs/toolkit";

function setupApiStore<
	A extends {
		reducer: Reducer<any, any>;
		reducerPath: string;
		middleware: Middleware;
		util: { resetApiState(): any };
	},
	R extends Record<string, Reducer<any, any>> = Record<never, never>
>(api: A, extraReducers?: R): { api: any; store: EnhancedStore } {
	/*
	 * Modified version of RTK Query's helper function:
	 * https://github.com/reduxjs/redux-toolkit/blob/master/packages/toolkit/src/query/tests/helpers.tsx
	 */
	const getStore = (): EnhancedStore =>
		configureStore({
			reducer: combineReducers({
				[api.reducerPath]: api.reducer,
				...extraReducers,
			}),
			middleware: (gdm) =>
				gdm({ serializableCheck: false, immutableCheck: false }).concat(
					api.middleware
			),
	  });

	type StoreType = EnhancedStore<
	{
		api: ReturnType<A["reducer"]>;
	} & {
		[K in keyof R]: ReturnType<R[K]>;
	},
	AnyAction,
	ReturnType<typeof getStore> extends EnhancedStore<any, any, infer M>
		? M
		: never
	>;

	const initialStore = getStore() as StoreType;
	const refObj = {
		api,
		store: initialStore,
	};
	const store = getStore() as StoreType;
	refObj.store = store;

	return refObj;
}

export { setupApiStore };
