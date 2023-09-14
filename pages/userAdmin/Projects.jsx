import React from "react";
import styles from "../../style/commonsStyles";
import getAllProject from "../../firebase/api/admin/getAllProject";
import { SafeAreaView, Text, TextInput, FlatList, View, TouchableOpacity, Image } from "react-native";

export default function ListAdmin({ navigation }){
    const projetos = getAllProject();

    function renderItem({ item }){
        return(
            <View>
                <TouchableOpacity style={styles.conteinerLista}
                    onPress={()=> navigation.navigate('DetailAdmin', { projeto: item })}
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
    return(
        <SafeAreaView style={styles.conteiner}>
            <TextInput
                style={styles.inputText}
                placeholder={'Pesquise o projeto que quiser'}
                placeholderTextColor={'#F5F5F5'}
            />
            <FlatList
                data={projetos}
                renderItem={renderItem}
                keyExtractor={item => item.id}
            />
        </SafeAreaView>
    )
}