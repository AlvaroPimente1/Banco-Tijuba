import React, { useState, useEffect, useContext } from "react";
import { SafeAreaView, View, Text, StyleSheet, Alert, TouchableOpacity, FlatList, Image } from "react-native";
import { formatDate } from "../../utils/formatDate";
import ParamContext from "../../context/projetoContext";
import firestore from '@react-native-firebase/firestore';

export default function DoacaoAdminScreen(){
    const { params } = useContext(ParamContext);
    const projetos = params.projeto;
    const [ doacoes, setDoacoes ] = useState([]);

    useEffect(()=>{
            const doacaoRef = firestore().collection('projetos').doc(projetos.id).collection('doacoes_projeto');
            const unsub = doacaoRef.onSnapshot((snapshot) =>{
                const doacoesArray = snapshot.docs.map(doc => {
                    return{ ...doc.data(), id: doc.id };
                })
                setDoacoes(doacoesArray);
            }, error => {
                Alert.alert('Erro', 'Ocorreu um erro ao consultar as solicitações de doação')
            })
            
            return ()=>{
                unsub();
            }
        }, [])

    function renderItem({ item }){
        return(
            <View style={styles.containerLista}>
                <Text style={{ color: '#fff', fontSize: 15 }}>{item.nome_doacao}</Text>
                <Text>{formatDate(item.dt_solicitacao)}</Text>
                <TouchableOpacity>
                    <Image source={require('../../assets/images/deleteIcon.png')}/>
                </TouchableOpacity>
            </View>
        )
    }

    return(
        <SafeAreaView style={styles.container}>
            <View style={styles.containerTitulo}>
                <Text style={styles.titulo}>Mural do que precisamos</Text>
            </View>
            <FlatList   
                data={doacoes}
                keyExtractor={item => item.id}
                renderItem={renderItem}
            />
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

    containerLista: {
        paddingHorizontal: 10,
        paddingVertical: 10,
        backgroundColor: '#444444',
        marginVertical: 5,
        borderRadius: 10,
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#663399'
    },

    containerTitulo: {
        marginVertical: 30
    },

    titulo: {
        fontSize: 25,
        color: '#fff'
    }
})