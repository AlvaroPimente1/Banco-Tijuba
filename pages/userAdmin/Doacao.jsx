import React, { useState, useEffect, useContext } from "react";
import { SafeAreaView, View, Text, StyleSheet, Alert, TouchableOpacity, FlatList, Image } from "react-native";
import { formatDate } from "../../utils/formatDate";
import ParamContext from "../../context/projetoContext";
import firestore from '@react-native-firebase/firestore';

export default function DoacaoAdminScreen(){
    const { params } = useContext(ParamContext);
    const projetos = params.projeto;
    const [ doacoes, setDoacoes ] = useState([]);
    const [ isCheck, setIsCheck ] = useState('');

    useEffect(()=>{
            const doacaoRef = firestore()
                    .collection('projetos')
                    .doc(projetos.id)
                    .collection('doacoes_projeto');
            const unsub = doacaoRef.onSnapshot((snapshot) =>{
                const doacoesArray = snapshot.docs.map(doc => {
                    return{ ...doc.data(), id: doc.id };
                })
                setDoacoes(doacoesArray);
            }, error => {
                Alert.alert('Erro', 'Ocorreu um erro ao consultar as solicitações de doação')
            })
            
            return ()=>{
                unsub();
            }
        }, [])

    function renderItem({ item }){
        async function checkDoacao() {
            try {
                const doacaoRef = firestore()
                .collection('projetos')
                .doc(projetos.id)
                .collection('doacoes_projeto')
                .doc(item.id);

                const doacaoDoc = await doacaoRef.get();
                if (doacaoDoc.exists) {
                const doacaoData = doacaoDoc.data();
                const isCheckTrue = doacaoData.check === true;

                Alert.alert(
                    'Confirmação',
                    `Tem certeza de que deseja marcar a doação como ${
                    isCheckTrue ? 'não verificada' : 'verificada'
                }?`,
                [
                    {
                        text: 'Cancelar',
                        style: 'cancel',
                    },
                    {
                        text: 'Confirmar',
                        onPress: async () => {
                            if (!isCheckTrue) {
                                await doacaoRef.update({
                                    check: true,
                                    dt_check: firestore.FieldValue.serverTimestamp(),
                            });
                                setIsCheck(true);

                            } else {
                                await doacaoRef.update({
                                    check: false,
                                    dt_check: firestore.FieldValue.serverTimestamp(),
                                });
                                setIsCheck(false);
                            }
                        },
                    },
                ],
                { cancelable: false }
                );
                } else {
                Alert.alert('O documento não existe');
            }
            } catch (error) {
                console.error(error);
            }
        }

        async function deleteDoacao(){
            try{
                const doacaoRef = firestore()
                .collection('projetos')
                .doc(projetos.id)
                .collection('doacoes_projeto')
                .doc(item.id);

                Alert.alert(
                    'Confirmação', 'Deseja exluir a solicitação de doação?',
                    [
                        {
                            text: 'Cancelar',
                            style: 'cancel'
                        },
                        {
                            text: 'Confirmar',
                            onPress: async () => {
                                await doacaoRef.delete();
                                Alert.alert('Sucesso', 'Operação executada com êxito!');
                            }
                        }
                    ],
                    { cancelable: false }
                );
            } catch(error){
                Alert.alert('Erro', 'Operação não pôde ser executada com êxito!');
                console.error(error);
            }
        }

        return(
            <View style={styles.containerLista}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <View style={{ flexDirection: 'column', justifyContent: 'flex-start' }}>
                        <Text style={{ color: '#fff', fontSize: 15 }}>{item.nome_doacao}</Text>
                        <Text style={{ color: '#fff', fontSize: 13, marginTop: 3 }}>Data da solicitação: {formatDate(item.dt_solicitacao)}</Text>
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                        {
                            isCheck ?
                            <TouchableOpacity
                                onPress={checkDoacao}
                                style={{ backgroundColor: 'green', paddingHorizontal: 5, paddingVertical: 5, borderRadius: 10 }}
                            >
                                <Text style={{ color: '#fff' }}>Já doado!</Text>
                            </TouchableOpacity>
                            :
                            <TouchableOpacity
                                onPress={checkDoacao}
                            >
                                <Image style={styles.icons} source={require('../../assets/images/check.png')} />
                            </TouchableOpacity>
                        }

                        <TouchableOpacity
                            onPress={deleteDoacao}
                        >
                            <Image style={styles.icons} source={require('../../assets/images/deleteIcon.png')}/>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        )
    }

    return(
        <SafeAreaView style={styles.container}>
            <View style={styles.containerTitulo}>
                <Text style={styles.titulo}>Mural do que precisamos</Text>
            </View>
            <FlatList   
                data={doacoes}
                keyExtractor={item => item.id}
                renderItem={renderItem}
            />
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#1C1C1C',
    },

    containerLista: {
        paddingHorizontal: 10,
        paddingVertical: 10,
        marginVertical: 5,
        borderColor: '#663399',
        borderLeftWidth: 0,
        borderRightWidth: 0,
        borderWidth: 1,
    },

    containerTitulo: {
        marginVertical: 30,
        alignItems: 'center'
    },

    subTitulo: {
        color: '#fff',
        fontSize: 15
    },

    titulo: {
        fontSize: 25,
        color: '#fff'
    },

    icons: {
        width: 25, 
        height: 25,
        marginHorizontal: 10
    }
})