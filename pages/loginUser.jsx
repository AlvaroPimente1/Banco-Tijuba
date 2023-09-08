import React from "react";
import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View, Image, TextInput, Alert } from "react-native";
import { KeyboardAvoidingView, Keyboard, TouchableWithoutFeedback } from "react-native";
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

                if (userDoc.exists) {
                    Alert.alert("Bem vindo!", "Login efetuado com sucesso.");
                    navigation.navigate('UserRoute');
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


    function esqueciSenha(){
        auth().
        sendPasswordResetEmail(email).
        then(() => Alert.alert('Redefinir Senha', 'Enviamos um e-mail para você')).
        catch(error => {
            if (error.code === 'auth/user-not-found') {
                Alert.alert('Usuário não encontrado!');
            }         
            if (error.code === 'auth/user-not-found') {
                Alert.alert('Usuário não encontrado!');
            }    
            console.log(error)
        })
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
                                source={require('../assets/images/BanCotijuba_3.png')}
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
    paddingVertical: 150,
},

logoContainer: {
    width: 200,
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
},
logo: {
    width: '100%',
    height: '100%',
},

input: {
    borderWidth: 2,
    borderColor: '#663399',
    paddingHorizontal: 12,
    paddingVertical: 1,
    color: "#fff",
    borderRadius: 10,
    marginBottom: 20,
    width: 200
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