import React, { useContext, useState, useEffect } from "react";
import { SafeAreaView, View, Text, FlatList, TouchableOpacity, Image, TextInput } from "react-native";
import styles from "../../style/commonsStyles";
import useFetchRecommendedProjects from "../../firebase/api/user/projetosRecomendados";
import ParamContext from "../../context/projetoContext";

export default function RecommendedScreen({ navigation }){
    const { setParams } = useContext(ParamContext);
    const allProjects = useFetchRecommendedProjects();
    const [searchText, setSearchText] = useState('');
    const [filteredProjects, setFilteredProjects] = useState([]);

    useEffect(() => {
        if (searchText === '') {
            setFilteredProjects(allProjects);
        } else {
            const filtered = allProjects.filter(item => {
                const itemData = item.nome_projeto
                    ? item.nome_projeto.toUpperCase()
                    : ''.toUpperCase();
                const textData = searchText.toUpperCase();
                return itemData.indexOf(textData) > -1;
            });
            setFilteredProjects(filtered);
        }
    }, [searchText, allProjects]);

    function renderItem({ item }){
        return(
            <TouchableOpacity style={styles.conteinerLista}
                onPress={() => {
                    setParams({ projeto: item }); 
                    navigation.navigate('DetailsRecommend');
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
        )
    }

    return(
        <SafeAreaView style={styles.conteiner}>
            <TextInput
                style={styles.inputText}
                placeholder={'Pesquise o projeto que quiser'}
                placeholderTextColor={'#F5F5F5'}
                onChangeText={(text) => setSearchText(text)}
            />
            <FlatList
                data={filteredProjects}
                renderItem={renderItem}
                keyExtractor={item => item.id.toString()}
            />
        </SafeAreaView>
    )
}

