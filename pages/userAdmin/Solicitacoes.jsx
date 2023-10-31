import React, { useContext, useState, useEffect } from "react";
import { SafeAreaView, View, Text, FlatList, StyleSheet, Image, TouchableOpacity, Alert } from "react-native";
import ParamContext from "../../context/projetoContext";
import { buscarArraySolicitacao, buscarDetalhesUsuario } from "../../firebase/api/admin/getAllRequest";
import firestore from '@react-native-firebase/firestore';

export default function SolicitacoesScreen(){
    const { params } = useContext(ParamContext);
    const projetos = params.projeto;
    const [ listaUsuarios, setListaUsuarios ] = useState([]);

    useEffect(() => {
        async function fetchUsuarios() {
            try {
                const userIds = await buscarArraySolicitacao(projetos.id);
                const userDetailsPromises = userIds.map(userId => buscarDetalhesUsuario(userId));
                const usersDetails = await Promise.all(userDetailsPromises);
                
                setListaUsuarios(usersDetails);
            } catch (error) {
                console.error("Erro ao buscar os usuários:", error);
            }
        }

        fetchUsuarios();
    }, [projetos.id]);


    function renderItem({ item }) {
        
        async function aceitaUsuario(){
            const projetoRef = firestore().collection('projetos').doc(projetos.id); // Corrigindo a referência ao documento.
        
            projetoRef.update({
                solicitacoesProjeto: firestore.FieldValue.arrayRemove(item.id),
                participantesProjeto: firestore.FieldValue.arrayUnion(item.id)
            })
            .then(() => {
                Alert.alert('Usuário aceito no projeto com sucesso.');
            })
            .catch((error) => {
                Alert.alert('Erro ao aceitar usuário no projeto:', error);
            });
        }

        return (
            <View style={styles.viewConteiner}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        {item && item.fotoPerfil
                            ? <Image style={styles.fotoPerfil} source={{ uri: item.fotoPerfil }} />
                            : <Image style={styles.fotoPerfil} source={require('../../assets/images/user.png')} />
                        }
                        <View style={{ flexDirection: 'column' }}>
                            <Text style={styles.textNome}>{item.nome}</Text>
                            <Text style={styles.textTelefone}>{item.telefone}</Text>
                        </View>
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <TouchableOpacity
                            onPress={aceitaUsuario}
                        >
                            <Image style={styles.icon} source={require('../../assets/images/check.png')} />
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => Alert.alert('Num Aceitou')}
                        >
                            <Image style={styles.icon} source={require('../../assets/images/cancel.png')} />
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        )
    }

    return(
        <SafeAreaView style={styles.conteiner}>
            <View style={{ marginVertical: 20 }}>
                <FlatList
                    nestedScrollEnabled={true}
                    data={listaUsuarios}
                    keyExtractor={item => item.userId || item.email} 
                    renderItem={renderItem}
                />
                <Text style={{ color: '#fff' }}></Text>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    conteiner: {
        flex: 1,
        backgroundColor: '#1C1C1C'
    },

    viewConteiner: {
        backgroundColor: '#333333',
        paddingHorizontal: 10,
        paddingVertical: 10,
        borderRadius: 10,
        marginHorizontal: 15,
        marginVertical: 5,
        justifyContent: 'flex-start',
        borderWidth: 1,
        borderColor: '#663399'
    },

    textTelefone: {
        fontSize: 13,
        marginHorizontal: 8,
        color: '#fff'
    },

    fotoPerfil: {
        width: 50,
        height: 50,
        borderRadius: 50
    },

    textNome: {
        fontSize: 18,
        marginHorizontal: 8,
        color: '#fff'
    },
    
    icon: {
        width: 25,
        height: 25,
        marginHorizontal: 10
    }
})