import { ReactNativeFirebase } from "@react-native-firebase/app";
import React, { useState } from "react";
import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View, Image, TextInput, Alert } from "react-native";
import { KeyboardAvoidingView, Keyboard, TouchableWithoutFeedback } from "react-native";
import { StatusBar } from "react-native";
import firestore from '@react-native-firebase/firestore';
import getUserID from "../firebase/getUserID";
import auth from '@react-native-firebase/auth';

export default function Cadastrar({ navigation }){
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [nome, setNome] = useState('');
    const [numero, setNumero] = useState('');


    async function criaConta() {
        try {
            await auth().createUserWithEmailAndPassword(email, senha);
            Alert.alert('Usuário criado com sucesso!');
            navigation.navigate('LoginUser');
        
            await firestore()
                .collection('usuarios')
                .doc(getUserID())
                .set({
                nome: nome,
                email: email,
                telefone: numero
                });
        
            console.log('Sessão de usuário criada');
            } catch (error) {
                if (error.code === 'auth/email-already-in-use') {
                    Alert.alert('Esse email já está em uso!');
                } else if (error.code === 'auth/invalid-email') {
                    Alert.alert('Email inválido!');
                } else {
                    Alert.alert('Erro', 'Ocorreu um erro durante a criação de conta. Tente novamente mais tarde.');
                    console.error(error);
                }
            }
    }

    return(
        <KeyboardAvoidingView
                behavior='padding'
                style={styles.container}
            >
                <StatusBar
                barStyle="light-content"
                backgroundColor="transparent"
                translucent
                />
                <TouchableWithoutFeedback>
                    <View style={styles.conteudo}>
                        <Image
                            style={styles.logo}
                            source={require('../assets/images/BanCotijuba_3.png')}
                        />
                        
                        <TextInput
                            style={styles.input}
                            placeholder={'Insira seu nome'}
                            placeholderTextColor={"grey"}
                            KeyboardAvoidingView="enable"
                            value={nome}
                            onChangeText={setNome}
                        />

                        <TextInput
                            style={styles.input}
                            placeholder={'Número de telefone'}
                            placeholderTextColor={"grey"}
                            KeyboardAvoidingView="enable"
                            keyboardType="numeric"
                            value={numero}
                            onChangeText={setNumero}
                        />

                        
                        <TextInput
                            style={styles.input}
                            placeholder={'Insira seu e-mail'}
                            placeholderTextColor={"grey"}
                            KeyboardAvoidingView="enable"
                            value={email}
                            onChangeText={setEmail}
                        />
                        <TextInput
                            style={styles.input}
                            placeholder={'Insira sua senha'}
                            placeholderTextColor={"grey"}
                            KeyboardAvoidingView="enable"
                            secureTextEntry={true}
                            value={senha}
                            onChangeText={setSenha}
                        />

                        <TouchableOpacity
                            style={styles.botao}
                            onPress={criaConta}
                        >
                            <Text style={styles.textoBotao}>Cadastrar usuario</Text>
                        </TouchableOpacity>
                        
                        <TouchableOpacity
                            onPress={() => navigation.navigate('LoginUser')}
                        >
                            <Text style={styles.textoMenor}>Já tem conta? Faça Login</Text>
                        </TouchableOpacity>
                    </View>
                </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
            
    );
}


const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: '#1C1C1C',
        alignItems: 'center',
        justifyContent: 'center',
        paddingBottom: 100
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
    fontSize: 9,
    color: '#D8BFD8',
    alignSelf: 'center',
    marginTop: 10
}
})