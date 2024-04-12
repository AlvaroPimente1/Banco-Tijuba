import React, { useState, useEffect } from "react";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ParamContext from "../context/projetoContext";

import UserRoute from "./userRoute/usuarioApoiador";
import AdminRoute from "./adminRoute/usuarioAdmin";

import Cadastro from "../pages/Cadastrar";
import LoginUser from "../pages/userRegular/LoginUser";
import LoginAdmin from "../pages/userAdmin/loginAdmin";
import TermosUso from "../pages/userAdmin/TermosUso";


const Stack = createNativeStackNavigator();

export default function Routes(){
    const [params, setParams] = useState({});
    
    return(
        <ParamContext.Provider value={{ params, setParams }}>
            <NavigationContainer>
                <Stack.Navigator>
                    <Stack.Screen name="LoginUser" component={LoginUser} options={{ presentation: 'modal' , headerTitle: 'Entrar', headerShown: false}}/>
                    <Stack.Screen name="Cadastro" component={Cadastro} options={{ presentation: 'modal' , headerTitle: 'Cadastro', headerShown: false}}/>
                    <Stack.Screen name="UserRoute" component={UserRoute} options={{ presentation: 'modal' , headerTitle: 'Entrar', headerShown: false}}/>
                    <Stack.Screen name="LoginAdmin" component={LoginAdmin} options={{headerShown: false}}/>
                    <Stack.Screen name="AdminRoute" component={AdminRoute} options={{ presentation: 'modal', headerShown: false}}/>
                    <Stack.Screen name="TermosUso" component={TermosUso} options={{ presentation: 'modal', headerShown: false}}/>
                </Stack.Navigator>
            </NavigationContainer>
        </ParamContext.Provider>
);
}

