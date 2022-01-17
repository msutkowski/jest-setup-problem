import { Select } from 'native-base';
import React, { useContext } from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAppDispatch, useAppSelector } from '../../../../app/hooks';
import { LocalizationContext } from '../../../../app/localization';
import { setCurOrg } from '../../../../features/org/curOrgSlice';

const UserProfileScreen: React.FC = () => {
	const dispatch = useAppDispatch();
	const curUser = useAppSelector(state => state.curUser);
	const { translations, appLanguage, setAppLanguage } = useContext(LocalizationContext);

	const handleSwitchToOrgView = () => {
		dispatch(setCurOrg({
			id: 1,
			name: "TestOrg",
			owner: {
				id: 1,
				name: "Test",
				fullName: "",
				email: "",
				pictureUrl: "",
				emailSecured: true,
				permissions: "",
				orgOwner: [],
				orgMember: [],
				orgPending: []
			},
			logoUrl: "",
			modules: [],
			members: [],
			pendingMembers: []
		}));
	}

	return (
		<SafeAreaView style={styles.container}>
			<View style={{ flex: 1, justifyContent: 'flex-start', alignItems: 'flex-start' }}>
				<Text>Greetings {curUser.user?.name}</Text>
				<Select
					placeholder="Language"
					selectedValue={appLanguage}
					width={150}
					onValueChange={(itemValue: string) => setAppLanguage(itemValue)}>
					{
						translations.getAvailableLanguages().map((language, i) =>
							<Select.Item key={i} label={translations.getString(language)} value={language} />
						)
					}
				</Select>
				<Button
					title="Switch to org view"
					onPress={handleSwitchToOrgView} />
			</View>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
});


export default UserProfileScreen;
