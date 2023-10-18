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

        if (!arrayUsuarios || arrayUsuarios.length === 0) {
            Alert.alert('Sem participantes ainda!');
        }

        return arrayUsuarios;
    }
    catch(erro) {
        console.error(erro);
        Alert.alert('Erro', 'Não foi possível verificar os usuários participantes.');
    }
}

export async function buscarQtdParticipantes(projetoId){
    try {
        const arrayRef = firestore().collection('projetos').doc(projetoId);
    
        const doc = await arrayRef.get();
    
        if (!doc.exists) {
            throw new Error('Projeto não encontrado.');
        }

        const arrayTamanho = doc.data().length

        return arrayTamanho;
    }
    catch(erro) {
        console.error(erro);
        Alert.alert('Erro', 'Não foi possível verificar a quantidade de participantes.');
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