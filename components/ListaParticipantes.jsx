import React, { useContext, useState, useEffect } from "react";
import ParamContext from "../context/projetoContext";
import { View, SafeAreaView, Text, StyleSheet, ScrollView, Image, FlatList, TouchableOpacity, Alert } from "react-native";
import { buscarArrayUsuarios, buscarDetalhesUsuario, buscarQtdParticipantes } from "../firebase/api/shared/getAllSupporter";

export default function ListApoiadores({ navigation }){
    const { params } = useContext(ParamContext);
    const projetos = params.projeto;
    const [ listaUsuarios, setListaUsuarios ] = useState([]);

    useEffect(() => {
        async function fetchUsuarios() {
            try {
                const userIds = await buscarArrayUsuarios(projetos.id);
                const userDetailsPromises = userIds.map(userId => buscarDetalhesUsuario(userId));
                const usersDetails = await Promise.all(userDetailsPromises);
                
                setListaUsuarios(usersDetails);
            } catch (error) {
                Alert.alert("Erro", "Ocorreu um erro ao buscar usuários participantes")
                console.error("Erro ao buscar os usuários:", error);
            }
        }

        fetchUsuarios();
    }, [projetos.id]);

    function renderItem({ item }){
        return(
            <TouchableOpacity style={styles.viewConteiner}
                onPress={() => navigation.navigate('Perfil')}
            >
                <View style={{flexDirection: 'row'}}>
                    {item && item.fotoPerfil 
                        ? <Image style={styles.fotoPerfil} source={{uri: item.fotoPerfil}} />
                        : <Image style={styles.fotoPerfil} source={require('../assets/images/user.png')} />
                    }
                    <View style={{ flexDirection: 'column' }}>
                        <Text style={styles.textNome}>{item.nome}</Text>
                        <Text style={styles.textTelefone}>{item.telefone}</Text>
                    </View>
                </View>
            </TouchableOpacity>
        )
    }

    return(
        <>
            <FlatList
                nestedScrollEnabled={true}
                data={listaUsuarios}
                keyExtractor={item => item.userId || item.email} 
                renderItem={renderItem}
                horizontal 
            />
        </>
    )
}

const styles = StyleSheet.create({
    viewConteiner: {
        backgroundColor: '#333333',
        paddingHorizontal: 10,
        paddingVertical: 10,
        borderRadius: 10,
        marginHorizontal: 8,
        marginVertical: 4,
        justifyContent: 'flex-start',
        maxWidth: 350
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
    
})