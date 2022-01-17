import { configureStore } from '@reduxjs/toolkit';
import curUserReducer from '../features/user/curUserSlice';
import curOrgReducer from '../features/org/curOrgSlice';
import locationReducer from '../features/user/locationSlice';
import authApi from '../features/user/authSlice';
import accountApi from '../features/user/accountSlice';
import orgsApi from '../features/org/orgsSlice';

export const store = configureStore({
	reducer: {
		curUser: curUserReducer,
		curOrg: curOrgReducer,
		location: locationReducer,
		[authApi.reducerPath]: authApi.reducer,
		[accountApi.reducerPath]: accountApi.reducer,
		[orgsApi.reducerPath]: orgsApi.reducer
	},
	middleware: getDefaultMiddleware =>
		getDefaultMiddleware().concat(
			authApi.middleware,
			accountApi.middleware,
			orgsApi.middleware
		)
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
