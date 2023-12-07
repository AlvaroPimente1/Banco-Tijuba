import firestore from '@react-native-firebase/firestore';
import getUserID from './getUserID';

const getUserInfoPerfil = async () => {
    const userId = getUserID();
    const userRef = firestore().collection('usuarios').doc(userId);
    const querySnapshot = await userRef.get();

    return querySnapshot;
};

export default getUserInfoPerfil;
