import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import API_CONFIG from '../../app/configs/apiConfig.json';

// Ideally this should be used
import baseQueryWithReauth from "../../common/fetchBaseQueryReauth";
import IMAccount from "../../common/types/MAccount";

export const accountApi = createApi({
	reducerPath: 'account',
	baseQuery: fetchBaseQuery({ baseUrl: API_CONFIG.ACCOUNT_BASE_URL }),
	endpoints: builder => ({
		getMyAccount: builder.query<IMAccount, void>({
			query: () => API_CONFIG.ACCOUNT_MY_ACCOUNT_URL
		}),
	})
})

export const { useLazyGetMyAccountQuery } = accountApi;
export default accountApi;
