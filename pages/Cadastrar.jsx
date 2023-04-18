import React from "react";
import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View, Image, TextInput } from "react-native";
import { KeyboardAvoidingView } from "react-native";
import { StatusBar } from "react-native";

export default function Cadastro({ navigation }){
    
    return(
        <SafeAreaView style={styles.container}>
            <StatusBar
                barStyle="light-content"
                backgroundColor="transparent"
                translucent
            />

            <KeyboardAvoidingView
                behavior='padding'
            >
                <View style={styles.conteudo}>
                    <Image
                        style={styles.logo}
                        source={require('../assets/images/BanCotijuba_3.png')}
                    />
                    
                    
                    <TextInput
                        style={styles.input}
                        placeholder={'Insira seu e-mail'}
                        placeholderTextColor={"grey"}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder={'Insira sua senha'}
                        placeholderTextColor={"grey"}
                    />

                    <TouchableOpacity
                        style={styles.botao}
                        onPress={()=> navigation.navigate('Home')}
                    >
                        <Text style={styles.textoBotao}>Log-In</Text>
                    </TouchableOpacity>
                    
                    <TouchableOpacity
                    >
                        <Text style={styles.textoMenor}>Não tem uma conta? Crie sua conta</Text>
                    </TouchableOpacity>
                </View>
            </KeyboardAvoidingView>
            </SafeAreaView>
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#1C1C1C',
        alignItems: 'center',
        
},

    texto: {
        color: '#fff',
},

conteudo: {
    paddingVertical: 150
},

logo: {
    width: 200,
    height: 200,
    marginBottom: 30
},

input: {
    borderWidth: 2,
    borderColor: '#663399',
    paddingHorizontal: 12,
    paddingVertical: 1,
    color: "#fff",
    borderRadius: 10,
    marginBottom: 20
},

botao: {
    backgroundColor: '#663399',
    paddingVertical: 8,
    borderRadius: 20,
},

textoBotao: {
    color: '#D8BFD8',
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
},

textoMenor: {
    fontSize: 7,
    color: '#D8BFD8',
    alignSelf: 'center',
    marginTop: 10
}
})