import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import IMOrganization from "../../common/types/MOrganization";

interface ICurOrgState {
	org?: IMOrganization
}

const initialState: ICurOrgState = {}

const curOrgState = createSlice({
	name: 'curOrg',
	initialState,
	reducers: {
		setCurOrg: (state, action: PayloadAction<IMOrganization>) => {
			state.org = action.payload;
		},
		leaveCurOrgSelection: (state) => {
			state.org = undefined;
		}
	}
});

export const { setCurOrg, leaveCurOrgSelection } = curOrgState.actions;
export default curOrgState.reducer;
