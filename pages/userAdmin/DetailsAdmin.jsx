import React, { useState, useContext, useEffect } from "react";
import styles from "../../style/detailStyles";
import firestore from '@react-native-firebase/firestore';
import ParamContext from "../../context/projetoContext";
import { View, SafeAreaView, Text, StyleSheet, Image, TouchableOpacity, Alert, ScrollView } from "react-native";
import ListApoiadores from "../../components/ListaParticipantes";
import ModalDoacao from "../../components/ModalDoacao";
import getUserID from "../../firebase/api/user/getUserID";

export default function DetailAdmin({ route, navigation }){
    const [ isModalVisible, setModalVisible ] = useState(false);
    const [ quantidadeSolicitacoes, setQuantidadeSolicitacoes ] = useState(0);
    const { params } = useContext(ParamContext);
    const projetos = params.projeto;

    const [ showList, setShowList ] = useState(false);

    function mostrarListaUsuarios(){
        if(!showList){
            setShowList(true)
        }else{
            setShowList(false)
        }
    }

    const addDoacao = async (doacao) => {
        if (doacao) {
            try {
                const userRef = await firestore()
                    .collection('usuarios_admin')
                    .doc(getUserID())
                    .get();

                if (userRef.exists) {
                    const userData = userRef.data();
    
                    await firestore()
                        .collection('projetos')
                        .doc(projetos.id) 
                        .collection('doacoes_projeto')
                        .add({ 
                            nome_doacao: doacao,
                            check: false,
                            dt_solicitacao: firestore.FieldValue.serverTimestamp(),
                            cadastrado_por: userData.nome,
                            telefone: userData.telefone
                        });
    
                    Alert.alert('Sucesso', 'Solicitação de doação executada com êxito');
                } else {
                    Alert.alert('Erro', 'Usuário não encontrado.');
                }
            } catch (error) {
                console.error(error);
                Alert.alert('Erro', 'Não foi possível executar a ação no momento.');
            }
        } else {
            Alert.alert('Erro', 'Doação não especificada.');
        }
    };
    

    return(
        <ScrollView style={styles.conteiner}>
                    <View style={styles.imagemConteiner}>
                        {projetos.foto_projeto ? (
                            <Image style={styles.image} source={{ uri: projetos.foto_projeto }} />
                        ) : (
                            <Image style={styles.image} source={require('../../assets/images/imagemTeste.png')} />
                        )}
                        <TouchableOpacity onPress={() => navigation.navigate('Editar')}>
                            <Image style={styles.editIcon} source={require('../../assets/images/edit.png')} />
                        </TouchableOpacity>
                    </View>
                        <Text style={styles.name}>{projetos.nome_projeto}</Text>
                    <View style={styles.descriptionConteiner}>
                        <Text style={styles.description}>{projetos.descricao}</Text>
                        <Text style={styles.description}>Categoria: {projetos.categoria}</Text>
                        <Text style={styles.description}>Cadastrado por {projetos.cadastradorPor}</Text>
                    </View>

                    <View style={styles.buttonConteiner}>
                        <TouchableOpacity
                            style={styles.button}
                            onPress={()=> setModalVisible(true)}
                        >
                            <Text style={styles.buttonText}>Solicitar Doação</Text>  
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={styles.button}
                            onPress={()=> navigation.navigate('DoacaoAdmin')}
                        >
                            <Text style={styles.buttonText}>Visualizar Doações</Text>  
                        </TouchableOpacity>
                        
                    </View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
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

                <TouchableOpacity
                    onPress={() => navigation.navigate('Solicitacoes')}
                >
                    <Text style={styles.participantesText}>Solicitações</Text>
                </TouchableOpacity>
            </View>

            {showList
                ? <ListApoiadores/>
                : null
            }

            <ModalDoacao isModalVisible={isModalVisible} setModalVisible={setModalVisible} addDoacao={addDoacao}/>
        </ScrollView>
    )
}