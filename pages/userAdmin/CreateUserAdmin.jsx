import { ReactNativeFirebase } from "@react-native-firebase/app";
import React, { useState } from "react";
import { Text, TouchableOpacity, View, Image, TextInput, Alert } from "react-native";
import { KeyboardAvoidingView, Keyboard, TouchableWithoutFeedback } from "react-native";
import { StatusBar } from "react-native";
import styles from "../../style/cadastroStyles";
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
                <StatusBar
                barStyle="light-content"
                backgroundColor="transparent"
                translucent
                />
                <TouchableWithoutFeedback>
                    <View style={styles.conteudo}>
                        <Text style={{ color: '#fff' }}>Criar usuário administrador Mmib</Text>
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
                            onPress={criaContaAdmin}
                        >
                            <Text style={styles.textoBotao}>Cadastrar usuario</Text>
                        </TouchableOpacity>
                    </View>
                </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    );
}
