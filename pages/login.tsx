import React from "react";
import { SafeAreaView, StyleSheet, Text } from "react-native";


export default function Login(){
    
    return(
        <SafeAreaView style={styles.container}>
            <Text>Tela Login a fazer</Text>
        </SafeAreaView>
    );
}


const styles = StyleSheet.create({
    container: {
        paddingBottom: 100,
        flex: 1,
        backgroundColor: '#D8BFD8',
        alignItems: 'center',
        justifyContent: 'center',
},
    texto: {
        fontSize: 32,
        fontWeight: 'bold',
        textAlign: 'center',
        marginVertical: 32,
        paddingHorizontal: 20,
        color: '#000',
},

})