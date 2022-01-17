import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { OrgStackParamList } from '../../common/types/Stacks';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import EventsScreen from '../protected/org/Events/EventsScreen';
import ScanTicketScreen from '../protected/org/ScanTicket/ScanTicketScreen';
import OrgProfileScreen from '../protected/org/Profile/OrgProfileScreen';
import StatisticsScreen from '../protected/org/Statistics/StatisticsScreen';

const Tab = createBottomTabNavigator<OrgStackParamList>();

const OrgStack: React.FC = () => {
	return (
		<Tab.Navigator
			initialRouteName="Profile"
			backBehavior="initialRoute">
			<Tab.Screen
				name="Events"
				component={EventsScreen}
				options={{
					headerShown: false,
					tabBarLabel: 'Home',
					tabBarIcon: ({ color, size }) => (
						<Icon name="home-outline" size={30} color={"#000000"} />
					),
				}}
			/>
			<Tab.Screen
				name="ScanTicket"
				component={ScanTicketScreen}
				options={{
					headerShown: false,
					tabBarLabel: 'Saved',
					tabBarIcon: ({ color, size }) => (
						<Icon name="heart-outline" size={30} color="#000000" />
					),
				}}
			/>
			<Tab.Screen
				name="Statistics"
				component={StatisticsScreen}
				options={{
					headerShown: false,
					tabBarLabel: 'Explore',
					tabBarIcon: ({ color, size }) => (
						<Icon name="magnify" size={30} color="#000000" />
					),
				}}
			/>
			<Tab.Screen
				name="Profile"
				component={OrgProfileScreen}
				options={{
					headerShown: false,
					tabBarLabel: 'Profile',
					tabBarIcon: ({ color, size }) => (
						<Icon name="account-outline" size={30} color="#000000" />
					),
				}}
			/>
		</Tab.Navigator>
	);
}

export default OrgStack;
