import React from 'react';
import { NativeBaseProvider, ColorMode } from 'native-base';
import type { StorageManager } from 'native-base';
import AsyncStorage from '@react-native-async-storage/async-storage';
import localStrgConfig from './configs/localStorageConfig.json';

export default ({ children, theme }: any) => {
	const colorModeManager: StorageManager = {
		get: async () => {
			try
			{
				let val = await AsyncStorage.getItem(localStrgConfig.APP_THEME);
				return val === 'dark' ? 'dark' : 'light';
			}
			catch (e)
			{
				console.log(e);
				return 'light';
			}
		},
		set: async (value: ColorMode) => {
			try
			{
				if (value)
					await AsyncStorage.setItem(localStrgConfig.APP_THEME, value as string);
			}
			catch (e)
			{
				console.log(e);
			}
		},
	};

	return (
		<NativeBaseProvider theme={theme} colorModeManager={colorModeManager}>
			{ children }
		</NativeBaseProvider>
	);
};
