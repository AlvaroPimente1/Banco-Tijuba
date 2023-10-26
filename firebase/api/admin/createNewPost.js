import React, { useState, useContext, useEffect } from "react";
import { Alert } from "react-native";
import ParamContext from "../../../context/projetoContext";
import firestore from '@react-native-firebase/firestore';
import { addImagemPost } from "./addImagePost";
import getUserINFOAdmin from "./getUserInfoAdmin";

export default function createNewPost(){
    const [ usuario, setUsuario ] = useState('');
    const [ titulo, setTitulo ] = useState('');
    const [ mensagem, setMensagem ] = useState('');
    const [ imagemUrl, setImagemUrl ] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const { params } = useContext(ParamContext);
    const projetos = params.projeto;

    useEffect(() => {
        const fetchUsuario = async () => {
            const userInfoSnapshot = await getUserINFOAdmin();
            if (userInfoSnapshot.exists) {
                setUsuario(userInfoSnapshot.data().nome);
            }
        };
        fetchUsuario();
    }, []);

    const carregaImagem = async() => {
        const url = await addImagemPost(setIsLoading);
        setImagemUrl(url);
    }

    const createPost = async() => {
        const projRef = firestore().collection('projetos').doc(projetos.id).collection('projeto_posts');
        if(titulo != '' && mensagem != ''){
            try {
                await projRef.add({
                    usuario_post: usuario,
                    titulo_post: titulo,
                    mensagem_post: mensagem,
                    imagem_post: imagemUrl,
                    dt_post: firestore.FieldValue.serverTimestamp()
                });
    
                Alert.alert('Concluído', 'Postagem efetuada com sucesso!');
                setTitulo('');
                setMensagem('');
                setImagemUrl(null);
            } catch (erro) {
                Alert.alert('Erro', `Não foi possível efetuar a postagem. Detalhes: ${erro.message}`);
            }
        }
        else{
            Alert.alert('Erro', 'É necessário preencher todos campos para publicar')
        }
    }

    return {
        createPost, 
        setMensagem,
        mensagem,
        titulo,
        setTitulo,
        carregaImagem,
        imagemUrl,
        setImagemUrl,
        isLoading,
        setIsLoading
    }
}
