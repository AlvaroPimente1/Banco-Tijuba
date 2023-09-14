import React, { useState, useEffect } from "react";
import { SafeAreaView, Text, StyleSheet, View, Image, Button, Alert, TouchableOpacity } from "react-native";
import firestore from '@react-native-firebase/firestore';
import getUserID from "../../firebase/api/user/getUserID";
import ImageContainer from "../../components/ImagemConteiner";
import getUserINFO from "../../firebase/api/user/getUserInfo";
import { mudaImagemPerfil, removeImagemPerfil } from "../../firebase/api/user/profileImage";

export default function PerfilUsuario(){
    const [usuario, setUsuario] = useState(null);
    const [qtdProjetos, setQtdProjetos] = useState(0);

    useEffect(() => {
        const fetchUsuario = async () => {
            const userInfoSnapshot = await getUserINFO();
            if (userInfoSnapshot.exists) {
                setUsuario(userInfoSnapshot.data());
            }
        };
        fetchUsuario();
    }, []);

    useEffect(() => {
        const fetchProjetos = async () => {
            const projRef = firestore().collection('usuarios').doc(getUserID()).collection('projetos_usuario');
            const querySnapshot = await projRef.get()
            const count = querySnapshot.size
            setQtdProjetos(count)
        }
        fetchProjetos();
    })    

return(
    <SafeAreaView style={styles.conteiner}>
        {usuario && usuario.fotoPerfil 
            ? <ImageContainer source={{uri: usuario.fotoPerfil}} />
            : <ImageContainer source={require('../../assets/images/imagemTeste.png')} />
        }
        <View style={styles.botaoFoto}>
            <TouchableOpacity onPress={mudaImagemPerfil}>
                <Image style={styles.logoCamera} source={require('../../assets/images/camera.png')}/>
            </TouchableOpacity>
            <TouchableOpacity onPress={removeImagemPerfil}>
                <Image style={styles.logoCamera} source={require('../../assets/images/removeImagem.png')}/>
            </TouchableOpacity>
        </View>
        <View style={styles.usuarioConteiner}>
            {usuario && <Text style={styles.texto}>Nome: {usuario.nome}</Text>}
            {usuario && <Text style={styles.texto}>E-mail: {usuario.email}</Text>}
            {usuario && <Text style={styles.texto}>Telefone: {usuario.telefone}</Text>}
            <Text style={styles.texto}>Você está em {qtdProjetos} projetos.</Text>
        </View>
    </SafeAreaView>
)
}

const styles = StyleSheet.create({
    conteiner: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#1C1C1C',
        justifyContent: 'flex-start'
    },

    texto: {
        fontSize: 18,
        marginBottom: 15,
        color: '#F5F5F5',
        fontWeight: 'bold',
    },

    usuarioConteiner: {
        paddingHorizontal: 8,
        backgroundColor: '#333333',
        paddingVertical: 8,
        marginHorizontal: 5,
        marginVertical: 10,
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center'
    },

    botaoFoto: {
        flexDirection: 'row',
        backgroundColor: '#663399',
        paddingHorizontal: 15,
        paddingVertical: 2,
        borderBottomEndRadius: 10,
        borderBottomLeftRadius: 10
    },

    logoCamera: {
        width: 35,
        height: 35,
        marginHorizontal: 4
    }
})