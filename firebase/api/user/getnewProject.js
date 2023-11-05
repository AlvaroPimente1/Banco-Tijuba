import { useState, useEffect } from 'react';
import firestore from '@react-native-firebase/firestore';
import getUserID from './getUserID';

export default function getNewProject() {
    const [text, setText] = useState('');
    const [list, setList] = useState([]);
    const [items, setItems] = useState([]);
    const [projetos, setProjetos] = useState([]);

    useEffect(() => {
        const userProjetosRef = firestore().collection('usuarios').doc(getUserID()).collection('projetos_usuario');

        const unsubProjetosUer = userProjetosRef.onSnapshot(async usuarioProjetosSnapshot => {
            const referencedProjectIds = usuarioProjetosSnapshot.docs.map(doc => doc.data().projetoRef.id);
            
            const unsubFiltroProjetos = firestore().collection('projetos').onSnapshot(querySnapshot => {
                const allProjects = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                const projetosDisponiveis = allProjects.filter(project => !referencedProjectIds.includes(project.id));

                setProjetos(projetosDisponiveis);
                setItems(projetosDisponiveis);
                setList(projetosDisponiveis);
            });
            
            return () => unsubFiltroProjetos();
        });

        return () => unsubProjetosUer();

    }, []);

    return { text, setText, list, setList, items, setItems, projetos, setProjetos };
};
