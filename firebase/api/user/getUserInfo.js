import firestore from '@react-native-firebase/firestore';
import getUserID from "./getUserID";

export default async function getUserINFO() {
    const userId = getUserID();
    const userRef = firestore().collection('usuarios').doc(userId);
    const querySnapshot = await userRef.get();

    const userData = querySnapshot.data();

    if (userData) {
        userData.id = querySnapshot.id; // Adiciona o ID do documento aos dados do usuário
    }

    return userData;
}