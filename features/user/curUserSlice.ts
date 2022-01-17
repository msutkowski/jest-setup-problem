import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import IMAccount from "../../common/types/MAccount";

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
		setCurUser: (state, action: PayloadAction<IMAccount>) => {
			state.loading = false;
			state.user = action.payload;
		},
		setCurUserLoading: (state, action: PayloadAction<boolean>) => {
			state.loading = action.payload;
		},
		logout: (state) => {
			state.loading = false;
			state.user = undefined;
		}
	}
});

export const { setCurUser, setCurUserLoading, logout } = curUserSlice.actions;
export default curUserSlice.reducer;
