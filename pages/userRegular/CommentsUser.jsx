import React, { useState, useEffect, useContext } from "react";
import { SafeAreaView, View, Text, FlatList, StyleSheet, TextInput, TouchableOpacity, Image, Alert } from "react-native";
import ParamContext from "../../context/projetoContext";
import firestore from '@react-native-firebase/firestore';
import getUserID from "../../firebase/api/user/getUserID";
import { formatDate } from "../../utils/formatDate";

export default function CommentsUserScreen({ route }){
    const { params } = useContext(ParamContext);
    const projetos = params.projeto;
    const post = route.params.post;

    const [ comentario, setComentario ] = useState('')
    const [ comentariosComInfoUsuario, setComentariosComInfoUsuario ] = useState([]);

    async function fetchComentarios() {
        try {
            const comentarioRef = firestore()
                .collection('projetos')
                .doc(projetos.id)
                .collection('projeto_posts')
                .doc(post.id)
                .collection('comentarios_post')
                .orderBy('dt_comentario', 'desc');
    
            const querySnapshot = await comentarioRef.get();
    
            const comentariosData = [];
    
            for (const doc of querySnapshot.docs) {
                const comentarioData = doc.data();
                const userRef = comentarioData.usuarioRef;
                const userDoc = await userRef.get();
    
                if (userDoc.exists) {
                    const userInfo = userDoc.data();
                    comentariosData.push({
                        id: doc.id,
                        ...comentarioData,
                        usuario: userInfo, 
                    });
                } else {
                    console.log('Documento de usuário não encontrado para o comentário:', doc.id);
                }
            }
    
            setComentariosComInfoUsuario(comentariosData);
        } catch (error) {
            console.error(error);
        }
    }
    

    useEffect(() => {
        fetchComentarios();
    }, []);

    async function addComentario(){
        try{
            const comentarioRef = firestore()
                .collection('projetos')
                .doc(projetos.id)
                .collection('projeto_posts')
                .doc(post.id)
                .collection('comentarios_post');

            const userRef = firestore()
                .collection('usuarios').doc(getUserID());

            await comentarioRef.add({
                comentario: comentario,
                dt_comentario: firestore.FieldValue.serverTimestamp(),
                usuarioRef: userRef
            });

            fetchComentarios();
            setComentario('');
        } catch(error){
            console.error(error);
        }
    }

    function renderItem({ item }) {
        return (
            <View style={styles.comentarioItem}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    {item.usuario && item.usuario.fotoPerfil
                        ? <Image style={styles.image} source={{ uri: item.usuario.fotoPerfil }} />
                        : <Image style={styles.image} source={require('../../assets/images/user.png')} />
                    }  
                    <Text style={{ color: '#fff', fontSize: 16, marginHorizontal: 5 }}>{item.usuario.nome}</Text>              
                </View>
                <View style={{ marginHorizontal: 5, marginVertical: 5, flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Text style={{ color: '#fff', fontSize: 16 }}>{item.comentario}</Text>
                </View>
                <Text style={{ color: '#fff', fontSize: 13 }}>{formatDate(item.dt_comentario)}</Text>
            </View>
        );
    }

    return(
        <SafeAreaView style={styles.conteiner}>
            <FlatList
                data={comentariosComInfoUsuario}
                keyExtractor={(item) => item.id}
                renderItem={renderItem}
            />
            <View style={styles.barraInteracao}>
                <TextInput
                    value={comentario}
                    onChangeText={setComentario}
                    placeholder="Digite sua mensagem..."
                    placeholderTextColor={'#fff'}
                    style={styles.textInput}
                />

                <TouchableOpacity
                    onPress={addComentario}
                >
                    <Text style={styles.sendButton}>Enviar</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    conteiner: {
        flex: 1, 
        backgroundColor: '#1C1C1C' 
    },

    barraInteracao: {
        flexDirection: 'row',
        alignItems: 'center' ,
        marginBottom: 5
    },

    textInput: {
        flex: 1,
        backgroundColor: '#1C1C1C', 
        color: '#fff', 
        borderWidth: 1, 
        borderColor: '#663399', 
        paddingLeft: 10 ,
        borderRadius: 10,
    },

    sendButton: {
        fontSize: 15, 
        color: '#fff', 
        paddingVertical: 5,  
        paddingHorizontal: 10, 
        borderRadius: 10, 
        borderColor: '#663399'
    }, 

    zapButton: {
        justifyContent: 'flex-end',
        alignItems: 'flex-end',
        marginRight: 5,
        marginBottom: 5
    },
    
    comentarioItem: {
        backgroundColor: '#444',
        padding: 10,
        marginVertical: 5,
        borderRadius: 5,
    },

    image: {
        width: 40,
        height: 40,
        borderRadius: 20
    }
})