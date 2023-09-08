import React, { useState } from "react";
import { View, SafeAreaView, Text, StyleSheet, ScrollView, Image, TouchableOpacity, Alert } from "react-native";
import firestore from '@react-native-firebase/firestore';
import getUserID from "../../firebase/getUserID";
import ImageConteiner from "../../components/ImagemConteiner";

export default function DetailNew({ route }){
    const projetos = route.params.projetos;
    
    function adicionarProjetoAoUsuario() {
        const userID = getUserID();
        const userRef = firestore().collection('usuarios').doc(userID).collection('projetos_usuario');
        
        userRef.add({
            projetoRef: firestore().collection('projetos').doc(projetos.id),
            dt_entrada: firestore.FieldValue.serverTimestamp(),
        })
        .then(() => {
            const projetoRef = firestore().collection('projetos').doc(projetos.id);
        
            projetoRef.update({
                participantesProjeto: firestore.FieldValue.arrayUnion(userID)
            })
            
            .then(() => {
            Alert.alert("Projeto adicionado com sucesso ao usuário!");
            })
            
            .catch((error) => {
            Alert.alert("Erro ao adicionar o projeto ao usuário!", error.message);
            });
        }).catch((error) => {
            Alert.alert("Erro ao adicionar o projeto ao usuário!", error.message);
        });
    }
    
    return(
        <SafeAreaView style={styles.conteiner}>
            <ImageConteiner source={require('../../assets/images/imagemTeste.png')} />
            <ScrollView>
                    <Text style={styles.name}>{projetos.nome_projeto}</Text>
                <View style={styles.descriptionConteiner}>
                    <Text style={styles.description}>{projetos.descricao}</Text>
                </View>

                <View style={styles.buttonConteiner}>
                    <TouchableOpacity
                        style={styles.button}
                        onPress={adicionarProjetoAoUsuario}
                    >
                        <Text style={styles.buttonText}>Quero apoiar esse projeto!</Text>  
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}


const styles = StyleSheet.create({
    conteiner: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#1C1C1C'
    }, 
    image: {
        width: 200,
        height: 200,
        marginBottom: 20,
        borderRadius: 5,
        borderWidth: 2,
        borderColor: "#333333"
    },
    name: {
        fontSize: 29,
        fontWeight: 'bold',
        color: "#fff",
        paddingTop: 5,
        textAlign: 'center',
        paddingBottom: 7
    },
    description: {
        fontSize: 15,
        textAlign: 'justify',
        paddingHorizontal: 10,
        color: '#fff',
    },

    subTitulo: {
        fontSize: 15,
        marginBottom: 10,
        color: "#fff",
        textAlign: 'center'
    },

    descriptionConteiner: {
        paddingHorizontal: 5,
        backgroundColor: '#333333',
        paddingVertical: 8,
        marginHorizontal: 5,
        borderRadius: 5,
    },

    button: {
        backgroundColor: '#663399',
        paddingVertical: 10,
        paddingHorizontal: 10,
        borderRadius: 10,
        borderWidth: 1
    },

    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },

    buttonConteiner: {
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 20
    }
})