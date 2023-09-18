import { useState, useEffect } from 'react';
import firestore from '@react-native-firebase/firestore';
import { Alert } from 'react-native';

export default function getOverView(){
    const [ qtdProjetos, setQtdProjetos ] = useState(0);

    const countProjects = async () =>{
        const projRef = firestore().collection('projetos')
            const querySnapshot = await projRef.get()
            const count = querySnapshot.size
            setQtdProjetos(count)
    }

    return{
        countProjects,
        qtdProjetos,
        setQtdProjetos
    }
}