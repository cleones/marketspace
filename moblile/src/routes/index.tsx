import { DefaultTheme, NavigationContainer } from '@react-navigation/native';
import { Box, useTheme } from 'native-base';
import { useAuth } from '@contexts/AuthContext';
import { AppRoutes } from '@routes/app.routes';
import { Loading } from '@components/Loading';
import { AuthRoutes } from '@routes/auth.routes';

export const Routes = () => {
  const {colors} = useTheme();
  
  const theme = DefaultTheme;
  theme.colors.background = colors.gray['700'];
  
  const {user, isLoadingUserStoreData} = useAuth();
  
  if (isLoadingUserStoreData) {
    return <Loading/>;
  }
  
  return (
    <Box flex={1} bg="gray.700">
      <NavigationContainer theme={theme}>
        {user?.id ? <AppRoutes/> : <AuthRoutes/>}
      </NavigationContainer>
    </Box>
  );
};
