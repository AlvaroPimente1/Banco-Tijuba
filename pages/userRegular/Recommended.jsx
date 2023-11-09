import React from "react";
import { SafeAreaView, View, Text } from "react-native";
import styles from "../../style/commonsStyles";

export default function RecommendedScreen(){

    return(
        <SafeAreaView style={styles.conteiner}>
            <Text style={{ color: '#fff' }}>Projetos Recomedados</Text>
        </SafeAreaView>
    )
}