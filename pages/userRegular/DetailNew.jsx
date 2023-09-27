import React, { useState } from "react";
import styles from "../../style/commonsStyles";
import { View, SafeAreaView, Text, StyleSheet, ScrollView, Image, TouchableOpacity, Alert } from "react-native";
import firestore from '@react-native-firebase/firestore';
import getUserID from "../../firebase/api/user/getUserID";
import ImageConteiner from "../../components/ImagemConteiner";

export default function DetailNew({ route }){
    const projetos = route.params.projetos;
    
    function adicionarProjetoAoUsuario() {
        const userID = getUserID();
        const userRef = firestore().collection('usuarios').doc(userID).collection('projetos_usuario');
        
        userRef.add({
            projetoRef: firestore().collection('projetos').doc(projetos.id),
            nome_projeto: projetos.nome_projeto,
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
