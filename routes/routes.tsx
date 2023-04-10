import React from "react";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from "../pages/Home";
import Login from "../pages/login";

const Stack = createNativeStackNavigator();

export default function Routes(){
return(
    <NavigationContainer>
        <Stack.Navigator
                screenOptions={{
                headerStyle: { backgroundColor: 'purple' },
                headerTintColor: '#fff',
                headerTitleStyle: { fontWeight: 'bold'},
                }}
            >
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Home" component={Home} />      
        </Stack.Navigator>
    </NavigationContainer>
);
}

