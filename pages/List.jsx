import React from "react";
import { SafeAreaView, View, Text, TextInput, StyleSheet, FlatList, TouchableOpacity, Image } from 'react-native';
import { useState } from "react";
import { useEffect } from "react";
import firestore from '@react-native-firebase/firestore';
import getUserID from "../firebase/getUserID";

export default function ListProject({ navigation }){
    const [text, setText] = useState('')
    const [list, setList] = useState('')
    const [items, setItems] = useState('')
    const [meusprojetos, setMeusProjetos] = useState([]);


    useEffect(() => {
        const fetchEquipamentos = async () => {
            const userRef = firestore().collection('usuarios').doc(getUserID()).collection('projetos_usuario');
            const querySnapshot = await userRef.get();
            const projetosData = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
            setMeusProjetos(projetosData);
            setItems(projetosData);
            setList(projetosData);
        };
    
        fetchEquipamentos();
        }, []);

    function FiltroBusca(text) {
        const filterList = items.filter((item) => {  
            const itemFilter = item.nome ? item.nome.toUpperCase() : ''.toUpperCase();
            const newText = text.toUpperCase();
            return itemFilter.indexOf(newText) > -1;
        });
            setList(filterList)
            setText(text)
        }   

    function renderItem({ item }){
        return(
            <View>
                <TouchableOpacity style={styles.conteinerLista}
                    onPress={()=> navigation.navigate('Details', { projetos: item })}
                >
                    <View style={{flexDirection: 'row'}}>
                        <Image style={styles.fotoDemo} source={require('../assets/images/imagemTeste.png')}/>
                        <Text style={styles.textoLista}>{item.nome_projeto}</Text>
                    </View>
                    <Text style={styles.descricao}>{item.descricao}</Text>
                </TouchableOpacity>
            </View>
        )
    }

    return(
        <SafeAreaView style={styles.conteiner}>
        <TextInput
            style={styles.inputText}
            placeholder={'Pesquise o projeto que quiser'}
            placeholderTextColor={'#F5F5F5'}
            onChangeText={(t)=>FiltroBusca(t)} 
            value={text}
        />
        <FlatList
            data={list}
            renderItem={renderItem}
            keyExtractor={(item) => item.id.toString()}
        />
        </SafeAreaView>
    );
}


const styles = StyleSheet.create({
    conteiner: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#1C1C1C',
    },

    inputText: {
        borderWidth: 2,
        paddingHorizontal: 30,
        paddingVertical: 8,
        borderColor: '#663399',
        marginVertical: 10,
        borderRadius: 15,
        backgroundColor: '#444444',
        color: '#F5F5F5',
        borderRightWidth: 0,
        borderLeftWidth: 0,
        borderTopWidth: 0,
        borderBottomWidth: 0
    },

    textoLista: {
        color: '#F5F5F5',
        alignSelf: 'center',
        marginLeft: 5
    },

    conteinerLista: {
        backgroundColor: '#333333',
        paddingVertical: 8,
        paddingHorizontal: 5,
        marginBottom: 15,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#663399',
        marginHorizontal: 30
    },

    fotoDemo: {
        width: 40,
        height: 40,
        borderRadius: 5,
        marginLeft: 2
    },

    descricao: {
        color: '#F5F5F5',
        paddingVertical: 4,
        paddingHorizontal: 10
    }
})