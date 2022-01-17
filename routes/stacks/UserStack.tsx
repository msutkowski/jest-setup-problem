import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { UserStackParamList } from '../../common/types/Stacks';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import HomeScreen from '../protected/user/Home/HomeScreen';
import SavedScreen from '../protected/user/Saved/SavedScreen';
import ExploreScreen from '../protected/user/Explore/ExploreScreen';
import TicketsScreen from '../protected/user/Tickets/TicketsScreen';
import UserProfileScreen from '../protected/user/Profile/UserProfileScreen';

const Tab = createBottomTabNavigator<UserStackParamList>();

const UserStack: React.FC = () => {
	return (
		<Tab.Navigator
			initialRouteName="Home"
			backBehavior="initialRoute">
			<Tab.Screen
				name="Home"
				component={HomeScreen}
				options={{
					headerShown: false,
					tabBarLabel: 'Home',
					tabBarIcon: ({ color, size }) => (
						<Icon name="home-outline" size={30} color={"#000000"} />
					),
				}}
			/>
			<Tab.Screen
				name="Saved"
				component={SavedScreen}
				options={{
					headerShown: false,
					tabBarLabel: 'Saved',
					tabBarIcon: ({ color, size }) => (
						<Icon name="heart-outline" size={30} color="#000000" />
					),
				}}
			/>
			<Tab.Screen
				name="Explore"
				component={ExploreScreen}
				options={{
					headerShown: false,
					tabBarLabel: 'Explore',
					tabBarIcon: ({ color, size }) => (
						<Icon name="magnify" size={30} color="#000000" />
					),
				}}
			/>
			<Tab.Screen
				name="Tickets"
				component={TicketsScreen}
				options={{
					headerShown: false,
					tabBarLabel: 'Tickets',
					tabBarIcon: ({ color, size }) => (
						<Icon name="message-outline" size={30} color="#000000" />
					),
				}}
			/>
			<Tab.Screen
				name="Profile"
				component={UserProfileScreen}
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

export default UserStack;
