import React, { useState } from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";

import NewProject from "../../pages/userRegular/New";
import RecommendedScreen from "../../pages/userRegular/Recommended";

const Top = createMaterialTopTabNavigator();

export default function TopUserProject(){
    return(
            <Top.Navigator    
                screenOptions={{
                    tabBarStyle: { backgroundColor: "#663399" },
                    tabBarLabelStyle: { fontWeight: "bold", color: '#fff' },
                    tabBarIndicatorStyle: { backgroundColor: "#1C1C1C" },
                }}  
            >
                <Top.Screen name="NewProject" component={NewProject} options={{ title: 'Todos os projetos' }} />
                <Top.Screen name="Recommended" component={RecommendedScreen} options={{ title: 'Recomendações' }}/> 
            </Top.Navigator>
    )
}