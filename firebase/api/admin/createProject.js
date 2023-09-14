import { useState } from 'react';
import firestore from '@react-native-firebase/firestore';
import { Alert } from 'react-native';

export default function createProject(){
    const [ nomeProjeto, setNomeProjeto ] = useState('')
    const [ descricaoProjeto, setDescricaoProjeto ] = useState('')

    const addProject = async()=>{
        if(nomeProjeto != '' || descricaoProjeto != ''){
            try{
                await firestore().collection('projetos').add({
                    nome_projeto: nomeProjeto,
                    descricao: descricaoProjeto
                })
                Alert.alert('Concluído', 'Projeto criado com êxito!')
                setNomeProjeto('');
                setDescricaoProjeto('');
            }
            catch{
                Alert.alert('Erro', 'Não foi possível criar o projeto')
            }
        }
        else{
            Alert.alert('Erro', 'Projeto deve ter todos os campos preenchidos')
        }
    }

    return {
        nomeProjeto,
        setNomeProjeto,
        descricaoProjeto,
        setDescricaoProjeto,
        addProject
    };
}