import React from "react";
import { SafeAreaView, View, Text, TextInput, StyleSheet } from 'react-native';

export default function NewProject(){

    return(
        <SafeAreaView style={styles.conteiner}>
            <Text>Tela de cadastrar novo projeto</Text>
        </SafeAreaView>
    );
}


const styles = StyleSheet.create({
    conteiner: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#1C1C1C'
    }
})