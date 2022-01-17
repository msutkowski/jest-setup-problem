import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAppDispatch } from '../../../app/hooks';

const ForgotPasswordScreen: React.FC = () => {
	const dispatch = useAppDispatch();

	return (
		<SafeAreaView style={styles.container}>
			<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
				<Text>SignIn</Text>
			</View>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
});


export default ForgotPasswordScreen;
