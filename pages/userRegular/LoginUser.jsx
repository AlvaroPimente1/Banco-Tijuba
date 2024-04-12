import React from "react";
import { Text, TouchableOpacity, View, Image, TextInput, Alert } from "react-native";
import { KeyboardAvoidingView, Keyboard, TouchableWithoutFeedback } from "react-native";
import styles from "../../style/loginStyles";
import { StatusBar } from "react-native";
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

export default function LoginUser({ navigation }){

    const [email, setEmail] = React.useState('');
    const [senha, setSenha] = React.useState('');

    async function usuarioLogin() {
        try {
            await auth().signInWithEmailAndPassword(email, senha);
            const user = auth().currentUser;
            
            if (user) {
                const usuariosRef = firestore().collection('usuarios');
                const userDoc = await usuariosRef.doc(user.uid).get();
                const userDocData = await userDoc.data()

                if (userDoc.exists) {
                    if(userDocData.primeiro_login){
                        navigation.navigate('TermosUso', { admin: false });
                    } else {
                        navigation.navigate('UserRoute');
                        setEmail('');
                        setSenha('');
                    }
                } else {
                    Alert.alert('Acesso Negado', 'Sua conta é de Administrador!');
                    auth().signOut();
                    navigation.navigate('LoginAdmin');
                }
            }
        } catch (error) {
            if (error.code === 'auth/user-not-found') {
                Alert.alert('Usuário não encontrado!');
            } else if (error.code === 'auth/wrong-password') {
                Alert.alert('Senha incorreta!');
            } else {
                Alert.alert('Erro', 'Ocorreu um erro durante o login. Tente novamente mais tarde.');
                console.error(error);
            }
        }
    }


    async function esqueciSenha(){
        if(email === ''){
            Alert.alert('Erro', 'Insira o e-mail vinculado a conta.')
        } 
        else{
            try{
                await auth().
                sendPasswordResetEmail(email)
                Alert.alert('Concluído', `Um e-mail foi enviado para ${email}.`)
            } catch (error) {
                if (error.code === 'auth/user-not-found') {
                    Alert.alert('Usuário não encontrado!');
                } else if (error.code === 'auth/invalid-email') {
                    Alert.alert('Endereço de email inválido!');
                } 
                else {
                    Alert.alert('Erro', 'Ocorreu um erro ao enviar o email de redefinição de senha. Tente novamente mais tarde.');
                    console.error(error);
                }
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
                        <View style={styles.logoContainer}>
                            <Image
                                style={styles.logo}
                                source={require('../../assets/images/BanCotijuba_3.png')}
                            />
                        </View>
                        <View>
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
                        </View>

                        <TouchableOpacity
                            style={styles.botao}
                            onPress={usuarioLogin}
                        >
                            <Text style={styles.textoBotao}>Entrar</Text>
                        </TouchableOpacity>
                        
                        <TouchableOpacity
                            onPress={() => navigation.navigate('Cadastro')}
                        >
                            <Text style={styles.textoMenor}>Não tem uma conta? Crie sua conta</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            onPress={() => navigation.navigate('LoginAdmin')}
                        >
                            <Text style={styles.textoMenor}>É do MMIB? Entre por aqui</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            onPress={esqueciSenha}
                        >
                            <Text style={styles.textoMenor}>Esqueci a minha senha</Text>
                        </TouchableOpacity>

                    </View>
                </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
            
    );
}