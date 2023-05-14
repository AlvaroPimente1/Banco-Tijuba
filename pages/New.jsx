import React from "react";
import { SafeAreaView, View, Text, TextInput, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { useState } from "react";
import { useEffect } from "react";
import '@react-native-firebase/database'
import firebase from "../firebase";

export default function NewProject({ navigation }){
    const [text, setText] = useState('')
    const [list, setList] = useState('')
    const [items, setItems] = useState('') 

    const [projetosDesativados, setProjetosDesativados] = useState([]);

    useEffect(() => {
        const projetosRef = database.ref('TodosProjetos');
        projetosRef.once('value', (snapshot) => {
        const projetos = snapshot.val();
        const projetosFiltrados = Object.values(projetos).filter((projeto) => !projeto.ativado);
        setProjetosDesativados(projetosFiltrados);
    });
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

        useEffect(()=>{
            setList(projetosDesativados)
            setItems(projetosDesativados)    
        },[])  

    function renderItem({ item }){
        return(
            <View>
                <TouchableOpacity style={styles.conteinerLista}
                >
                    <View style={{flexDirection: 'row'}}>
                        <View style={styles.fotoDemo}/>
                        <Text style={styles.textoLista}>{item.nome}</Text>
                    </View>
                    <Text style={styles.descricao}>{item.intuito}</Text>
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
            data={projetosDesativados}
            renderItem={renderItem}
            keyExtractor={(item) => item.key.toString()}
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
        backgroundColor: '#000',
        borderRadius: 5
    },

    descricao: {
        color: '#F5F5F5',
        paddingVertical: 4,
        paddingHorizontal: 10
    }
})