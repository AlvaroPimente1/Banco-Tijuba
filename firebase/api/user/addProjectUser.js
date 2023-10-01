import { useContext } from 'react';
import { Alert } from 'react-native';
import ParamContext from '../../../context/projetoContext';
import firestore from '@react-native-firebase/firestore';
import getUserID from './getUserID';

export async function adicionarProjetoAoUsuario(projetos) {
    const userID = getUserID();
    const userRef = firestore().collection('usuarios').doc(userID).collection('projetos_usuario');
    
    try {
        await userRef.add({
            projetoRef: firestore().collection('projetos').doc(projetos.id),
            nome_projeto: projetos.nome_projeto,
            dt_entrada: firestore.FieldValue.serverTimestamp(),
        });

        const projetoRef = firestore().collection('projetos').doc(projetos.id);
        await projetoRef.update({
            participantesProjeto: firestore.FieldValue.arrayUnion(userID)
        });
        
        Alert.alert("Projeto adicionado com sucesso ao usuário!");

    } catch(error) {
        Alert.alert("Erro ao adicionar o projeto ao usuário!", error.message);
    }
}
