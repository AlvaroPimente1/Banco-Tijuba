import ImagePicker from 'react-native-image-crop-picker';
import storage from '@react-native-firebase/storage';
import firestore from '@react-native-firebase/firestore';
import { Alert, useContext } from "react-native";
import getPermission from '../shared/getPermissions';

export async function addImagemProjeto(setIsLoading) {
    let imageUrl = null;

    setIsLoading(true); 

    if(await getPermission()){
        try {
            const image = await ImagePicker.openPicker({
                width: 300,
                height: 300,
                cropping: true
            });
    
            if (!image || !image.path) {
                throw new Error('Seleção de imagem falhou');
            }
    
            const nomeArquivo = image.path.split('/').pop();
            const caminhoUpload = `Imagens_Projetos/${nomeArquivo}`;
    
            // Faz upload para o caminho do storage 
            const uploadTask = storage().ref(caminhoUpload).putFile(image.path);
            await uploadTask; // Aguarda o upload ser concluído
    
            // Obtém a URL da imagem após o upload
            imageUrl = await storage().ref(caminhoUpload).getDownloadURL();
        } catch (error) {
            console.error(error);
            Alert.alert('Erro', error.message);
        } finally {
            setIsLoading(false);  
        }
    } else {
        setIsLoading(false);  
    }

    return imageUrl;
};

export function resetImageUrl() {
    return null;
}