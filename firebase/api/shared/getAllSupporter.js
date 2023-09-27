import firestore from '@react-native-firebase/firestore';
import { Alert } from 'react-native';

export async function buscarArrayUsuarios(projetoId){
    try {
        const arrayRef = firestore().collection('projetos').doc(projetoId);
    
        const doc = await arrayRef.get();
    
        if (!doc.exists) {
            throw new Error('Projeto não encontrado.');
        }
    
        const arrayUsuarios = doc.data().participantesProjeto;
        const arrayTamanho = doc.data().length
    
        return arrayUsuarios;
    }
    catch(erro) {
        console.error(erro);
        Alert.alert('Erro', 'Não foi possível verificar os usuários participantes.');
    }
}

export async function buscarDetalhesUsuario(userId) {
    const userRef = firestore().collection('usuarios').doc(userId);
    const doc = await userRef.get();

    if (!doc.exists) {
        throw new Error('Usuário não encontrado.');
    }

    return doc.data();
}