import React, { useState } from "react";
import { SafeAreaView, View, Text, TouchableOpacity, Image } from "react-native";
import getPermission from "../../firebase/api/shared/getPermissions";
import { StyleSheet } from "react-native";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import firestore from '@react-native-firebase/firestore';
import getUserID from "../../firebase/api/user/getUserID";

export default function TermosUso({ route, navigation }){
    const [ isAceito, setIsAceito ] = useState(false);
    const admin = route.params.admin;
    const userId = getUserID();


    const handleCheck = () => {
        isAceito ? setIsAceito(false) : setIsAceito(true);
    }

    const setPrimeiroLoginFalseAndPermission = async () => {
        try {
            let userCollection = admin ? 'usuarios_admin' : 'usuarios';
            const userRef = firestore().collection(userCollection).doc(getUserID());
    
            await getPermission(); 
    
            await userRef.update({
                primeiro_login: false
            });

            admin ? navigation.replace('AdminRoute') : navigation.replace('UserRoute');
        } catch (error) {
            console.error("Erro ao atualizar o status do primeiro login:", error);
        }
    }
    

    return(
        <SafeAreaView style={styles.container}>
            <Text style={{ color: '#fff', fontSize: 30 }}>Termos de uso</Text>
                <View style={styles.conteudo}>
                    <Text style={{ color: '#fff' }}>O Banco-Tijuba solicita permissão para acessar a câmera e biblioteca de fotos do seu dispositivo para oferecer recursos como anexar e capturar fotos. Além disso, coletamos informações pessoais, como nome, e-mail e número de telefone, para personalizar sua experiência e fornecer os serviços solicitados. Suas informações são protegidas e não compartilhadas sem seu consentimento. Ao utilizar o Banco-Tijuba, você concorda com nossos termos de uso e política de privacidade. Dúvidas? Entre em contato via e-mail bancotijuba@gmail.com.</Text>
                </View>
                <View style={{ width: '85%' }}>
                    <BouncyCheckbox 
                        onPress={(isChecked) => {handleCheck()}}
                        fillColor={'#663399'}
                        textStyle={styles.textStyle}
                        text="Aceito e concordo com termos e dou as permissões necessárias"
                    />
                </View>
                {
                    isAceito && 
                    <View>
                        <TouchableOpacity style={styles.botaoAvancar}
                            onPress={setPrimeiroLoginFalseAndPermission}
                        >
                            <Text style={{ color: '#fff', marginRight: 2 }}>Avançar</Text>
                            <Image source={require('../../assets/images/setaDireita.png')} style={{ width: 25, height: 25 }}/>
                        </TouchableOpacity>
                    </View>
                }
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#1C1C1C',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 100
    },

    conteudo: {
        paddingHorizontal: 20,
        paddingVertical: 25,
        backgroundColor: '#444444',
        borderRadius: 10,
        width: '80%'
    },

    textStyle: {
        color: '#fff',
        fontWeight: '600',
        textDecorationLine: 'none'
    },

    botaoAvancar: {
        flexDirection: 'row',
        justifyContent: 'center', 
        alignItems: 'center',
        backgroundColor: '#663399',
        padding: 10,
        borderRadius: 15
    }
})