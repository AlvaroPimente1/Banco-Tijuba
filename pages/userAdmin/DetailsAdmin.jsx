import React, { useState, useContext, useEffect } from "react";
import styles from "../../style/detailStyles";
import firestore from '@react-native-firebase/firestore';
import ParamContext from "../../context/projetoContext";
import { View, SafeAreaView, Text, StyleSheet, ScrollView, Image, TouchableOpacity, Alert, TextInput } from "react-native";
import ListApoiadores from "../../components/ListaParticipantes";

export default function DetailAdmin({ route, navigation }){
    const { params } = useContext(ParamContext);
    const projetos = params.projeto;

    const [ showList, setShowList ] = useState(false);

    function mostrarListaUsuarios(){
        if(!showList){
            setShowList(true)
        }else{
            setShowList(false)
        }
    }

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
                        <Text style={styles.name}>{projetos.nome_projeto}</Text>
                    <View style={styles.descriptionConteiner}>
                        <Text style={styles.description}>{projetos.descricao}</Text>
                        <Text style={styles.description}>Categoria: {projetos.categoria}</Text>
                        <Text style={styles.description}>Cadastrado por {projetos.cadastradorPor}</Text>
                    </View>

                    <View style={styles.buttonConteiner}>
                        <TouchableOpacity
                            style={styles.button}
                            onPress={() => navigation.navigate('Solicitacoes')}
                        >
                            <Text style={styles.buttonText}>Visualizar solicitações</Text>  
                        </TouchableOpacity>
                    </View>
            <TouchableOpacity style={styles.botaoLista}
                onPress={mostrarListaUsuarios}
            >
                <Text style={styles.participantesText}>Participantes</Text>
                
                {
                    showList
                    ? <Image style={styles.iconLista} source={require('../../assets/images/setaBaixo.png')}/>
                    : <Image style={styles.iconLista} source={require('../../assets/images/setaDireita.png')}/>
                }

            </TouchableOpacity>

            {showList
                ? <ListApoiadores/>
                : null
            }
        </SafeAreaView>
    )
}