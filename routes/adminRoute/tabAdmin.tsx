import React from "react";
import { Image, TouchableOpacity } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import ListAdmin from "../../pages/userAdmin/Projects";
import AddProjectScreen from "../../pages/userAdmin/AddProject";

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
                options={({ navigation }) => ({
                    tabBarIcon: () => {
                    return <Image source={require('../../assets/images/casa.png')} style={{ width: 20, height: 20 }} />;
                    },
                    tabBarLabelStyle: {
                    fontSize: 12,
                    fontWeight: 'bold',
                    color: '#1C1C1C',
                    marginBottom: 2,
                    },
                    tabBarLabel: 'Todos os Projetos',
                    headerTitle: 'Meus Projetos',
                    headerRight: () => (
                    <TouchableOpacity
                        onPress={() => {
                            navigation.navigate('Perfil'); 
                        }}
                        style={{ marginRight: 20 }}
                    >
                        <Image source={require('../../assets/images/user.png')} style={{ width: 40, height: 40, borderRadius: 20 }} />
                    </TouchableOpacity>
                    ),
                })}
            />

            <Tab.Screen name="New" component={AddProjectScreen} 
                    options={{
                        tabBarIcon: () => {
                            return <Image source={require('../../assets/images/mais.png')} style={{width: 20, height: 20}}/>
                        },
                    tabBarLabelStyle: {
                        fontSize: 12,
                        fontWeight: 'bold',
                        color: '#1C1C1C',
                        marginBottom: 2
                    },
                    tabBarLabel: 'Criar Novo Projeto',
                    headerTitle: 'Novo Projeto'
                }}
            />    
        </Tab.Navigator>
    )
}