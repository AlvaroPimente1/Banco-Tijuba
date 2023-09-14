import firestore from '@react-native-firebase/firestore';
import getUserID from "./getUserID";

export default async function getUserINFO() {
    const userId = getUserID();
    const userRef = firestore().collection('usuarios').doc(userId);
    const querySnapshot = await userRef.get();

    return querySnapshot;
}