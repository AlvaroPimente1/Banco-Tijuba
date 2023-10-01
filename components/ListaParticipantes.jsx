import React, { useContext, useState, useEffect } from "react";
import ParamContext from "../context/projetoContext";
import { View, SafeAreaView, Text, StyleSheet, ScrollView, Image, FlatList } from "react-native";
import { buscarArrayUsuarios, buscarDetalhesUsuario, buscarQtdParticipantes } from "../firebase/api/shared/getAllSupporter";

export default function ListApoiadores(){
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
                console.error("Erro ao buscar os usuários:", error);
            }
        }

        fetchUsuarios();
    }, [projetos.id]);

    function renderItem({ item }){
        return(
            <View style={styles.viewConteiner}>
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
            </View>
        )
    }

    return(
        <>
            <FlatList
                nestedScrollEnabled={true}
                data={listaUsuarios}
                keyExtractor={item => item.userId || item.email} 
                renderItem={renderItem}
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
        marginHorizontal: 15,
        marginVertical: 4,
        justifyContent: 'flex-start'
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