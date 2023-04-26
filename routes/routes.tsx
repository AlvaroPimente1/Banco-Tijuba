import React from "react";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from "../pages/login";
import Home from "../pages/Home";
import NewProject from "../pages/New";
import ListProject from "../pages/List";
import Cadastro from "../pages/Cadastrar";

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
            <Stack.Screen name="Login" component={Login} options={{ presentation: 'modal' , headerTitle: 'Entrar', headerShown: false}}/>
            <Stack.Screen name="Cadastro" component={Cadastro} options={{ presentation: 'modal' , headerTitle: 'Cadastro', headerShown: false}}/>
            {/* <Stack.Screen name="Home" component={Home} options={{ headerShown: false }}/> */}
            <Stack.Screen name="New" component={NewProject} />    
            <Stack.Screen name="List" component={ListProject} />    
        </Stack.Navigator>
    </NavigationContainer>
);
}

