import { createApi } from "@reduxjs/toolkit/query/react";
import API_CONFIG from '../../app/configs/apiConfig.json';
import baseQueryWithReauth from "../../common/fetchBaseQueryReauth";
import { LoginRequest } from '../../common/types/Auth';
import IMAccount from "../../common/types/MAccount";

const authApi = createApi({
	reducerPath: 'auth',
	baseQuery: baseQueryWithReauth({ baseUrl: API_CONFIG.ACCOUNT_BASE_URL }),
	endpoints: builder => ({
		register: builder.mutation({
			query: ({obj}) => ({
				url: API_CONFIG.ACCOUNT_REGISTER_URL,
				method: "POST",
				body: {obj} // TODO FIX
			})
		}),
		login: builder.mutation<IMAccount, LoginRequest>({
			query: (auth) => ({
				url: API_CONFIG.ACCOUNT_LOGIN_URL,
				method: "POST",
				body: auth,
			})
		}),
	})
})

export const { useRegisterMutation, useLoginMutation } = authApi;
export default authApi;
