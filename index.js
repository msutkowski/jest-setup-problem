import React, { useContext } from 'react';
import { AppRegistry } from 'react-native';
import { name as appName } from './app.json';
import App from './App';
import { Provider } from 'react-redux';
import { store } from './app/store';
import { LocalizationProvider } from './app/localization';
import { NativeBaseProvider } from 'native-base';

const AppWrapper = () => {
	return (
		<Provider store={store}>
			<LocalizationProvider>
				<NativeBaseProvider>
					<App />
				</NativeBaseProvider>
			</LocalizationProvider>
		</Provider>
	)
}

AppRegistry.registerComponent(appName, () => AppWrapper);
