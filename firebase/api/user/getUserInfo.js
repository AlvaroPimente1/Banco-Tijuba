import firestore from '@react-native-firebase/firestore';
import { Alert } from 'react-native';
import getUserID from "./getUserID";

export default async function getUserINFO() {
    try{
        const userId = getUserID();
        const userRef = firestore().collection('usuarios').doc(userId);
        const querySnapshot = await userRef.get();
    
        const userData = querySnapshot.data();
    
        if (userData) {
            userData.id = querySnapshot.id; 
        }
    
        return userData;
    } catch(error){
        Alert.alert('Erro', 'Não foi possível recuperar as informações.')
    }
}