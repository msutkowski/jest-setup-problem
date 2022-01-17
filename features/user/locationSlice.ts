import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Region } from "react-native-maps";
import { GeolocationData } from "../../common/types/GeolocationData";

interface IGeolocationState {
	currentLocation: GeolocationData;
	exploreMap: Region;
}

const initialState: IGeolocationState = {
	currentLocation: {
		latitude: 0,
		longitude: 0
	},
	exploreMap: {
		latitude: 0,
		longitude: 0,
		latitudeDelta: 0,
		longitudeDelta: 0
	}
}

const locationSlice = createSlice({
	name: 'location',
	initialState,
	reducers: {
		setCurrentLocation: (state, action: PayloadAction<GeolocationData>) => {
			state.currentLocation = action.payload;
		},
		setExploreMap: (state, action: PayloadAction<Region>) => {
			state.exploreMap = action.payload;
		}
	}
});

export const { setCurrentLocation, setExploreMap } = locationSlice.actions;
export default locationSlice.reducer;
