import ImagePicker from 'react-native-image-crop-picker';
import storage from '@react-native-firebase/storage';
import firestore from '@react-native-firebase/firestore';
import getUserID from '../user/getUserID';
import { Alert } from "react-native";
import getPermission from '../shared/getPermissions';


export async function mudaImagemPerfil(setIsLoading) {
    if(await getPermission()){
        setIsLoading(true);
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
            const userID = getUserID(); 
            const caminhoStorage = `FotoPerfilAdmin/${userID}`;
            const caminhoUpload = `FotoPerfilAdmin/${userID}/${nomeArquivo}`;
    
            const storageRef = storage().ref(caminhoStorage);
    
            // Listar arquivos no diretório
            const listResult = await storageRef.listAll();
            for (let i = 0; i < listResult.items.length; i++) {
                await listResult.items[i].delete();
            }
    
            const upload = storage().ref(caminhoUpload).putFile(image.path);
    
            upload.on('state_changed', 
                (snapshot) => {
                }, 
                (error) => {
                    setIsLoading(false);
                    Alert.alert('Erro ao enviar imagem', error.message);
                }, 
                async () => {
                    const downloadURL = await storage().ref(caminhoUpload).getDownloadURL();
                    const userRef = firestore().collection('usuarios_admin').doc(userID);
                    await userRef.update({
                        fotoPerfil: downloadURL
                    });
                    setIsLoading(false);
                    Alert.alert('Foto de perfil atualizada!');
                }
            );
        } catch (error) {
            setIsLoading(false);
            console.error(error);
            Alert.alert('Erro', error.message);
        }
    }
};
