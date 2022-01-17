import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import IMAccount from "../../common/types/MAccount";
import accountApi from "./accountSlice";

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
	reducers: {
		logout: (state) => {
			state.loading = false;
			state.user = undefined;
		}
	},
	extraReducers: builder => {
		// You can just use a matcher here on this query to set the state instead of dispatching a setter
		builder.addMatcher(accountApi.endpoints.getMyAccount.matchFulfilled, (state, action) => {
			state.user = action.payload
		})
	}
});

export const { logout } = curUserSlice.actions;
export default curUserSlice.reducer;
