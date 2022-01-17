import 'react-native';
import React from 'react';
import App from '../App';
import TestRenderer from 'react-test-renderer';
import SplashScreen from '../routes/SplashScreen';
import { store } from '../app/store';
import { Provider } from 'react-redux';
import { SafeAreaView } from 'react-native-safe-area-context';
import { render, waitFor } from '@testing-library/react-native';
import PublicStack from '../routes/stacks/PublicStack';

describe('App test', () => {
	test("Only splash screen should be rendered on app start", async () => {

		// This gets other error (use 'act' - maybe because I didn't await any test)
		// let component = render(<Provider store={store}><App /></Provider>);

		let testRenderer = TestRenderer.create(
			<Provider store={store}>
				<App />
			</Provider>
		);
		let testInstance = testRenderer.root;

		await waitFor(() => expect(testInstance.findByType(SafeAreaView)));
		await waitFor(() => expect(testInstance.findByType(SplashScreen)));

		// TODO: Somehow test that these aren't being rendered
		//await waitFor(() => expect(() => testInstance.findByType(PublicStack)));
		//await waitFor(() => expect(() => testInstance.findByType(SplashScreen)));
	});

	/*
	test.skip("Public stack shouldn't be rendered on app start", async () => {
		let testRenderer = TestRenderer.create(
			<Provider store={store}>
				<App />
			</Provider>
		);
		let testInstance = testRenderer.root;

		await waitFor(() => expect(testInstance.findByType(SafeAreaView)));
	});

	// TODO: Somehow check the loading of tokens

	test.todo("Splash screen shouldn't be rendered after curUser is loaded");
	test.todo("Public stack should be visible after curUser failed to be loaded");
	test.todo("Private stack should be visible after curUser was loaded");
	*/
});
