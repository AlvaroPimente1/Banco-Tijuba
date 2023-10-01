import { PermissionsAndroid } from "react-native";

export default async function getPermission(){
    try{
        const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
                {
                    title: 'Acesso à Galeria',
                    message: 'Nós precisamos de sua permissão para acessar suas fotos e imagens.',
                    buttonNeutral: 'Perguntar depois',
                    buttonNegative: 'Cancelar',
                    buttonPositive: 'Permitir',
                },
            );
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                return true 
            } else {
                return false
            }
    }catch(error){
        console.error('Erro ao solicitar permissão:', error)
        return false
    }
}