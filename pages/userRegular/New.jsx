import React, { useContext } from "react";
import ParamContext from "../../context/projetoContext";
import styles from "../../style/commonsStyles";
import { SafeAreaView, View, Text, TextInput, FlatList, TouchableOpacity, Image } from 'react-native';
import getNewProject from "../../firebase/api/user/getnewProject";
import firestore from '@react-native-firebase/firestore';
import getUserID from "../../firebase/api/user/getUserID";

export default function NewProject({ navigation }){
    const { setParams } = useContext(ParamContext);

    const {
        text, setText,
        list, setList,
        items, setItems
    } = getNewProject();

    function FiltroBusca(text) {
        const filterList = items.filter((item) => {  
            const itemFilter = item.nome_projeto ? item.nome_projeto.toUpperCase() : ''.toUpperCase();
            const newText = text.toUpperCase();
            return itemFilter.indexOf(newText) > -1;
        });
    
        setList(filterList);
        setText(text); 
    }

    function renderItem({ item }){
        async function horaEntrada() {
            const userRef = firestore()
                .collection('usuarios')
                .doc(getUserID())
                .collection('interacao_projetos')
                .doc(item.id);

            try {
                await userRef.set(
                    {
                        nome_projeto: item.nome_projeto,
                        dt_entrada: firestore.FieldValue.serverTimestamp()
                    },
                    { merge: true } 
                );
            } catch (error) {
                console.error(error);
            }
        }

        return(
            <SafeAreaView>
                <TouchableOpacity style={styles.conteinerLista}
                        onPress={() => {
                            setParams({ projeto: item }); 
                            navigation.navigate('DetailsNew');
                            horaEntrada();
                        }}  
                >
                <View style={{flexDirection: 'row'}}>
                    {item.foto_projeto ? 
                            <Image style={styles.fotoDemo} source={{ uri: item.foto_projeto }} />
                        : 
                            <Image style={styles.fotoDemo} source={require('../../assets/images/logoMMib.png')} />
                    }
                    <View style={{ flexDirection: 'column' }}>
                        <Text style={styles.textoLista}>{item.nome_projeto}</Text>
                        <Text style={styles.textoMenorLista}>{item.categoria}</Text>
                    </View>
                </View>
                    <Text style={styles.descricao}>{item.descricao}</Text>
                </TouchableOpacity>
            </SafeAreaView>
        )
    }

    return (
        <View style={styles.conteiner}>
            <View style={styles.searchBar}>
                <TextInput 
                    style={styles.inputText}
                    placeholder={'Pesquise o projeto que quiser'}
                    placeholderTextColor={'#F5F5F5'}
                    onChangeText={(t)=>FiltroBusca(t)} 
                    value={text}
                />
            </View>
            <FlatList
                data={list}
                renderItem={renderItem}
                keyExtractor={(item) => item.key}
            />
        </View>
    )
}
