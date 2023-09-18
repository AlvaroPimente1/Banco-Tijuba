import React, { useEffect } from "react";
import styles from "../../style/commonsStyles";
import { SafeAreaView, Text } from "react-native";
import getOverView from "../../firebase/api/admin/getOverView";

export default function OverViewScreen(){
    const {
        countProjects,
        qtdProjetos,
        setQtdProjetos
    } = getOverView();

    useEffect(() => {
        countProjects();
    }, []);  

    return(
        <SafeAreaView style={styles.conteiner}>
            <Text style={{ color: '#fff' }}>{qtdProjetos}</Text>
        </SafeAreaView>
    )
}