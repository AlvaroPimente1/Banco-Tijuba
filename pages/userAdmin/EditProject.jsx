import React, { useState, useContext } from "react";
import { SafeAreaView, View, Text, StyleSheet, TextInput, TouchableOpacity, Image } from "react-native";
import ParamContext from "../../context/projetoContext";
import firestore from '@react-native-firebase/firestore';
import { Alert } from "react-native";

export default function EditProjectScreen(){
    const { params } = useContext(ParamContext);
    const projetos = params.projeto;

    const [ nomeProjeto, setNomeProjeto ] = useState(projetos.nome_projeto);
    const [ descricaoProjeto, setDescricaoProjeto ] = useState(projetos.descricao);

    async function editarProjeto(){
        const projetoRef = firestore().collection('projetos').doc(projetos.id);

        try{
            await projetoRef.update({
                nome_projeto: nomeProjeto,
                descricao: descricaoProjeto
            })
            Alert.alert('Concluído', 'Projeto atualizado com sucesso!')
        } catch(error){
            Alert.alert('Erro', 'Não foi possível atualizar o projeto: ', error)
        }
    }


    return(
        <SafeAreaView style={styles.container}>

            <Image style={{ width: 200, height: 200, borderRadius: 10 }} source={require('../../assets/images/imagemTeste.png')}/>

            <TextInput 
                style={styles.inputText}
                value={nomeProjeto}
                onChangeText={setNomeProjeto}
                placeholderTextColor={'#fff'}
            />

            <TextInput 
                style={styles.inputText}
                value={descricaoProjeto}
                onChangeText={setDescricaoProjeto}
                placeholderTextColor={'#fff'}
            />

            <TouchableOpacity
                style={styles.button}
                onPress={editarProjeto}
            >
                <Text style={styles.buttonText}>Salvar Modificações</Text>
            </TouchableOpacity>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#1C1C1C',
        alignItems: 'center',
        justifyContent: 'center'
    },

    inputText: {
        width: '90%',
        borderBottomWidth: 1,
        borderColor: '#663399',
        color: '#fff',
        marginVertical: 20
    },

    button: {
        backgroundColor: '#663399',
        paddingVertical: 10,
        paddingHorizontal: 10,
        borderRadius: 10,
        borderWidth: 1,
        marginVertical: 20
    },

    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
})