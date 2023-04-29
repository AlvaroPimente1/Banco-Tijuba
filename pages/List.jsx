import React from "react";
import { SafeAreaView, View, Text, TextInput, StyleSheet, FlatList } from 'react-native';
import { useState } from "react";
import { useEffect } from "react";

export default function ListProject(){
    const [text, setText] = useState('')
    const [list, setList] = useState('')
    const [items, setItems] = useState('') 

    const data = [
        {key: 1, nome: 'Projeto1'},
        {key: 2, nome: 'Projeto2'},
        {key: 3, nome: 'Projeto3'},
        {key: 4, nome: 'Projeto4'},
        {key: 5, nome: 'Projeto5'},
        {key: 6, nome: 'Projeto6'},
        {key: 7, nome: 'Projeto7'}
    ]

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
            setList(data)
            setItems(data)    
        },[])  
    

    function renderItem({ item }){
        return(
            <View>
                <View style={styles.conteinerLista}>
                    <View style={{flexDirection: 'row'}}>
                        <View style={styles.fotoDemo}/>
                        <Text style={styles.textoLista}>{item.nome}</Text>
                    </View>
                    <Text style={styles.descricao}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed id dui est. Quisque blandit porttitor arcu, eu hendrerit velit pellentesque ut. Integer sed mauris vel risus imperdiet euismod. Sed pharetra elit sit amet nunc sollicitudin bibendum. Nulla a ipsum nunc. Nam tempor quam eu lectus fringilla vehicula</Text>
                </View>
            </View>
        )
    }

    return(
        <SafeAreaView style={styles.conteiner}>
        <TextInput
            style={styles.inputText}
            placeholder={'Pesquise o projeto que quiser'}
            placeholderTextColor={'#F5F5F5'}
            onChangeText={(t)=>FiltroBusca(t)} value={text}
        />
            <FlatList
                data={list}
                renderItem={renderItem}
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
        backgroundColor: '#333333',
        color: '#F5F5F5',
        borderRightWidth: 0,
        borderLeftWidth: 0,
        borderTopWidth: 0
    },

    textoLista: {
        color: '#F5F5F5',
        alignSelf: 'center',
        marginLeft: 5
    },

    conteinerLista: {
        backgroundColor: '#444444',
        paddingVertical: 8,
        paddingHorizontal: 5,
        marginBottom: 15,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#333333',
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