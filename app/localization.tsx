import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {createContext, useState, ReactNode} from 'react';
import LocalizedStrings from 'react-native-localization';
import * as RNLocalize from 'react-native-localize';
import localStrgConfig from './configs/localStorageConfig.json';
import en from '../localization/en.json';
import da from '../localization/da.json';
import sk from '../localization/sk.json';

const DEFAULT_LANGUAGE = 'en';
const languages = {en, da, sk};

const translations = new LocalizedStrings(languages);

const LocalizationContext = createContext({
	translations,
	setAppLanguage: (language: string) => {},
	appLanguage: DEFAULT_LANGUAGE,
	initializeAppLanguage: () => {},
});

type Props = {
	children?: ReactNode
}

const LocalizationProvider = ({ children }: Props) => {
	const [appLanguage, setAppLanguage] = useState(DEFAULT_LANGUAGE);

	const setLanguage = (language: string) => {
		translations.setLanguage(language);
		setAppLanguage(language);
		AsyncStorage.setItem(localStrgConfig.APP_LANGUAGE, language);
	};

	const initializeAppLanguage = async () => {
		const currentLanguage = await AsyncStorage.getItem(localStrgConfig.APP_LANGUAGE);

		if (currentLanguage)
		{
			setLanguage(currentLanguage);
		}
		else
		{
			let localeCode = DEFAULT_LANGUAGE;
			const supportedLocaleCodes = translations.getAvailableLanguages();
			const phoneLocaleCodes = RNLocalize.getLocales().map(
				locale => locale.languageCode,
			);

			phoneLocaleCodes.some(code => {
				if (supportedLocaleCodes.includes(code)) {
					localeCode = code;
					return true;
				}
			});

			setLanguage(localeCode);
		}
	};

	return (
		<LocalizationContext.Provider
			value={{
				translations,
				setAppLanguage: setLanguage,
				appLanguage,
				initializeAppLanguage,
		}}>
			{children}
		</LocalizationContext.Provider>
	);
};

export { LocalizationContext };
export { LocalizationProvider };
