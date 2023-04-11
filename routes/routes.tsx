import React from "react";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from "../pages/Home";
import Login from "../pages/login";
import NewProject from "../pages/New";
import ListProject from "../pages/List";

const Stack = createNativeStackNavigator();

export default function Routes(){
return(
    <NavigationContainer>
        <Stack.Navigator
                screenOptions={{
                headerStyle: { backgroundColor: '#663399' },
                headerTintColor: '#fff',
                headerTitleStyle: { fontWeight: 'bold'},
                }}
            >
            <Stack.Screen name="Home" component={Home} />
            <Stack.Screen name="New" component={NewProject} />    
            <Stack.Screen name="List" component={ListProject} />    
        </Stack.Navigator>
    </NavigationContainer>
);
}

