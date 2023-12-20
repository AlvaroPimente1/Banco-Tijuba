import { useState, useEffect } from 'react';
import firestore from '@react-native-firebase/firestore';
import getUserID from '../user/getUserID';

const useFetchRecommendedProjects = () => {
    const [projects, setProjects] = useState([]);

    useEffect(() => {
        const fetchProjects = async () => {
            const userId = getUserID(); // Certifique-se de que esta função está retornando o ID correto
            const userProjectsRef = firestore()
                .collection('usuarios')
                .doc(userId)
                .collection('projetos_usuario');
            
            // Buscar todos os projetos que o usuário já tem
            const userProjectsSnapshot = await userProjectsRef.get();
            const userProjectIds = new Set(userProjectsSnapshot.docs.map(doc => doc.id));

            const recommendationsRef = firestore()
                .collection('usuarios')
                .doc(userId)
                .collection('recomendacao_projetos');
            
            const querySnapshot = await recommendationsRef.get();
            const projectRefs = querySnapshot.docs
                .map(doc => doc.data().projectId)
                .filter(projectId => !userProjectIds.has(projectId)); // Filtrar projetos que o usuário já tem
    
            // Agora, para cada projectId, busque os detalhes do projeto da coleção 'projetos'
            const projectsPromises = projectRefs.map(projectId => 
                firestore().collection('projetos').doc(projectId).get()
            );
    
            // Aguarde todas as promessas de projeto serem resolvidas
            const projectsSnapshots = await Promise.all(projectsPromises);
    
            // Mapeie cada Snapshot de Documento para os dados do projeto
            const fetchedProjects = projectsSnapshots.map(docSnapshot => ({
                id: docSnapshot.id,
                ...docSnapshot.data()
            }));
    
            setProjects(fetchedProjects);
        };
    
        fetchProjects();
    }, []);
    
    return projects;
};

export default useFetchRecommendedProjects;
