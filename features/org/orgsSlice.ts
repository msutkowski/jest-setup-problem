import { createApi } from "@reduxjs/toolkit/query/react";
import API_CONFIG from '../../app/configs/apiConfig.json';
import baseQueryWithReauth from "../../common/fetchBaseQueryReauth";

const orgsApi = createApi({
	reducerPath: 'orgs',
	baseQuery: baseQueryWithReauth({ baseUrl: API_CONFIG.ACCOUNT_BASE_URL }),
	endpoints: builder => ({
		postLogin: builder.query({
			query: () => '/posts'
		})
	})
})

export const { usePostLoginQuery } = orgsApi;
export default orgsApi;
