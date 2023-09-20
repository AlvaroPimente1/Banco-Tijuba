import React, { useState } from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";

import Detail from "../../pages/userRegular/Detail";
import TimeLineScreen from "../../pages/userAdmin/TimeLine";

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
                <Top.Screen name="Detail" component={Detail} />
                <Top.Screen name="TimeLine" component={TimeLineScreen} />
            </Top.Navigator>
    )
}