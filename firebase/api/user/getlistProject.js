import { useState, useEffect } from 'react';
import firestore from '@react-native-firebase/firestore';
import getUserID from './getUserID';

export default function getListProjects() {
    const [text, setText] = useState('');
    const [list, setList] = useState([]);
    const [items, setItems] = useState([]);

    useEffect(() => {
        const userRef = firestore().collection('usuarios').doc(getUserID()).collection('projetos_usuario');
        
        const unsubscribe = userRef.onSnapshot(async querySnapshot => {
            const projetosData = [];
            
            // Uma vez que cada documento pode requerer uma chamada assíncrona, você pode usar Promise.all para tratar isso
            const fetchTodosProjetos = querySnapshot.docs.map(async doc => {
                const projetoRef = doc.data().projetoRef;
                if (projetoRef) {
                    const projetoSnapshot = await projetoRef.get();
                    projetosData.push({
                        id: projetoSnapshot.id,
                        ...projetoSnapshot.data()
                    });
                }
            });
    
            // Esperar por todas as chamadas assíncronas serem concluídas
            await Promise.all(fetchTodosProjetos);
    
            setList(projetosData);
            setItems(projetosData);
        });
    
        // Retornar uma função de limpeza para remover o listener quando o componente for desmontado
        return () => unsubscribe();
    }, []);

    return { text, setText, list, setList, items, setItems,  };
}
