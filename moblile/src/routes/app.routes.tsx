import { createNativeStackNavigator, NativeStackNavigationProp } from '@react-navigation/native-stack';
import { AdDetail } from '@screens/Ads/AdDetail';
import { BottomTabRoutes } from '@routes/bottom.tab.routes';
import { AdCreate } from '@screens/Ads/AdCreate';
import { AdPreview } from '@screens/Ads/AdPreview';
import { AdEdit } from '@screens/Ads/AdEdit';

type AppRoutesTypes = {
  adDetail: {
    id: string
  };
  adEdit: {
    id: string
  };
  adPreview: undefined;
  adCreate: undefined;
  bottomTabRoute: {
    screen: 'home' | 'myAds' | 'logout';
  };
}

export type AppNavigatorRoutesProps = NativeStackNavigationProp<AppRoutesTypes>;
const {Navigator, Screen} = createNativeStackNavigator<AppRoutesTypes>();
export const AppRoutes = () => {
  return (
    <Navigator screenOptions={{
      headerShown: false,
    }}>
      <Screen
        name="bottomTabRoute"
        component={BottomTabRoutes}
      />
      <Screen
        name="adDetail"
        component={AdDetail}
      />
      <Screen
        name="adEdit"
        component={AdEdit}
      />
      <Screen
        name="adCreate"
        component={AdCreate}
      />
      <Screen
        name="adPreview"
        component={AdPreview}
      />
    </Navigator>
  );
  
};
