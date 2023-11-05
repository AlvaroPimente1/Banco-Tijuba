import firestore from '@react-native-firebase/firestore';
import { Alert } from 'react-native';

export async function buscarArraySolicitacao(projetoId){
    try {
        const arrayRef = firestore().collection('projetos').doc(projetoId);
    
        const doc = await arrayRef.get();
    
        if (!doc.exists) {
            throw new Error('Projeto não encontrado.');
        }

        const arrayUsuarios = doc.data().solicitacoesProjeto;

        if (!arrayUsuarios || arrayUsuarios.length === 0) {
            Alert.alert('Sem solicitações ainda!');
        }

        return arrayUsuarios;
    }
    catch(erro) {
        console.error(erro);
        Alert.alert('Erro', 'Não foi possível verificar as solicitações.');
    }
}

export async function buscarDetalhesUsuario(userId) {
    const userRef = firestore().collection('usuarios').doc(userId);
    const doc = await userRef.get();

    if (!doc.exists) {
        throw new Error('Usuário não encontrado.');
    }

    const userData = doc.data();
    userData.id = doc.id;

    return userData;
}