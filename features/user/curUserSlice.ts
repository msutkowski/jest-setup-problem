import { createSlice } from "@reduxjs/toolkit";
import { logout } from "../../common/actions";
import IMAccount from "../../common/types/MAccount";
import accountApi from "./accountSlice";
import authApi from "./authSlice";
interface ICurUserState {
	loading: boolean
	user?: IMAccount;
}

const initialState: ICurUserState = {
	loading: true
}

const curUserSlice = createSlice({
	name: 'curUser',
	initialState,
	reducers: {},
	extraReducers: builder => {
		builder.addCase(logout, (state) => {
			state.loading = false;
			state.user = undefined;
		});
		builder.addMatcher(
			accountApi.endpoints.getMyAccount.matchFulfilled,
			(state, action) => {
				state.loading = false;
				state.user = action.payload;
			}
		);
		builder.addMatcher(
			accountApi.endpoints.getMyAccount.matchRejected,
			(state) => {
				state.loading = false;
			}
		);
		builder.addMatcher(
			authApi.endpoints.login.matchFulfilled,
			(state, action) => {
				state.loading = false;
				state.user = action.payload;
			}
		);
		builder.addMatcher(
			authApi.endpoints.login.matchRejected,
			(state) => {
				state.loading = false;
				state.user = undefined;
			}
		);

	}
});

export default curUserSlice.reducer;
