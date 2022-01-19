import React, { useContext, useEffect } from 'react';
import { useAppSelector } from './app/hooks';
import { NavigationContainer, useNavigationContainerRef } from '@react-navigation/native';
import SplashScreen from './routes/SplashScreen';
import { useLazyGetMyAccountQuery } from './features/user/accountSlice';
import PublicStack from './routes/stacks/PublicStack';
import ProtectedStack from './routes/stacks/ProtectedStack';
import { LocalizationContext } from './app/localization';
import { setStoredTokenCookies } from './common/helpers/CookieHelper';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { useFlipper } from '@react-navigation/devtools';

const App = () => {
	const navigationRef = useNavigationContainerRef();
	useFlipper(navigationRef);

	const { initializeAppLanguage } = useContext(LocalizationContext);
	const curUser = useAppSelector(state => state.curUser);
	const [getMyAccount, { isLoading }] = useLazyGetMyAccountQuery();

	useEffect(() => {
		async function checkAuth() {
			await setStoredTokenCookies();
			await getMyAccount();
		}

		initializeAppLanguage();
		checkAuth();
	}, [])

	if (curUser.loading)
	{
		return (
			<SplashScreen />
		)
	}

	return (
		<GestureHandlerRootView style={{flex: 1}}>
			<NavigationContainer ref={navigationRef}>
				{ !curUser.user ? <PublicStack /> : <ProtectedStack /> }
			</NavigationContainer>
		</GestureHandlerRootView>
	)
}

export default App;
