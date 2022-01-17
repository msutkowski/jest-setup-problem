import { useState, useEffect } from "react";
import { PermissionsAndroid, Platform } from "react-native";

import Geolocation from 'react-native-geolocation-service';
import { useAppDispatch } from "../../app/hooks";
import { setCurrentLocation } from "../../features/user/locationSlice";
import { GeolocationData } from "../types/GeolocationData";

const useGeolocation = (watchLocation = false): [string, GeolocationData] => {
	const dispatch = useAppDispatch();
	const [error, setError] = useState("");
	const [position, setPosition] = useState<GeolocationData>({
		latitude: 0,
		longitude: 0
	});

	const getOneTimeGeolocation = () => {
		Geolocation.getCurrentPosition((pos) => {

			let geoPosition: GeolocationData = {
				latitude: pos.coords.latitude,
				longitude: pos.coords.longitude
			}

			setError("");
			setPosition(geoPosition);
			dispatch(setCurrentLocation(geoPosition));
		}, error => setError(error.message),
		{
			enableHighAccuracy: true,
			timeout: 10000,
			maximumAge: 1000
		});
	}

	const watchGeolocation = () => {
		return Geolocation.watchPosition(pos => {
			let geoPosition: GeolocationData = {
				latitude: pos.coords.latitude,
				longitude: pos.coords.longitude
			}

			setError("");
			setPosition(geoPosition);
			dispatch(setCurrentLocation(geoPosition));
		}, error => setError(error.message),
		{
			enableHighAccuracy: true,
		});
	}

	useEffect(() => {
		let watchId: number;
		const getPermissions = async () => {
			if (Platform.OS === 'ios')
			{
				getOneTimeGeolocation();

				if (watchLocation)
					watchId = watchGeolocation();
			}
			else
			{
				try {
					const granted = await PermissionsAndroid.request(
						PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
						{
							title: 'Location Access Required',
							message: 'This App needs to Access your location',
							buttonNegative: "Cancel",
							buttonPositive: "Allow"
						});

					if(granted === PermissionsAndroid.RESULTS.GRANTED)
					{
						getOneTimeGeolocation();

						if (watchLocation)
							watchId = watchGeolocation();
					}
					else
					{
						setError("Permission denied");
					}
				}
				catch (e)
				{
					console.warn(e);
				}
			}
		};

		getPermissions();

		return () => Geolocation.clearWatch(watchId);
	}, []);

	return [error, position];
};

export default useGeolocation;
