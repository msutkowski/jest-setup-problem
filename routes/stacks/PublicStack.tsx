import React from 'react';
import { PublicStackParamList } from '../../common/types/Stacks';
import { createStackNavigator } from '@react-navigation/stack';
import SignInScreen from '../public/SignIn/SignInScreen';
import SignUpScreen from '../public/SignUp/SignUpScreen';
import ForgotPasswordScreen from '../public/ForgotPassword/ForgotPasswordScreen';

const Stack = createStackNavigator<PublicStackParamList>();

const PublicStack: React.FC = () => {
	return (
		<Stack.Navigator>
			<Stack.Screen name="SignIn" component={SignInScreen} />
			<Stack.Screen name="SignUp" component={SignUpScreen} />
			<Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
		</Stack.Navigator>
	);
}

export default PublicStack;
