import { useState, useEffect } from 'react';
import firestore from '@react-native-firebase/firestore';
import { Alert } from 'react-native';

export default function getAllProject(){
    const [ projetos, setProjetos ] = useState([]);

    useEffect(()=>{
        const projetoRef = firestore().collection('projetos');
        const unsub = projetoRef.onSnapshot((snapshot) =>{
            const projetosArray = snapshot.docs.map(doc => {
                return{ ...doc.data(), id: doc.id };
            })
            setProjetos(projetosArray);
        }, error => {
            Alert.alert('Erro', 'Ocorreu um erro ao consultar os projetos')
        })
        
        return ()=>{
            unsub();
        }
    }, [])

    return projetos
}