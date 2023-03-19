import React from "react";
import { View ,SafeAreaView, Text, TouchableOpacity, StyleSheet , StatusBar} from "react-native";

export default function Home({}){

return(
    <SafeAreaView style={styles.container}>
    <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
    />

    <View style={styles.bordaTexto}>
        <Text style={styles.texto}>Banco-{'\n'}Tijuba</Text>
    </View>

    <View style={{marginTop: 40}}>
        <TouchableOpacity style={styles.botao}>
            <Text style={styles.textoBotao}>Lista de projetos</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.botao}>
            <Text style={styles.textoBotao}>Novo projeto</Text>
        </TouchableOpacity>
    </View>
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
    bordaTexto:{
        borderWidth: 3,
        borderColor: '#000',
        borderTopRightRadius: 30,
        borderBottomLeftRadius: 30,
        borderBottomRightRadius: 10,
        borderTopLeftRadius: 10,
},
    texto: {
        fontSize: 32,
        fontWeight: 'bold',
        textAlign: 'center',
        marginVertical: 32,
        paddingHorizontal: 20,
        color: '#000',
},
    botao: {
        backgroundColor: '#663399',
        paddingVertical: 16,
        paddingHorizontal: 32,
        borderRadius: 8,
        marginVertical: 16,
},
    textoBotao: {
        color: '#D8BFD8',
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
},
});
