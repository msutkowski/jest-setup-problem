import React, { useContext } from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LocalizationContext } from '../../../../app/localization';

const HomeScreen: React.FC = () => {
	const { translations } = useContext(LocalizationContext);

	return (
		<SafeAreaView style={styles.container}>
			<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
				<Text>{translations['home']}</Text>
			</View>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
});

export default HomeScreen;
