import React, { useContext, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from './app/hooks';
import { NavigationContainer } from '@react-navigation/native';
import SplashScreen from './routes/SplashScreen';
import { useLazyGetMyAccountQuery } from './features/user/accountSlice';
import PublicStack from './routes/stacks/PublicStack';
import ProtectedStack from './routes/stacks/ProtectedStack';
import { LocalizationContext } from './app/localization';
import { setStoredTokenCookies } from './common/helpers/CookieHelper';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

// GET RID OF:
import apiConfig from './app/configs/apiConfig.json';
import IMAccount from './common/types/MAccount';

const App = () => {
	const { initializeAppLanguage } = useContext(LocalizationContext);
	const curUser = useAppSelector(state => state.curUser);
	// Lazy queries match your original implementation of a mutation.
	// TODO: you'll most likely need handle the presence of `data` and `error` from the query hook for good UI
	const [getMyAccount, { isLoading, data, error }] = useLazyGetMyAccountQuery();

	useEffect(() => {
		async function checkAuth() {
			await setStoredTokenCookies();
			await getMyAccount().unwrap();
		}

		initializeAppLanguage();
		checkAuth();
	}, [])

	// You'll want to rework this, but you shouldn't render anything other than some type of loading state until the auth check has happened
	if (isLoading || !data || !error) {
		return <SplashScreen />
	}


	// NOTE: Maybe 'flex: 1' will be needed on GestureHandlerRootView
	return (
		<GestureHandlerRootView>
			<NavigationContainer>
				{ !curUser.user ? <PublicStack /> : <ProtectedStack /> }
			</NavigationContainer>
		</GestureHandlerRootView>
	)
}

export default App;
