import React from "react";
import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View, Image, TextInput, Alert } from "react-native";
import { KeyboardAvoidingView, Keyboard, TouchableWithoutFeedback } from "react-native";
import { StatusBar } from "react-native";
import auth from '@react-native-firebase/auth';


export default function Login({ navigation }){

    const [email, setEmail] = React.useState('');
    const [senha, setSenha] = React.useState('');

    function usuarioLogin(){
        auth()
        .signInWithEmailAndPassword(email, senha)
        .then(() => {
            Alert.alert('Login realizado com sucesso!');
            navigation.navigate('Tab')
        })
        .catch(error => {
            if (error.code === 'auth/user-not-found') {
                Alert.alert('Usuário não encontrado!');
            }

            if (error.code === 'auth/wrong-password') {
                Alert.alert('Senha incorreta!');
            }

            if(error.code === 'auth/')

            console.error(error);
        });
        }

    function esqueciSenha(){
        auth().
        sendPasswordResetEmail(email).
        then(() => Alert.alert('Redefinir Senha', 'Enviamos um e-mail para você')).
        catch(error => console.log(error))

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