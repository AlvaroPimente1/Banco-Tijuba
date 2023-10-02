import React, { useState } from "react";
import { SafeAreaView, Text, StyleSheet, TextInput, TouchableOpacity, Image, ActivityIndicator } from "react-native";
import styles from "../../style/commonsStyles";
import createNewPost from "../../firebase/api/admin/createNewPost";

export default function NewPostScreen(){
    const { 
        mensagem, setMensagem,
        titulo, setTitulo,
        imagemUrl,
        createPost,
        carregaImagem,
        isLoading,
        setIsLoading
    } = createNewPost();


    return(
        <SafeAreaView style={styles.conteiner}>
            {isLoading ? (
                <ActivityIndicator size="large" color="#fff" />
            ) : (
                <>
                    {imagemUrl && (
                        <Image
                            source={{ uri: imagemUrl }}
                            style={styles.image}
                        />
                    )}

                    <TextInput
                        placeholder="Titulo da postagem"
                        style={styles.inputText}
                        value={titulo}
                        onChangeText={setTitulo}
                    />

                    <TextInput
                        placeholder="mensagem da postagem"
                        style={styles.inputText}
                        value={mensagem}
                        onChangeText={setMensagem}
                    />

                    <TouchableOpacity
                        onPress={createPost}
                    >
                        <Text style={{ color: '#fff' }}>criar</Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={carregaImagem}>
                        <Text style={{ color: '#fff' }}>Adicionar Imagem</Text>
                    </TouchableOpacity>
                    
                    <Text style={{ color: '#fff' }}>TELA BETA</Text>
                </>
            )}
        </SafeAreaView>
    );
}
