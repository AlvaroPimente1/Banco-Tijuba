import { Alert } from 'react-native';
import { request, PERMISSIONS, RESULTS } from 'react-native-permissions';

export default async function getPermission() {
    try {
        const permissionStatus = await request(PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE);

        if (permissionStatus === RESULTS.GRANTED) {
            return true;
        } else {
            return false;
        }
    } catch (error) {
        Alert.alert('Erro ao solicitar permissão:', error);
        return false;
    }
}
