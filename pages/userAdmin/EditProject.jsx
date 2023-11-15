import React, { useState, useContext } from "react";
import { SafeAreaView, View, Text, StyleSheet, TextInput, TouchableOpacity, Image, ActivityIndicator } from "react-native";
import ParamContext from "../../context/projetoContext";
import firestore from '@react-native-firebase/firestore';
import { Alert } from "react-native";
import { addImagemProjeto } from "../../firebase/api/admin/addImagemProjeto";

export default function EditProjectScreen({ navigation }){
    const { params } = useContext(ParamContext);
    const projetos = params.projeto;

    const [ nomeProjeto, setNomeProjeto ] = useState(projetos.nome_projeto);
    const [ descricaoProjeto, setDescricaoProjeto ] = useState(projetos.descricao);
    const [ isLoading, setIsLoading ] = useState(false)
    const [ imagemUrl, setImagemUrl ] = useState(null);

    const carregaImagem = async() => {
        const url = await addImagemProjeto(setIsLoading, params.projeto);
        setImagemUrl(url);
    }

    const resetImageUrl = async() => {
        setImagemUrl(null)
    }

    async function editarProjeto(){
        const projetoRef = firestore().collection('projetos').doc(projetos.id);
        try{
            await projetoRef.update({
                nome_projeto: nomeProjeto,
                descricao: descricaoProjeto,
                foto_projeto: imagemUrl
            })
            Alert.alert('Concluído', 'Projeto atualizado com sucesso!')
            navigation.navigate('Tab');
        } catch(error){
            Alert.alert('Erro', 'Não foi possível atualizar o projeto: ', error)
        }
    }

    function deleteProjeto() {
        const projetoRef = firestore().collection('projetos').doc(projetos.id);

        Alert.alert(
            'Confirmação',
            'Tem certeza de que deseja excluir este projeto?',
        [
            {
                text: 'Cancelar',
                style: 'cancel',
            },
            {
                text: 'Confirmar',
                onPress: async () => {
                    try {
                        await projetoRef.delete();
                        Alert.alert('Sucesso', 'Projeto excluído');
                        navigation.navigate('Tab');
                    } catch (error) {
                        Alert.alert('Erro', 'Ocorreu um erro ao excluir o projeto');
                    }
                },
            },
        ],
        { cancelable: false }
        );
    }


    return(
        <SafeAreaView style={styles.container}>
            {isLoading ? (
                <View style={styles.aviso}>
                    <ActivityIndicator size="large" color="#fff" />
                    <Text style={{ color: '#fff', marginTop: 5 }}>Carregando imagem</Text>
                </View>
            ) : (
                <>
                    {imagemUrl ?
                        <View style={{ flexDirection: 'column', alignItems: 'center' }}>
                            <Image
                                source={{ uri: imagemUrl }}
                                style={styles.image}
                            />
                            <TouchableOpacity
                                onPress={resetImageUrl}
                            >
                                <Image style={{ width:30, height: 30 }} source={require('../../assets/images/deleteIcon.png')}/>
                            </TouchableOpacity>
                        </View>
                    :
                        <TouchableOpacity onPress={carregaImagem} style={{ alignItems: 'center' }}>
                            <Image style={{ width: 200, height: 200, borderRadius: 10 }} source={require('../../assets/images/imagemTeste.png')}/>
                            <Text style={{ color: '#fff', marginTop: 5 }}>Adicionar Imagem</Text>
                            <Text>{imagemUrl}</Text>
                        </TouchableOpacity>
                    }

            <TextInput 
                style={styles.inputText}
                value={nomeProjeto}
                onChangeText={setNomeProjeto}
                placeholderTextColor={'#fff'}
            />

            <TextInput 
                style={styles.inputText}
                value={descricaoProjeto}
                onChangeText={setDescricaoProjeto}
                placeholderTextColor={'#fff'}
            />

            <TouchableOpacity
                style={styles.button}
                onPress={() => {
                    if(nomeProjeto.length < 40){
                        editarProjeto();
                    } else{
                        Alert.alert('Erro', 'Nome do projeto grande demais')
                    }
                } 
                }
            >
                <Text style={styles.buttonText}>Salvar Modificações</Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={styles.button}
                onPress={deleteProjeto}
            >
                <Text style={styles.buttonText}>Deletar Projeto</Text>
            </TouchableOpacity>
                    
                </>
            )}            
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#1C1C1C',
        alignItems: 'center',
        justifyContent: 'center'
    },

    inputText: {
        width: '90%',
        borderBottomWidth: 1,
        borderColor: '#663399',
        color: '#fff',
        marginVertical: 20
    },

    button: {
        backgroundColor: '#663399',
        paddingVertical: 10,
        paddingHorizontal: 10,
        borderRadius: 10,
        borderWidth: 1,
        marginVertical: 20
    },

    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },

    aviso: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#333333',
        paddingHorizontal: 20,
        paddingVertical: 20,
        borderRadius: 15,
        borderWidth: 1,
        borderColor: '#663399',
    },

    image: {
        width: 200,
        height: 200,
        marginBottom: 5,
        borderRadius: 5,
        borderWidth: 2,
        borderColor: "#333333",
    },
})