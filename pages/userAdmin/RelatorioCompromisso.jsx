import React, { useState, useEffect } from "react";
import { SafeAreaView, View, Text, StyleSheet, TextInput, Image, TouchableOpacity, Alert, ScrollView } from "react-native";
import { formatDate } from "../../utils/formatDate";
import firestore from '@react-native-firebase/firestore';
import Loading from "../../components/Loading";
import { addImagemRelatorio } from "../../firebase/api/admin/addImageRelatorio";

export default function RelatorioCompromissoScreen({ route }) {
    const compromisso = route.params.compromisso;
    const dataSelecionada = route.params.dataSelecionada;

    const [relatorioExistente, setRelatorioExistente] = useState(null);
    const [relatorio, setRelatorio] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const [ imagemUrl, setImagemUrl ] = useState(null);

    const carregaImagem = async() => {
        const url = await addImagemRelatorio(setIsLoading);
        setImagemUrl(url);
    }

    const resetImageUrl = async() => {
        setImagemUrl(null)
    }

    useEffect(() => {
        const verificarRelatorio = async () => {
            try {
                const relatorioRef = firestore()
                    .collection('agenda')
                    .doc(dataSelecionada)
                    .collection('compromisso')
                    .doc(compromisso.id);

                const doc = await relatorioRef.get();

                if (doc.exists && doc.data().relatorio) {
                    setRelatorioExistente(true); 
                    setIsLoading(false);
                } else {
                    setRelatorioExistente(null); 
                    setIsLoading(false);
                }
            } catch (error) {
                console.error("Erro ao verificar relatório existente: ", error);
                setIsLoading(false);
            }
        };

        verificarRelatorio();
    }, [dataSelecionada, compromisso.id]);

    async function enviarRelatorio() {
        try {
            const relatorioRef = firestore()
                .collection('agenda')
                .doc(dataSelecionada)
                .collection('compromisso')
                .doc(compromisso.id);

            await relatorioRef.set({
                imagem_relatorio: imagemUrl,
                relatorio: relatorio,
                dt_relatorio: firestore.FieldValue.serverTimestamp()
            }, { merge: true });

            Alert.alert('Concluído', 'Relatório Criado com Êxito' + compromisso.id);
            setRelatorio('');
        } catch (error) {
            Alert.alert('Erro', 'Erro ao enviar relatório: ' + error.message);
        }
    }

    return (
        <SafeAreaView style={styles.container}>
            {isLoading ? (
                <Loading />
            ) : (
                <>
                    <View style={styles.infoContainer}>
                        <Text style={{ color: '#fff', fontSize: 20 }}>{compromisso.titulo_compromisso}</Text>
                        <Text style={{ color: '#fff' }}>{compromisso.descricao_compromisso}</Text>
                    </View>
                    {relatorioExistente ? (
                        <ScrollView>
                            <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                                    <Image style={styles.relatorioImageExiste} source={{ uri: compromisso.imagem_relatorio }} />
                                <View style={styles.relatorioContainer}>
                                    <Text style={styles.relatorioText}>{compromisso.relatorio}</Text>
                                    <Text style={{ color: '#fff' }}>Relatório criado em {formatDate(compromisso.dt_relatorio)}</Text>
                                </View>
                            </View>
                        </ScrollView>
                    ) : (
                        <View style={styles.conteudoContainer}>
                            {
                                imagemUrl ?
                                <TouchableOpacity style={styles.imageContainer}
                                    onPress={carregaImagem}
                                >
                                    <Image
                                        source={{ uri: imagemUrl }}
                                        style={styles.relatorioImage}
                                    />
                                    <Text style={styles.imageText}>Trocar Imagem</Text>
                                </TouchableOpacity>
                                :
                                <TouchableOpacity style={styles.imageContainer}
                                    onPress={carregaImagem}
                                >
                                    <Image source={require('../../assets/images/adicionar__imagem.png')} />
                                    <Text style={styles.imageText}>Adicionar Imagem</Text>
                                </TouchableOpacity>
                            }
                            <TextInput
                                style={styles.textArea}
                                placeholder="Relatorio..."
                                placeholderTextColor="#fff"
                                numberOfLines={10}
                                multiline={true}
                                onChangeText={setRelatorio}
                                value={relatorio}
                            />

                            <TouchableOpacity style={styles.botaoEnviar}
                                onPress={enviarRelatorio}
                            >
                                <Text style={styles.buttonText}>Criar Relatório</Text>
                            </TouchableOpacity>
                        </View>
                    )}
                </>
            )}
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#1C1C1C',
        alignItems: 'center'
    },

    textArea: {
        height: '30%',
        justifyContent: "flex-start",
        borderWidth: 1,
        borderColor: "#663399",
        padding: 13,
        borderRadius: 15,
        textAlignVertical: 'top',
        width: 300,
        color: '#fff',
        backgroundColor: '#1C1C1C'
    },

    infoContainer: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: "#663399",
        padding: 20,
        borderBottomEndRadius: 20,
        borderBottomStartRadius: 20,
        maxWidth: '80%',
        minWidth: '50%',
    },

    imageContainer: {
        justifyContent: 'center',
        alignItems: 'center'
    },

    image: {
        height: 200,
        width: 200
    },

    imageText: {
        color: '#fff',
        marginTop: 4
    },

    botaoEnviar: {
        backgroundColor: '#663399',
        paddingVertical: 10,
        paddingHorizontal: 10,
        borderRadius: 10,
        borderWidth: 1,
    },

    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold'
    },

    relatorioContainer: {
        paddingHorizontal: 10,
        backgroundColor: '#333333',
        paddingVertical: 8,
        marginHorizontal: 5,
        borderRadius: 5,
    },

    conteudoContainer: {
        justifyContent: 'space-around', 
        alignItems: 'center',
        flex: 2
    },

    relatorioText: {
        color: '#fff',
        fontSize: 17
    },

    relatorioImage: {
        height: 200,
        width: 200,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#663399'
    },

    relatorioImageExiste: {
        height: 300,
        width: 300,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#663399',
        marginVertical: 15
    }
})