import React from "react";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { enableScreens } from "react-native-screens";
import Home from "./pages/Home";

const Stack = createNativeStackNavigator();

export default function App(){
  return(
    <NavigationContainer>
      <Stack.Navigator
          screenOptions={{
            headerStyle: { backgroundColor: 'purple' },
            headerTintColor: '#fff',
            headerTitleStyle: { fontWeight: 'bold'},
          }}
      >
        <Stack.Screen name="Home" component={Home} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

