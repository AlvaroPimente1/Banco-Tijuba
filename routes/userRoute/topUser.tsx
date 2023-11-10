import React, { useState } from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";

import Detail from "../../pages/userRegular/Detail";
import TimeLineUserScreen from "../../pages/userRegular/TimeLineUser";
import DoacaoUserScreen from "../../pages/userRegular/DoacaoUser";

const Top = createMaterialTopTabNavigator();

export default function TopUser(){
    return(
            <Top.Navigator    
                screenOptions={{
                    tabBarStyle: { backgroundColor: "#663399" },
                    tabBarLabelStyle: { fontWeight: "bold", color: '#fff' },
                    tabBarIndicatorStyle: { backgroundColor: "#1C1C1C" },
                }}  
            >
                <Top.Screen name="Detail" component={Detail} options={{ title: 'Detalhes' }} />
                <Top.Screen name="TimeLineUser" component={TimeLineUserScreen} options={{ title: 'TimeLine' }}/>
                <Top.Screen name="DoacaoUser" component={DoacaoUserScreen} options={{ title: 'Mural Doação' }}/>
            </Top.Navigator>
    )
}