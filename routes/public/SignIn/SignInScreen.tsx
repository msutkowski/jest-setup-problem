import React, { useState } from 'react';
import { Button, StyleSheet, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAppDispatch } from '../../../app/hooks';
import { useLoginMutation } from '../../../features/user/authSlice';
import { setCurUser } from '../../../features/user/curUserSlice';

const SignInScreen: React.FC = () => {
	const dispatch = useAppDispatch();
	const [login, {isLoading, isSuccess, isError, data}] = useLoginMutation();
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [showPassword, setShowPassword] = useState(false);

	const handleLogin = async () => {
		await login({name: username, password: password})
			.unwrap()
			.then(account => dispatch(setCurUser(account)))
			.catch(error => console.log(error));
	}

	return (
		<SafeAreaView style={styles.container}>
			<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
				<Text>Sign In</Text>
				<TextInput placeholder="Username"
						   value={username}
						   onChangeText={setUsername} />
				<TextInput placeholder="Password"
						   value={password}
						   onChangeText={setPassword}
						   secureTextEntry={!showPassword} />
				<Button title="Sign in"
						onPress={handleLogin} />
			</View>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
});


export default SignInScreen;
