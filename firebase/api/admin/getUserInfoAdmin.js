import firestore from '@react-native-firebase/firestore';
import getUserID from '../user/getUserID';

export default async function getUserINFOAdmin() {
    const userId = getUserID();
    const userRef = firestore().collection('usuarios_admin').doc(userId);
    const querySnapshot = await userRef.get();

    return querySnapshot;
}