import { FetchBaseQueryArgs } from '@reduxjs/toolkit/dist/query/fetchBaseQuery';
import {
	BaseQueryFn,
	FetchArgs,
	fetchBaseQuery,
	FetchBaseQueryError,
} from '@reduxjs/toolkit/query';
import API_CONFIG from '../app/configs/apiConfig.json';
import { logout } from './actions';
import { storeCookies } from './helpers/CookieHelper';

const baseQueryWithReauth = (options: FetchBaseQueryArgs): BaseQueryFn<
	string | FetchArgs,
	unknown,
	FetchBaseQueryError> => {

	const baseQuery = fetchBaseQuery(options);

	return async (args, api, extraOptions) => {
		let result = await baseQuery(args, api, extraOptions);

		if (result.error && result.error.status === 401)
		{
			const refreshResult = await baseQuery({
					url: API_CONFIG.ACCOUNT_BASE_URL + API_CONFIG.ACCOUNT_REFRESH_TOKEN_URL,
					method: "POST",
					body: {}
				}, api, extraOptions);

			if (refreshResult.data)
			{
				result = await baseQuery(args, api, extraOptions)
			}
			else
			{
				api.dispatch(logout());
			}
		}

		storeCookies(options.baseUrl!);

		return result;
	}
}

export default baseQueryWithReauth;
