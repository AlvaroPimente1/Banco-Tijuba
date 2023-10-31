import { useState, useEffect, useContext } from 'react';
import firestore from '@react-native-firebase/firestore';
import { Alert } from 'react-native';
import ParamContext from '../../../context/projetoContext';

export default function getAllPosts(){
    const [ posts, setPosts ] = useState([]);
    const { params } = useContext(ParamContext);
    const projetos = params.projeto;

    useEffect(()=>{
        const projetoRef = firestore().collection('projetos').doc(projetos.id).collection('projeto_posts');
        const unsub = projetoRef.onSnapshot((snapshot) =>{
            const postsArray = snapshot.docs.map(doc => {
                return{ ...doc.data(), id: doc.id };
            })
            setPosts(postsArray);
        }, error => {
            Alert.alert('Erro', 'Ocorreu um erro ao consultar os projetos')
        })
        
        return ()=>{
            unsub();
        }
    }, [[projetos.id]])

    return posts
}