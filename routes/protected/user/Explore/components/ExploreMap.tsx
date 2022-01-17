import React, { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';

import MapView, { Marker, PROVIDER_GOOGLE, Region } from 'react-native-maps';
import { setExploreMap } from '../../../../../features/user/locationSlice';
import { useAppDispatch, useAppSelector } from '../../../../../app/hooks';
import { GeolocationData } from '../../../../../common/types/GeolocationData';

import { Event } from '../../../../../common/types/Event';

interface IProps {
	initialLocation: GeolocationData;
	events?: Event[];
	onEventSelected: (event: Event) => void;
}

const ExploreMap: React.FC<IProps> = (props: IProps) => {
	const region = useAppSelector(state => state.location.exploreMap);
	const dispatch = useAppDispatch();

	useEffect(() => {
		dispatch(setExploreMap({
			latitude: props.initialLocation.latitude,
			longitude: props.initialLocation.longitude,
			latitudeDelta: 0.015,
			longitudeDelta: 0.0121
		}));
	}, [])

	const handleRegionChange = (region: Region) => {
		// TODO: Limit
		dispatch(setExploreMap(region));
	}

	return (
		<View style={styles.container}>
			<MapView
				style={styles.map}
				provider={PROVIDER_GOOGLE}
				initialRegion={region}
				showsUserLocation={true}
				showsMyLocationButton={false}
				showsTraffic={false}
				showsPointsOfInterest={false}
				showsCompass={false}
				rotateEnabled={false}
				onRegionChangeComplete={handleRegionChange}>
				{
					props.events && props.events.map((event, ndx) => (
						<Marker
							key={ndx}
							coordinate={event.location}
							onPress={() => props.onEventSelected(event)} />
					))
				}
			</MapView>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		...StyleSheet.absoluteFillObject,
		justifyContent: 'flex-end',
		alignItems: 'center',
	},
	map: {
		...StyleSheet.absoluteFillObject,
	},
});

export default ExploreMap;
