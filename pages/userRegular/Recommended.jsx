import React from "react";
import { SafeAreaView, View, Text, FlatList, TouchableOpacity, Image, TextInput } from "react-native";
import styles from "../../style/commonsStyles";
import useFetchRecommendedProjects from "../../firebase/api/user/projetosRecomendados";

export default function RecommendedScreen({ navigation }){
    const projects = useFetchRecommendedProjects();

    function renderItem({ item }){
        return(
            <TouchableOpacity style={styles.conteinerLista}
            onPress={() => {
                setParams({ projeto: item }); 
                navigation.navigate('DetailsNew');
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
                data={projects}
                renderItem={renderItem}
                keyExtractor={item => item.id.toString()}
            />
        </SafeAreaView>
    )
}

