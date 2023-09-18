import React from "react";
import { Image, TouchableOpacity } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import ListAdmin from "../../pages/userAdmin/Projects";
import DrawerAdmin from "./drawerAdmin";

const Tab = createBottomTabNavigator();

export default function TabAdmin(){
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
            <Tab.Screen
                name="List"
                component={ListAdmin}
                options={() => ({
                    tabBarIcon: () => {
                    return <Image source={require('../../assets/images/casa.png')} style={{ width: 20, height: 20 }} />;
                    },
                    tabBarLabelStyle: {
                    fontSize: 12,
                    fontWeight: 'bold',
                    color: '#1C1C1C',
                    marginBottom: 2,
                    },
                    tabBarLabel: 'Feed de projetos',
                    headerTitle: 'Olá, Mmib',
                })}
            />

            <Tab.Screen name="Drawer" component={DrawerAdmin} 
                    options={{
                        tabBarIcon: () => {
                            return <Image source={require('../../assets/images/org.png')} style={{width: 40, height: 40}}/>
                        },
                    tabBarLabelStyle: {
                        fontSize: 12,
                        fontWeight: 'bold',
                        color: '#1C1C1C',
                        marginBottom: 2
                    },
                    tabBarLabel: 'Gestão',
                    headerShown: false
                }}
            />    
        </Tab.Navigator>
    )
}