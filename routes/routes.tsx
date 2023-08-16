import React, { useState, useEffect } from "react";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import auth, { FirebaseAuthTypes } from "@react-native-firebase/auth";
import TabNavigator from "./tab";

import Login from "../pages/login";
import Cadastro from "../pages/Cadastrar";
import Detail from "../pages/Detail";
import DetailNew from "../pages/DetailNew";

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
            <Stack.Screen name="Tab" component={TabNavigator} options={{headerShown: false}}/> 
            <Stack.Screen name="Details" component={Detail}/>
            <Stack.Screen name="DetailsNew" component={DetailNew}/>
        </Stack.Navigator>
    </NavigationContainer>
);
}

