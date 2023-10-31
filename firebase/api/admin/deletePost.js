import { useState, useEffect, useContext } from 'react';
import firestore from '@react-native-firebase/firestore';
import { Alert } from 'react-native';
import ParamContext from '../../../context/projetoContext';

export default async function deletePost(postId){
    const { params } = useContext(ParamContext);
    const projetos = params.projeto;

    const postsRef = firestore()
    .collection('projetos')
    .doc(projetos.id)
    .collection('projeto_posts')
    .doc(postId)

    try{
        await postsRef.delete();
        Alert.alert('Concluído', 'Publicação deletada!')
    } catch(error){
        console.error('Erro ao excluir o post:', error);
        Alert.alert('Erro', 'Ocorreu um erro ao excluir o post. Por favor, tente novamente mais tarde.');
    }
}