import { configureStore } from '@reduxjs/toolkit';
import curUserReducer from '../features/user/curUserSlice';
import curOrgReducer from '../features/org/curOrgSlice';
import locationReducer from '../features/user/locationSlice';
import authApi from '../features/user/authSlice';
import accountApi from '../features/user/accountSlice';
import orgsApi from '../features/org/orgsSlice';


const middlewares = [
	authApi.middleware,
	accountApi.middleware,
	orgsApi.middleware
];

if (__DEV__ && !process.env.JEST_WORKER_ID) {
	const createDebugger = require('redux-flipper').default;
	middlewares.push(createDebugger());
}

export const store = configureStore({
	reducer: {
		curUser: curUserReducer,
		curOrg: curOrgReducer,
		location: locationReducer,
		[authApi.reducerPath]: authApi.reducer,
		[accountApi.reducerPath]: accountApi.reducer,
		[orgsApi.reducerPath]: orgsApi.reducer
	},
	middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(middlewares)
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
