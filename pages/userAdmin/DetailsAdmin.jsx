import React from "react";
import styles from "../../style/commonsStyles";
import firestore from '@react-native-firebase/firestore';
import { View, SafeAreaView, Text, StyleSheet, ScrollView, Image, TouchableOpacity, Alert } from "react-native";

export default function DetailAdmin({ route, navigation }){
    const projetos = route.params.projeto;

    function deleteProjeto(){
        const projetoRef = firestore().collection('projetos').doc(projetos.id)

        try{
            projetoRef.delete();
            Alert.alert('Sucesso', 'Projeto excluido')
            navigation.navigate('Tab');
        }
        catch{
            Alert.alert('Erro', 'Ocorreu um erro ao excluir o projeto')
        }
    }

    return(
        <SafeAreaView style={styles.conteiner}>
            <View style={styles.imagemConteiner}>
                <Image style={styles.image} source={require('../../assets/images/imagemTeste.png')}/>
            </View>
            <ScrollView>
                    <Text style={styles.name}>{projetos.nome_projeto}</Text>
                <View style={styles.descriptionConteiner}>
                    <Text style={styles.description}>{projetos.descricao}</Text>
                </View>

                <View style={styles.buttonConteiner}>
                    <TouchableOpacity
                        style={styles.button}
                        onPress={deleteProjeto}
                    >
                        <Text style={styles.buttonText}>DELETAR! (TESTE)</Text>  
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}