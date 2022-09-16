import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { NavigationContainer } from '@react-navigation/native'
import Home from './src/screens/Home'
import RestaurantDetail from './src/screens/RestaurantDetail'
import { Provider} from 'react-redux'
import configureStore from './redux/store'
import OrderCompleted from './src/screens/OrderCompleted'
import RestaurantMaps from './src/screens/RestaurantMaps'

const store = configureStore();

export default function RootNavigation() {
    const Stack = createStackNavigator();

    const screenOptions = {
        headerShown:false
    };

  return (
    <Provider store={store}>
    <NavigationContainer>
        <Stack.Navigator initialRouteName='Home' screenOptions={screenOptions}>
            <Stack.Screen name='Home' component={Home}></Stack.Screen>
            <Stack.Screen name='RestaurantDetail' component={RestaurantDetail}></Stack.Screen>
            <Stack.Screen name='OrderCompleted' component={OrderCompleted}></Stack.Screen>
            <Stack.Screen name='RestaurantMaps' component={RestaurantMaps}></Stack.Screen>
        </Stack.Navigator>
    </NavigationContainer>
    </Provider>
  )
}