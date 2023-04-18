import React from "react";
import { SafeAreaView, View, Text, TextInput, StyleSheet } from 'react-native';

export default function ListProject(){

function renderItem({ item }){
    return(
        <View>
            <Text>{item.nome}</Text>
        </View>
    )
}

    return(
        <SafeAreaView style={styles.conteiner}>
            <Text>Tela de listar projetos</Text>
        </SafeAreaView>
    );
}


const styles = StyleSheet.create({
    conteiner: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#D8BFD8'
    }
})