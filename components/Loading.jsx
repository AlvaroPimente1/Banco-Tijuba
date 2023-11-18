import React from "react";
import { View, ActivityIndicator, Text, StyleSheet, SafeAreaView } from "react-native";

export default function Loading(){
    return(
        <SafeAreaView style={styles.container}>
            <View style={styles.aviso}>
                <ActivityIndicator size="large" color="#fff" />
                <Text style={{ color: '#fff', marginTop: 5 }}>Carregando informações</Text>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1, 
        backgroundColor: '#1C1C1C',
        alignItems: 'center',
        justifyContent: 'center'
    },

    aviso: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#333333',
        paddingHorizontal: 20,
        paddingVertical: 20,
        borderRadius: 15,
        borderWidth: 1,
        borderColor: '#663399',
    },
})