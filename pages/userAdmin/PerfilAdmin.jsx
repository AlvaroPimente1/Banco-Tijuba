import React, { useState, useEffect } from "react";
import { SafeAreaView, Text, View, Image, TouchableOpacity } from "react-native";
import styles from "../../style/perfilStyle";
import ImageContainer from "../../components/ImagemConteiner";
import getUserINFOAdmin from "../../firebase/api/admin/getUserInfoAdmin";
import { mudaImagemPerfil, removeImagemPerfil } from "../../firebase/api/admin/addProjectImage";

export default function PerfilAdminScreen(){
        const [usuario, setUsuario] = useState(null);

        useEffect(() => {
            const fetchUsuario = async () => {
                const userInfoSnapshot = await getUserINFOAdmin();
                if (userInfoSnapshot.exists) {
                    setUsuario(userInfoSnapshot.data());
                }
            };
            fetchUsuario();
        }, []);

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
            </View>
        </SafeAreaView>
    )
}