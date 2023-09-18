import React, { useState } from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";

import DetailAdmin from "../../pages/userAdmin/DetailsAdmin";
import TimeLineScreen from "../../pages/userAdmin/TimeLine";

const Top = createMaterialTopTabNavigator();

export default function TopAdmin(){
    return(
            <Top.Navigator    
                screenOptions={{
                    tabBarStyle: { backgroundColor: "#663399" },
                    tabBarLabelStyle: { fontWeight: "bold", color: '#fff' },
                    tabBarIndicatorStyle: { backgroundColor: "#1C1C1C" },
                }}  
            >
                <Top.Screen name="DetailAdmin" component={DetailAdmin} />
                <Top.Screen name="TimeLine" component={TimeLineScreen} />
            </Top.Navigator>
    )
}