import { useContext } from 'react';
import { Alert } from 'react-native';
import ParamContext from '../../../context/projetoContext';
import firestore from '@react-native-firebase/firestore';
import getUserID from './getUserID';

export async function adicionarProjetoAoUsuario(projetos) {
    const userID = getUserID();
    const userRef = firestore().collection('usuarios').doc(userID).collection('solicitacao_usuario');
    
    try {
        await userRef.add({
            projetoRef: firestore().collection('projetos').doc(projetos.id),
            nome_projeto: projetos.nome_projeto,
            dt_solicitacao: firestore.FieldValue.serverTimestamp(),
        });

        const projetoRef = firestore().collection('projetos').doc(projetos.id);
        await projetoRef.update({
            solicitacoesProjeto: firestore.FieldValue.arrayUnion(userID)
        });
        
        Alert.alert("Solicitação feita com sucesso");

    } catch(error) {
        Alert.alert("Erro ao criar solicitação!", error.message);
    }
}
