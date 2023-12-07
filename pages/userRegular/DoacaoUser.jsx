import React, { useState, useEffect, useContext } from "react";
import { SafeAreaView, View, Text, StyleSheet, Alert, TouchableOpacity, FlatList, Linking, Image } from "react-native";
import { formatDate } from "../../utils/formatDate";
import ParamContext from "../../context/projetoContext";
import firestore from '@react-native-firebase/firestore';

export default function DoacaoUserScreen(){
    const { params } = useContext(ParamContext);
    const projetos = params.projeto;

    const [ doacoes, setDoacoes ] = useState([]);
    const [ showPix, setShowPix ] = useState(false);

    useEffect(()=>{
        const doacaoRef = firestore()
            .collection('projetos')
            .doc(projetos.id)
            .collection('doacoes_projeto')
            .where('check', '==', false) 
            .orderBy('dt_solicitacao', 'desc');
            const unsub = doacaoRef.onSnapshot((snapshot) =>{
                const doacoesArray = snapshot.docs.map(doc => {
                    return{ ...doc.data(), id: doc.id };
                })
                setDoacoes(doacoesArray);
            }, error => {
                
            })

            return ()=>{
                unsub();
            }
        }, [])

    const openPix = () => {
        const urlPix = 'pix://mmibcotijuba17@gmail.com';
        Linking.openURL(urlPix)
    }

    const handleShowPix = () => {
        showPix ? setShowPix(false) : setShowPix(true)
    }

    function renderItem({ item }){
        
        const openZap = () => {
            const mensagemPadrao = encodeURIComponent(`Olá, estou interessado na doação de ${item.nome_doacao} no projeto ${projetos.nome_projeto}!`);
            const urlZap = `https://wa.me/55${item.telefone}?text=${mensagemPadrao}`;
            Linking.openURL(urlZap);
        };

        return(
            <TouchableOpacity style={styles.containerLista}
                onPress={openZap}
            >
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <View style={{ flexDirection: 'column', justifyContent: 'flex-start' }}>
                        <Text style={{ color: '#fff', fontSize: 15 }}>{item.nome_doacao}</Text>
                        <Text style={{ color: '#fff', fontSize: 13, marginTop: 3 }}>Data da solicitação: {formatDate(item.dt_solicitacao)}</Text>
                        <Text style={{ color: '#fff', fontSize: 13, marginTop: 3 }}>Responsável: {item.cadastrado_por}</Text>
                    </View>
                    <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                        <View style={{ backgroundColor: 'green', paddingHorizontal: 5, paddingVertical: 5, borderRadius: 10 }}>
                                <Text style={{ color: '#fff' }}>Entre em contato</Text>
                        </View>
                    </View>
                </View>
            </TouchableOpacity>
        )
    }

    return(
        <SafeAreaView style={styles.container}>
            <View style={styles.containerTitulo}>
                <Text style={styles.titulo}>Mural do que precisamos</Text>
                <TouchableOpacity style={{ alignItems: 'center', marginTop: 5 }}
                    onPress={handleShowPix}
                >
                    <Text style={styles.subTitulo}>Deseja contribuir com quantia?</Text>
                    {/* <Text style={styles.subTitulo}>Clique aqui!</Text>                 */}
                </TouchableOpacity>
            </View>
            {
                showPix ? 
                    <TouchableOpacity style={{ alignItems: 'center', marginBottom: 10 }}
                        onPress={openPix}
                    >
                        <Image style={{ width: 70, height: 70 }} source={require('../../assets/images/pix.png')}/>
                    </TouchableOpacity>
                :
                    null
            }
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
        marginVertical: 20,
        alignItems: 'center',
    },

    titulo: {
        fontSize: 25,
        color: '#fff'
    },

    subTitulo: {
        color: '#fff'
    }
})