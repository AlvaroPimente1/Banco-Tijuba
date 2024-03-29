import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import TabNavigator from "./tab";
import CommentsUserScreen from "../../pages/userRegular/CommentsUser";
import DetailNew from "../../pages/userRegular/DetailNew";
import PerfilUsuario from "../../pages/userRegular/Perfil";
import TopUser from "./topUser";
import DetailRecommendScreen from "../../pages/userRegular/DetailRecommend";

const Stack = createNativeStackNavigator();

export default function UserRoute(){
    return(
        <Stack.Navigator
            screenOptions={{
                headerStyle: { backgroundColor: '#663399' },
                headerTintColor: '#fff',
                headerTitleStyle: { fontWeight: 'bold'},
                }}
        >
            <Stack.Screen name="Tab" component={TabNavigator} options={{headerShown: false}}/> 
            <Stack.Screen name="TopUser" component={TopUser} options={{ presentation: 'modal' , headerTitle: ''}} />
            <Stack.Screen name="DetailsNew" component={DetailNew} options={{ title: 'Detalhes' }}/>
            <Stack.Screen name="Perfil" component={PerfilUsuario} />
            <Stack.Screen name="Comments" component={CommentsUserScreen} options={{ title: 'Comentários' }}/>
            <Stack.Screen name="DetailsRecommend" component={DetailRecommendScreen} options={{ title: 'Detalhes' }}/>
        </Stack.Navigator>
    )
}