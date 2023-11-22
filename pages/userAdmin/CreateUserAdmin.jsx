import { ReactNativeFirebase } from "@react-native-firebase/app";
import React, { useState } from "react";
import { Text, TouchableOpacity, View, Image, TextInput, Alert } from "react-native";
import { KeyboardAvoidingView, StyleSheet, TouchableWithoutFeedback } from "react-native";
import { StatusBar } from "react-native";
import firestore from '@react-native-firebase/firestore';
import getUserID from "../../firebase/api/user/getUserID";
import auth from '@react-native-firebase/auth';

export default function CreaterUserAdmin({ navigation }){
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [nome, setNome] = useState('');
    const [numero, setNumero] = useState('');


    async function criaContaAdmin() {
        try {
            await auth().createUserWithEmailAndPassword(email, senha);
            Alert.alert('Usuário criado com sucesso!');
        
            await firestore()
                .collection('usuarios_admin')
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
                        <View>
                            <Text style={styles.titulo}>Cadastrar usuário MMIB</Text>
                        </View>
                        <TextInput
                            style={styles.input}
                            placeholder={'Nome'}
                            placeholderTextColor={"#fff"}
                            KeyboardAvoidingView="enable"
                            value={nome}
                            onChangeText={setNome}
                        />

                        <TextInput
                            style={styles.input}
                            placeholder={'Número de telefone'}
                            placeholderTextColor={"#fff"}
                            KeyboardAvoidingView="enable"
                            keyboardType="numeric"
                            value={numero}
                            onChangeText={setNumero}
                        />

                        
                        <TextInput
                            style={styles.input}
                            placeholder={'E-mail'}
                            placeholderTextColor={"#fff"}
                            KeyboardAvoidingView="enable"
                            value={email}
                            onChangeText={setEmail}
                        />
                        <TextInput
                            style={styles.input}
                            placeholder={'Senha'}
                            placeholderTextColor={"#fff"}
                            KeyboardAvoidingView="enable"
                            secureTextEntry={true}
                            value={senha}
                            onChangeText={setSenha}
                        />

                        <TouchableOpacity
                            style={styles.botao}
                            onPress={criaContaAdmin}
                        >
                            <Text style={styles.textoBotao}>Cadastrar usuario</Text>
                        </TouchableOpacity>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#1C1C1C',
        alignItems: 'center',
        justifyContent: 'space-evenly'
    },

    conteudo: {
        
    },

    input: {
        borderBottomWidth: 1,
        borderColor: '#663399',
        width: 300,
        color: '#fff'
    },

    botao: {
        paddingHorizontal: 10,
        paddingVertical: 8,
        backgroundColor: '#663399',
        borderRadius: 20
    },

    textoBotao: {
        color: '#fff',        
    },

    titulo: {
        color: '#fff',
        fontSize: 20
    }
})