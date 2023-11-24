import React, { useState, useEffect } from "react";
import { SafeAreaView, Text, View, Image, TouchableOpacity, TextInput, Alert } from "react-native";
import styles from "../../style/perfilStyle";
import ImageContainer from "../../components/ImagemConteiner";
import getUserINFOAdmin from "../../firebase/api/admin/getUserInfoAdmin";
import { mudaImagemPerfil, removeImagemPerfil } from "../../firebase/api/admin/addImagePerfil";
import firestore from '@react-native-firebase/firestore';
import getUserID from "../../firebase/api/user/getUserID";

export default function PerfilAdminScreen({ navigation }) {
    const [usuario, setUsuario] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [isEdit, setIsEdit] = useState(false);
    const [ newNome, setNewNome ] = useState('');
    const [ newTelefone, setNewTelefone ] = useState('');

    useEffect(() => {
        const fetchUsuario = async () => {
            const userInfoSnapshot = await getUserINFOAdmin();
            if (userInfoSnapshot.exists) {
                setUsuario(userInfoSnapshot.data());
            }
        };
        fetchUsuario();
    }, []);

    useEffect(() => {
        if (usuario) {
            setNewNome(usuario.nome);
            setNewTelefone(usuario.telefone);
        }
    }, [usuario]);

    async function editPerfil(){
        try{
            const userRef = firestore()
            .collection('usuarios_admin')
            .doc(getUserID())

            await userRef.set({
                nome: newNome,
                telefone: newTelefone
            }, { merge: true })

            Alert.alert('Concluído', 'Informações Atualizadas com Êxito')
            navigation.goBack();
        } catch(error){
            console.error(error);
        }
    }

    return (
        <SafeAreaView style={styles.conteiner}>
            {usuario && usuario.fotoPerfil
                ? <ImageContainer source={{ uri: usuario.fotoPerfil }} />
                : <ImageContainer source={require('../../assets/images/usuario.png')} />
            }
            <View style={styles.botaoFoto}>
                <TouchableOpacity onPress={() => mudaImagemPerfil(setIsLoading)}>
                    <Image style={styles.logoCamera} source={require('../../assets/images/camera.png')} />
                </TouchableOpacity>
                <TouchableOpacity onPress={removeImagemPerfil}>
                    <Image style={styles.logoCamera} source={require('../../assets/images/removeImagem.png')} />
                </TouchableOpacity>
            </View>

            {
                isEdit ?
                    <View>
                        <View style={styles.usuarioConteiner}>
                            <Text style={{ color: '#fff', fontSize: 18 }}>Editar Informações</Text>
                            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                                <Text style={{ color: '#fff', marginRight: 5 }}>Nome: </Text>
                                <TextInput
                                    style={styles.textInput}
                                    placeholder={usuario.nome}
                                    placeholderTextColor={'#fff'}
                                    onChangeText={setNewNome}
                                    value={newNome}
                                />
                            </View>

                            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                                <Text style={{ color: '#fff', marginRight: 5 }}>Telefone: </Text>
                                <TextInput
                                    style={styles.textInput}
                                    placeholder={usuario.telefone}
                                    placeholderTextColor={'#fff'}
                                    onChangeText={setNewTelefone}
                                    value={newTelefone}
                                />
                            </View>
                        </View>
                        <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                            <TouchableOpacity style={styles.buttonEdit}
                                onPress={editPerfil}
                            >
                                <Text style={styles.textButtonEdit}>Salvar Modificações</Text>
                            </TouchableOpacity>

                            <TouchableOpacity style={styles.buttonEdit}
                                onPress={() => setIsEdit(false)}
                            >
                                <Text style={styles.textButtonEdit}>Cancelar</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    :
                    <View style={styles.usuarioConteiner}>
                        <TouchableOpacity onPress={() => setIsEdit(true)}>
                            <Image style={{ width: 20, height: 20 }} source={require('../../assets/images/edit.png')} />
                        </TouchableOpacity>
                        {usuario && <Text style={styles.texto}>Nome: {usuario.nome}</Text>}
                        {usuario && <Text style={styles.texto}>E-mail: {usuario.email}</Text>}
                        {usuario && <Text style={styles.texto}>Telefone: {usuario.telefone}</Text>}
                    </View>
            }
        </SafeAreaView>
    )
}