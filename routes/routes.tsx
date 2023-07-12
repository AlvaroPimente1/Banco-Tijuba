import React, { useState, useEffect } from "react";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { createDrawerNavigator } from "@react-navigation/drawer";

import Login from "../pages/login";
import NewProject from "../pages/New";
import ListProject from "../pages/List";
import Cadastro from "../pages/Cadastrar";
import Detail from "../pages/Detail";
import DetailNew from "../pages/DetailNew";
import ChatBot from "../pages/ChatBot";
import { Image } from "react-native";


const Tab = createBottomTabNavigator();

function TabNavigator(){

    return(
        <Tab.Navigator
        screenOptions={{
            headerStyle: { backgroundColor: '#663399' },
            headerTintColor: '#fff',
            headerTitleStyle: { fontWeight: 'bold'},
            tabBarActiveBackgroundColor: '#663399',
            tabBarInactiveBackgroundColor: '#8a63d2',
            }}
            >
                <Tab.Screen name="List" component={ListProject} 
                    options={{
                        tabBarIcon: () => {
                            return <Image source={require('../assets/images/casa.png')} style={{width: 20, height: 20}}/>
                        },
                        tabBarLabelStyle: {
                            fontSize: 12,
                            fontWeight: 'bold',
                            color: '#1C1C1C',
                            marginBottom: 2
                        },
                        tabBarLabel: 'Meus Projetos',
                        headerTitle: 'Meus Projetos',
                    }}
                />    

                <Tab.Screen name="Bot" component={ChatBot}
                    options={{
                        tabBarIcon: () => {
                            return <Image source={require('../assets/images/roboGrande.png')} style={{width: 30, height: 30}}/>
                        },
                    tabBarLabelStyle: {
                        fontSize: 12,
                        fontWeight: 'bold',
                        color: '#1C1C1C',
                        marginBottom: 2
                    },
                        tabBarLabel: 'ChatBot',
                        headerTitle: 'Bot',
                        
                    }}
                />

                <Tab.Screen name="New" component={NewProject} 
                        options={{
                            tabBarIcon: () => {
                                return <Image source={require('../assets/images/mais.png')} style={{width: 20, height: 20}}/>
                        },
                        tabBarLabelStyle: {
                            fontSize: 12,
                            fontWeight: 'bold',
                            color: '#1C1C1C',
                            marginBottom: 2
                        },
                        tabBarLabel: 'Novo Projeto',
                        headerTitle: 'Projetos disponíveis'
                        
                    }}
                />    
        </Tab.Navigator>
    )
}

const Stack = createNativeStackNavigator();

export default function Routes(){
/* 
    const[user, setUser] = useState<FirebaseAuthTypes.User | null>(null);

    useEffect(() =>{
        const subscriber = auth().onAuthStateChanged(setUser);

        return subscriber
    }, []) */
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

