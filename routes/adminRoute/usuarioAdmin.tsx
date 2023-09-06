import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import MainAdmin from "../../pages/userAdmin";
import LoginAdmin from "../../pages/userAdmin/loginAdmin";

const Stack = createNativeStackNavigator();

export default function AdminRoute(){
    return(
        <Stack.Navigator>
            <Stack.Screen name="teste" component={MainAdmin}/>
        </Stack.Navigator>
    )
}