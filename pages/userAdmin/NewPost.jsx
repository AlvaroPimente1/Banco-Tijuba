import React, { useState } from "react";
import { SafeAreaView, View,Text, StyleSheet, TextInput, TouchableOpacity, Image, ActivityIndicator, ActivityIndicatorBase } from "react-native";
import createNewPost from "../../firebase/api/admin/createNewPost";
import Loading from "../../components/Loading";

export default function NewPostScreen(){
    const { 
        mensagem, setMensagem,
        titulo, setTitulo,
        imagemUrl,
        createPost,
        carregaImagem,
        resetImagem,
        isLoading,
        setIsLoading
    } = createNewPost();

    return(
        <SafeAreaView style={styles.conteiner}>
            {isLoading ? (
                <Loading/>
            ) : (
                <>
                    {imagemUrl ?
                        <View style={{ flexDirection: 'column', alignItems: 'center' }}>
                            <Image
                                source={{ uri: imagemUrl }}
                                style={styles.image}
                            />
                            <TouchableOpacity
                                onPress={resetImagem}
                            >
                                <Image style={{ width:30, height: 30 }} source={require('../../assets/images/deleteIcon.png')}/>
                            </TouchableOpacity>
                        </View>
                    :
                        <TouchableOpacity onPress={carregaImagem}>
                            <Image source={require('../../assets/images/adicionar__imagem.png')}/>
                        </TouchableOpacity>
                    }

                    <View style={styles.conteinerInput}>
                        <TextInput
                            placeholder="Título da postagem"
                            placeholderTextColor={'#fff'}
                            style={styles.inputText}
                            value={titulo}
                            onChangeText={setTitulo}
                        />

                        <TextInput
                            placeholder="Legenda da postagem"
                            placeholderTextColor={'#fff'}
                            style={styles.inputText}
                            value={mensagem}
                            onChangeText={setMensagem}
                        />
                    </View>

                    <TouchableOpacity
                        style={styles.button}
                        onPress={createPost}
                    >
                        <Text style={styles.buttonText}>Publicar</Text>
                    </TouchableOpacity>
                    
                </>
            )}
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    conteiner: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-evenly',
        backgroundColor: '#1C1C1C',
    },

    conteinerInput: {
        width: '90%',
    },

    inputText: {
        width: '90%',
        borderBottomWidth: 1,
        borderColor: '#663399',
        color: '#fff',
        marginVertical: 20
    },

    image: {
        width: 200,
        height: 200,
        marginBottom: 5,
        borderRadius: 5,
        borderWidth: 2,
        borderColor: "#333333",
    },

    button: {
        backgroundColor: '#663399',
        paddingVertical: 10,
        paddingHorizontal: 10,
        borderRadius: 30,
        borderWidth: 1
    },

    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
})