
import Home from './Screens/homee';
import Login from './Screens/Login';
import feed from './Screens/feed';
import  'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import AntDesign from '@expo/vector-icons/AntDesign';


export default function () {

  const BottomTab = createBottomTabNavigator();

  return (
    <NavigationContainer>
        <BottomTab.Navigator initialRouteName='Login' screenOptions={{
          headerStyle: {backgroundColor: '#f00000'},
          headerTintColor: '#fff',
          tabBarActiveBackgroundColor: '#c91256',
          tabBarInactiveBackgroundColor: '#a1242235',
        }}>
            <BottomTab.Screen name="Home" component={Home}
            options={{
              tabBarIcon: () =>
                <AntDesign name="home" size={24} color="black" />
            }} />
            <BottomTab.Screen name="Login" component={Login}
            options={{
              tabBarIcon: () =>
                <AntDesign name="login" size={24} color="black" />
            }}/>
            <BottomTab.Screen name="feed" component={feed}
            options={{
              tabBarIcon: () =>
                <AntDesign name="feed" size={24} color="black" />
                }}/>
        </BottomTab.Navigator>
    </NavigationContainer>
  );
}