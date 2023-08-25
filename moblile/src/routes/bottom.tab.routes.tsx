import { Platform } from 'react-native';
import { BottomTabNavigationProp, createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { House, SignOut, Tag } from 'phosphor-react-native';

import { Home } from '@screens/Home';
import { MyAds } from '@screens/MyAds';
import { useTheme } from 'native-base';
import { Logout } from '@screens/Logout';


type BottomTabRoutesTypes = {
  home: undefined;
  myAds: undefined;
  logout: undefined;
}

export type BottomTabRoutesProps = BottomTabNavigationProp<BottomTabRoutesTypes>;

const {Navigator, Screen} = createBottomTabNavigator<BottomTabRoutesTypes>();
export const BottomTabRoutes = () => {
  const {sizes, colors} = useTheme();
  const iconSize = sizes[6];
  return (
    <Navigator screenOptions={{
      headerShown: false,
      tabBarShowLabel: false,
      tabBarActiveTintColor: colors.gray['200'],
      tabBarInactiveTintColor: colors.gray['400'],
      tabBarStyle: {
        backgroundColor: colors.gray['700'],
        borderTopWidth: 0,
        height: Platform.OS === 'android' ? 'auto' : 96,
        paddingBottom: sizes[10],
        paddingTop: sizes[6]
      }
    }}>
      <Screen
        name="home"
        component={Home}
        options={{
          tabBarIcon: ({color}) => (
            // <HomeSvg fill={color} width={iconSize} height={iconSize}/>
            <House color={color} size={iconSize}/>
          )
        }}
      
      />
      <Screen
        name="myAds"
        component={MyAds}
        options={{
          tabBarIcon: ({color}) => (
            
            <Tag color={color} size={iconSize}/>
          )
        }}
      />
      <Screen
        name="logout"
        component={Logout}
        options={{
          tabBarIcon: () => (
            <SignOut color={colors.red['500']} size={iconSize}/>
          )
        }}
      />
      {/*<Screen*/}
      {/*  name="exercise"*/}
      {/*  component={Exercise}*/}
      {/*  options={{tabBarButton: () => null}}*/}
      {/*/>*/}
    
    </Navigator>
  );
  
};
