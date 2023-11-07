import React, { useContext } from "react";
import ParamContext from "../../context/projetoContext";
import styles from "../../style/commonsStyles";
import { SafeAreaView, View, Text, TextInput, Alert, FlatList, TouchableOpacity, Image } from 'react-native';
import getNewProject from "../../firebase/api/user/getnewProject";
import firestore from '@react-native-firebase/firestore';
import getUserID from "../../firebase/api/user/getUserID";
import { formatDate } from "../../utils/formatDate";

export default function NewProject({ navigation }){
    const { setParams } = useContext(ParamContext);

    const {
        text, setText,
        list, setList,
    } = getNewProject();

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
        async function horaEntrada() {
            const userRef = firestore()
                .collection('usuarios')
                .doc(getUserID())
                .collection('interacao_projetos')
                .doc(item.id);

            try {
                await userRef.set(
                    {
                        dt_entrada: firestore.FieldValue.serverTimestamp()
                    },
                    { merge: true } 
                );
            } catch (error) {
                console.error(error);
            }
        }

        return(
            <View>
                <TouchableOpacity style={styles.conteinerLista}
                        onPress={() => {
                            setParams({ projeto: item }); 
                            navigation.navigate('DetailsNew');
                            horaEntrada();
                        }}  
                >
                    <View style={{flexDirection: 'row'}}>
                        <Image style={styles.fotoDemo} source={require('../../assets/images/imagemTeste.png')}/>
                        <Text style={styles.textoLista}>{item.nome_projeto}</Text>
                    </View>
                    <Text style={styles.descricao}>{item.descricao}</Text>
                </TouchableOpacity>
            </View>
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
