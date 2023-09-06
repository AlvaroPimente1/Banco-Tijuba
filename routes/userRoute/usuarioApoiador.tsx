import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import TabNavigator from "./tab";
import Detail from "../../pages/userRegular/Detail";
import DetailNew from "../../pages/userRegular/DetailNew";
import PerfilUsuario from "../../pages/userRegular/Perfil";

const Stack = createNativeStackNavigator();

export default function UserRoute(){
    return(
        <Stack.Navigator>
            <Stack.Screen name="Tab" component={TabNavigator} options={{headerShown: false}}/> 
            <Stack.Screen name="Details" component={Detail} />
            <Stack.Screen name="DetailsNew" component={DetailNew}/>
            <Stack.Screen name="Perfil" component={PerfilUsuario}/>
        </Stack.Navigator>
    )
}