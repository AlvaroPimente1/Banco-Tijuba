import ImagePicker from 'react-native-image-crop-picker';
import storage from '@react-native-firebase/storage';
import firestore from '@react-native-firebase/firestore';
import getUserID from "./getUserID";
import { Alert } from "react-native";

export async function mudaImagemPerfil() {
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
        const caminhoStorage = `FotosProjeto/${userID}`;
        const caminhoUpload = `FotosProjeto/${userID}/${nomeArquivo}`;

        const storageRef = storage().ref(caminhoStorage);

        // Listar arquivos no diretório
        const listResult = await storageRef.listAll();
        for (let i = 0; i < listResult.items.length; i++) {
            // Deleta a foto de perfil antiga para nao sobrecarregar storage
            await listResult.items[i].delete();
        }

        // Faz upload para o caminho do storage 
        const upload = storage().ref(caminhoUpload).putFile(image.path);

        upload.on('state_changed', 
            (snapshot) => {
            }, 
            (error) => {
                Alert.alert('Erro ao enviar imagem', error.message);
            }, 
            async () => {
                // Envia URL pro firestore
                const downloadURL = await storage().ref(caminhoUpload).getDownloadURL();
                const userRef = firestore().collection('usuarios').doc(userID);
                await userRef.update({
                    fotoPerfil: downloadURL
                });

                Alert.alert('Foto de perfil atualizada!');
            }
        );
    } catch (error) {
        console.error(error);
        Alert.alert('Erro', error.message);
    }
};