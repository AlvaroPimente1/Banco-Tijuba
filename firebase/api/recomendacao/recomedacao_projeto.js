import firestore from '@react-native-firebase/firestore';
import getUserID from '../user/getUserID';

async function getTopCategories() {
    // 1. Consultar as categorias de usuário
    const userId = getUserID(); // Assumindo que esta função retorna o ID do usuário corretamente
    const userRef = firestore().collection('usuarios').doc(userId);
    const userDoc = await userRef.get();
    
    if (userDoc.exists) {
        const userData = userDoc.data();
        // 2. Determinar as duas principais categorias
        const categories = {
            Ambiental: userData.Ambiental || 0,
            Social: userData.Social || 0,
            Educacional: userData.Educacional || 0,
            Saude: userData.Saude || 0,
        };

        const topCategories = Object.entries(categories)
                                    .sort((a, b) => b[1] - a[1])
                                    .slice(0, 2)
                                    .map(entry => entry[0]);

        return { topCategories, userRef }; // Retornar tanto as categorias quanto a referência do usuário
    } else {
        throw new Error('User not found');
    }
}

export default async function recommendProjects() {
    try {
        const { topCategories, userRef } = await getTopCategories();

        // 3. Limpar recomendações antigas
        const recommendationsRef = userRef.collection('recomendacao_projetos');
        const oldRecommendations = await recommendationsRef.get();
        // Excluir todas as recomendações antigas
        oldRecommendations.forEach(async (doc) => {
            await recommendationsRef.doc(doc.id).delete();
        });

        // Aguardar a exclusão das recomendações antigas antes de proceder
        for (const category of topCategories) {
            // 4. Buscar todos os projetos nas categorias principais
            const projectsRef = firestore().collection('projetos').where('categoria', '==', category);
            const snapshot = await projectsRef.get();

            // 5. Inserir a referência e o nome do projeto na subcoleção do usuário
            snapshot.forEach(async (doc) => {
                const projectData = doc.data();
                const projectName = projectData.nome_projeto; // Assume que o campo se chama 'nome_projeto'
                await recommendationsRef.add({
                    projectId: doc.id, // O ID é frequentemente mais útil do que a referência direta
                    projectName
                });
            });
        }
    } catch (error) {
        console.error("Error recommending projects: ", error);
    }
}





