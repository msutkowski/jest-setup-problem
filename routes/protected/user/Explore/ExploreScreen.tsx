import React, { useEffect, useState } from 'react';
import { Platform, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import ExploreMap from './components/ExploreMap';
import { useAppSelector } from '../../../../app/hooks';
import useGeolocation from '../../../../common/hooks/useGeolocation';
import { default as dummyData } from '../../../../common/data/dummyEvents';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Event, EventData } from '../../../../common/types/Event';

const ExploreScreen: React.FC = () => {
	const location = useAppSelector(state => state.location.currentLocation);
	const geolocation = useGeolocation(true);

	const [searchValue, setSearchValue] = useState<string>("");
	const [eventsData, setEventsData] = useState<EventData>();
	const [selectedEvent, setSelectedEvent] = useState<Event>();
	// TODO: Filter (maybe Redux? - selected tag, etc. (local storage loaded)))

	useEffect(() => {
		// TODO: Fetch events
		setEventsData(dummyData);
	}, [])

	const handleSelectEvent = (event: Event) => setSelectedEvent(event);

	return (
		<SafeAreaView style={styles.container}>
			<ExploreMap initialLocation={location}
						events={eventsData?.events}
						onEventSelected={handleSelectEvent} />
			<View style={styles.searchBar}>
				<Icon
					name="magnify"
					size={22}
					color="#000"
					style={styles.searchBarSearchIcon} />
				<TextInput
					placeholder="What are you looking for?"
					placeholderTextColor="#000"
					autoCapitalize="none"
					style={styles.searchBarInput}
					value={searchValue}
					onChangeText={(value) => setSearchValue(value)} />
				<Icon
					name="tune"
					size={22}
					color="#000" />
			</View>

			{
				(eventsData && eventsData?.tagsNearby.length > 4) &&
					<ScrollView
						horizontal
						scrollEventThrottle={1}
						showsHorizontalScrollIndicator={false}
						style={styles.chipsScrollBox}>
						{
							eventsData && eventsData?.tagsNearby.map((tag, ndx) => (
								<TouchableOpacity
									style={styles.chipsItem}
									key={ndx}>
									<Text>{tag.charAt(0).toUpperCase() + tag.slice(1)}</Text>
								</TouchableOpacity>
							))
						}
					</ScrollView>
			}
			{ /* TODO: Events */ }
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1
	},
	searchBar: {
		position: 'absolute',
		marginTop: Platform.OS === 'ios' ? 30: 20,
		flexDirection: 'row',
		alignSelf: 'center',
		alignItems: 'center',
		marginHorizontal: 20,
		paddingVertical: 6,
		paddingHorizontal: 12,
		borderRadius: 50,
		backgroundColor: '#fff',
		shadowColor: '#000',
		shadowOffset: {
			width: 0,
			height: 10
		},
		shadowOpacity: 0.5,
		shadowRadius: 4,
		elevation: 6
	},
	searchBarSearchIcon: {
		paddingRight: 6,
	},
	searchBarInput: {
		flex: 1,
		padding: 0
	},
	chipsScrollBox: {
		position: 'absolute',
		top: Platform.OS === 'ios' ? 80: 70,
		paddingHorizontal: 20
	},
	chipsIcon: {
		marginRight: 5
	},
	chipsItem: {
		flexDirection: 'row',
		backgroundColor: '#fff',
		borderRadius: 20,
		padding: 8,
		paddingHorizontal: 20,
		marginHorizontal: 10,
		height: 35,
		shadowColor: '#000',
		shadowOffset: {
			width: 0,
			height: 3
		},
		shadowOpacity: 0.1,
		shadowRadius: 5,
		elevation: 10
	}
});

export default ExploreScreen;
