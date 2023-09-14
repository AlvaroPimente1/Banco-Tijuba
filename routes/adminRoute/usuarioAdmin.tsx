import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import TabAdmin from "./tabAdmin";
import DetailAdmin from "../../pages/userAdmin/DetailsAdmin";

const Stack = createNativeStackNavigator();

export default function AdminRoute(){
    return(
        <Stack.Navigator
            screenOptions={{
                headerStyle: { backgroundColor: '#663399' },
                headerTintColor: '#fff',
                headerTitleStyle: { fontWeight: 'bold'},
                }}        
        >
            <Stack.Screen name="Tab" component={TabAdmin} options={{headerShown: false}}/>
            <Stack.Screen name="DetailAdmin" component={DetailAdmin} />
        </Stack.Navigator>
    )
}