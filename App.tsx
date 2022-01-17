import React, { useContext, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from './app/hooks';
import { NavigationContainer } from '@react-navigation/native';
import SplashScreen from './routes/SplashScreen';
import { useGetMyAccountMutation } from './features/user/accountSlice';
import { setCurUser } from './features/user/curUserSlice';
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
	const dispatch = useAppDispatch();
	const [getMyAccount] = useGetMyAccountMutation();

	useEffect(() => {
		async function checkAuth() {
			await setStoredTokenCookies();
			await getMyAccount()
				.unwrap()
				.then(account => dispatch(setCurUser(account)))
				.catch(e => {
					//console.log(e);
				});
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
