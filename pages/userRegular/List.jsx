import React from "react";
import styles from "../../style/commonsStyles";
import { SafeAreaView, View, Text, TextInput, StyleSheet, FlatList, TouchableOpacity, Image } from 'react-native';
import { useState, useContext } from "react";
import ParamContext from "../../context/projetoContext";
import getListProjects from "../../firebase/api/user/getlistProject";

export default function ListProject({ navigation }){
    const [text, setText] = useState('');
    const { projetos, items, list } = getListProjects();
    const { setParams } = useContext(ParamContext);

    function FiltroBusca(text) {
        const filterList = items.filter((item) => {  
            const itemFilter = item.nome ? item.nome.toUpperCase() : ''.toUpperCase();
            const newText = text.toUpperCase();
            return itemFilter.indexOf(newText) > -1;
        });
    
        setList(filterList);
        setText(text); 
    }

    function renderItem({ item }){
        return(
            <View>
                <TouchableOpacity style={styles.conteinerLista}
                    onPress={() => {
                            setParams({ projeto: item }); 
                            navigation.navigate('TopUser', { screen: 'Detail' });
                    }}                    
                >
                <View style={{flexDirection: 'row'}}>
                    {item.foto_projeto ? 
                            <Image style={styles.fotoDemo} source={{ uri: item.foto_projeto }} />
                        : 
                            <Image style={styles.fotoDemo} source={require('../../assets/images/imagemTeste.png')} />
                    }
                    <View style={{ flexDirection: 'column' }}>
                        <Text style={styles.textoLista}>{item.nome_projeto}</Text>
                        <Text style={styles.textoMenorLista}>{item.categoria}</Text>
                    </View>
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