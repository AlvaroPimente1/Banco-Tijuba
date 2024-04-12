import { ReactNativeFirebase } from "@react-native-firebase/app";
import React, { useState } from "react";
import { Text, TouchableOpacity, View, Image, TextInput, Alert } from "react-native";
import { KeyboardAvoidingView, Keyboard, TouchableWithoutFeedback } from "react-native";
import { StatusBar } from "react-native";
import styles from "../style/cadastroStyles";
import firestore from '@react-native-firebase/firestore';
import getUserID from "../firebase/api/user/getUserID";
import auth from '@react-native-firebase/auth';

export default function Cadastrar({ navigation }){
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [nome, setNome] = useState('');
    const [numero, setNumero] = useState('');

    async function criaConta() {
        if(email != '' || senha != '' || nome != '' || numero != ''){
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
                        telefone: numero,
                        primeiro_login: true,
                        Ambiental: 1,
                        Social: 1,
                        Saude: 1,
                        Educacional: 1,
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
        } else {
            Alert.alert('Erro', 'É necessário preencher todos os campos para criar conta.')
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
                            maxLength={13}
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
