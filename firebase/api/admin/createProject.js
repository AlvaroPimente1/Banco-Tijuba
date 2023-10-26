import { useState, useEffect } from 'react';
import firestore from '@react-native-firebase/firestore';
import { Alert } from 'react-native';
import getUserINFOAdmin from './getUserInfoAdmin';

export default function createProject(){
    const [ nomeProjeto, setNomeProjeto ] = useState('')
    const [ descricaoProjeto, setDescricaoProjeto ] = useState('')
    const [ categoria, setCategoria ] = useState(null)
    const [ cadastradorPor, setCadastradorPor ] = useState('')

    useEffect(() => {
        const fetchUsuario = async () => {
            const userInfoSnapshot = await getUserINFOAdmin();
            if (userInfoSnapshot.exists) {
                setCadastradorPor(userInfoSnapshot.data().nome);
            }
        };
        fetchUsuario();
    }, []);

    const addProject = async ()=> {
        if(nomeProjeto != '' && descricaoProjeto != ''  && categoria != null && cadastradorPor != ''){
            try{
                await firestore().collection('projetos').add({
                    nome_projeto: nomeProjeto,
                    descricao: descricaoProjeto,
                    categoria: categoria,
                    cadastradorPor: cadastradorPor,
                    dt_criacao: firestore.FieldValue.serverTimestamp(),
                    participantesProjeto: [],
                    solicitacoesProjeto: []
                })
                Alert.alert('Concluído', 'Projeto criado com êxito!')
                setNomeProjeto('');
                setDescricaoProjeto('');
            }
            catch(error){
                console.error("Erro ao criar projeto:", error);
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
        categoria,
        setCategoria,
        cadastradorPor,
        setCadastradorPor,
        addProject
    };
}