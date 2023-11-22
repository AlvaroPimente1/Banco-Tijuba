import React from "react";
import { SafeAreaView, View, Text, StyleSheet, TextInput } from "react-native";

export default function RelatorioCompromissoScreen({ route }){
    const compromisso = route.params.compromisso;

    return(
        <SafeAreaView style={styles.container}>
            <Text>{compromisso.titulo_compromisso}</Text>
            <TextInput
                style={styles.textArea}
                placeholder="Relatorio..."
                placeholderTextColor="#fff"
                numberOfLines={10}
                multiline={true}
            />
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#1C1C1C',
        alignItems: 'center'
    },

    textArea: {
        height: '40%', 
        justifyContent: "flex-start",
        borderWidth: 1,
        borderColor: "#663399",
        padding: 13,
        borderRadius: 15,
        textAlignVertical: 'top', 
        width: 300,
    }
})