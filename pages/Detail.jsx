import React from "react";
import { SafeAreaView, View, Text, StyleSheet } from "react-native";


export default function Details({ route }){

    const projetos = route.params.projetos;

    return(
        <SafeAreaView style={styles.conteiner}>
            <Text style={styles.textoLista}>{projetos.nome}</Text>
        </SafeAreaView>
    );
}


const styles = StyleSheet.create({
    conteiner: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#1C1C1C'
    },

    textoLista: {
        color: '#F5F5F5',
        alignSelf: 'center',
    },
})