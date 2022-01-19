import 'react-native';
import React from 'react';
import App from '../App';
import tiConfig from '../app/configs/testIdsConfig.json';
import { render } from '../app/testUtil';

describe('App test', () => {
	test("Only splash screen should be rendered on app start", async () => {
		const screen = render(<App />);

		const element = await screen.findByTestId(tiConfig.SAFE_AREA_VIEW);
		expect(element).toBeTruthy();

		//expect(screen.findByTestId(tiConfig.SPLASH_SCREEN));
		//expect(await screen.findByTestId(tiConfig.PUBLIC_STACK)).not;
		//expect(await screen.findByTestId(tiConfig.PROTECTED_STACK)).not;
	});

	// // TODO: Somehow check the loading of tokens

	// test.todo("Splash screen shouldn't be rendered after curUser is loaded");
	// test.todo("Public stack should be visible after curUser failed to be loaded");
	// test.todo("Private stack should be visible after curUser was loaded");
});
