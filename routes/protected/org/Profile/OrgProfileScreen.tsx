import React from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAppDispatch } from '../../../../app/hooks';
import { leaveCurOrgSelection } from '../../../../features/org/curOrgSlice';

const OrgProfileScreen: React.FC = () => {
	const dispatch = useAppDispatch();

	const handleSwitchToUserView = () => {
		dispatch(leaveCurOrgSelection());
	}

	return (
		<SafeAreaView style={styles.container}>
			<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
				<Text>Profile [ORG]</Text>
				<Button
					title="Switch to user view"
					onPress={handleSwitchToUserView} />
			</View>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
});

export default OrgProfileScreen;
