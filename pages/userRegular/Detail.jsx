import React, { useContext, useState, useEffect } from "react";
import styles from "../../style/detailStyles";
import ParamContext from "../../context/projetoContext";
import { View, Alert, Text, TouchableOpacity, ScrollView, Image } from "react-native";
import { formatDate } from "../../utils/formatDate";
import ListApoiadores from "../../components/ListaParticipantes";
import getUserINFO from "../../firebase/api/user/getUserInfo";
import firestore from '@react-native-firebase/firestore';

export default function Detail({ navigation }){
    const { params } = useContext(ParamContext);
    const projetos = params.projeto;

    const [ usuarioInfo, setUsuarioInfo ] = useState('');
    const [ showList, setShowList ] = useState(false);

    useEffect(() => {
        async function fetchData() {
            const info = await getUserINFO();
            setUsuarioInfo(info);
        }
        fetchData();
    }, []);

    function mostrarListaUsuarios(){
        if(!showList){
            setShowList(true)
        }else{
            setShowList(false)
        }
    }

    async function sairProjeto() {
        try {
            const userProjetosRef = firestore().collection('usuarios').doc(usuarioInfo.id).collection('projetos_usuario').doc(projetos.id);
            const projetoRef = firestore().collection('projetos').doc(projetos.id);
    
            if (projetos.participantesProjeto.includes(usuarioInfo.id)) {
                Alert.alert(
                    'Confirmar',
                    'Tem certeza de que deseja sair deste projeto?',
                    [
                        {
                            text: 'Cancelar',
                            style: 'cancel',
                        },
                        {
                            text: 'Confirmar',
                            onPress: async () => {
                                await projetoRef.update({
                                    participantesProjeto: firestore.FieldValue.arrayRemove(usuarioInfo.id)
                                });
    
                                await userProjetosRef.delete();
    
                                Alert.alert('Concluído', 'Você não faz mais parte deste projeto!');
                                navigation.navigate('Tab');
                            },
                        },
                    ],
                    { cancelable: false }
                );
            } else {
                Alert.alert('Erro', 'Você não faz parte deste projeto.');
            }
        } catch (error) {
            Alert.alert('Erro', 'Não foi possível efetuar a operação no momento');
            console.error(error);
        }
    }
    

    return(
    <ScrollView style={styles.conteiner}>
            <View style={styles.imagemConteiner}>
                        {projetos.foto_projeto ? (
                            <Image style={styles.image} source={{ uri: projetos.foto_projeto }} />
                        ) : (
                            <Image style={styles.image} source={require('../../assets/images/imagemTeste.png')} />
                        )}
            </View>
                        <Text style={styles.name}>{projetos.nome_projeto}</Text>
                    <View style={styles.descriptionConteiner}>
                        <Text style={styles.description}>{projetos.descricao}</Text>
                        <Text style={styles.description}>Categoria: {projetos.categoria}</Text>
                        <Text style={styles.description}>Cadastrado por {projetos.cadastradorPor}</Text>
                    </View>


            <TouchableOpacity style={styles.botaoLista}
                onPress={mostrarListaUsuarios}
            >
                <Text style={styles.participantesText}>Participantes</Text>
                
                {
                    showList
                    ? <Image style={styles.iconLista} source={require('../../assets/images/setaBaixo.png')}/>
                    : <Image style={styles.iconLista} source={require('../../assets/images/setaDireita.png')}/>
                }

            </TouchableOpacity>

            {showList
                ? <ListApoiadores/>
                : null
            }

            <View style={styles.buttonConteiner}>
                <TouchableOpacity
                    style={styles.button}
                    onPress={sairProjeto}
                >
                    <Text style={styles.buttonText}>Sair do projeto</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    )
}