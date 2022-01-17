import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { ProtectedStackParamList } from '../../common/types/Stacks';
import { useAppSelector } from '../../app/hooks';
import UserStack from './UserStack';
import OrgStack from './OrgStack';

const Stack = createStackNavigator<ProtectedStackParamList>();

const ProtectedStack: React.FC = () => {
	const curOrg = useAppSelector(state => state.curOrg);

	return (
		<Stack.Navigator>
			<Stack.Screen
				name="ViewStack"
				component={!curOrg.org ? UserStack : OrgStack}
				options={{ headerShown: false }} />
		</Stack.Navigator>
	);
}

export default ProtectedStack;
