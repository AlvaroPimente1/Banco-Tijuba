import React, { useState, useEffect } from "react";
import styles from "../../style/commonsStyles";
import getAllProject from "../../firebase/api/admin/getAllProject";
import { useContext } from "react";
import ParamContext from "../../context/projetoContext";
import { SafeAreaView, Text, TextInput, FlatList, View, TouchableOpacity, Image } from "react-native";

export default function ListAdmin({ navigation }){
    const [searchText, setSearchText] = useState('');
    const [filteredProjects, setFilteredProjects] = useState([]);
    const allProjects = getAllProject(); 
    const { setParams } = useContext(ParamContext);

    useEffect(() => {
        if (searchText === '') {
            setFilteredProjects(allProjects);
        } else {
            const filtered = allProjects.filter(item => {
                const itemData = item.nome_projeto.toUpperCase();
                const textData = searchText.toUpperCase();
                return itemData.includes(textData);
            });
            setFilteredProjects(filtered);
        }
    }, [searchText, allProjects]);

    function renderItem({ item }){
        return(
            <View>
                <TouchableOpacity style={styles.conteinerLista}
                                    onPress={() => {
                                        setParams({ projeto: item }); 
                                        navigation.navigate('TopAdmin', { screen: 'DetailAdmin' });
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
            </View>
        )
    }
    return(
        <SafeAreaView style={styles.conteiner}>
            <TextInput
                style={styles.inputText}
                placeholder={'Pesquise o projeto que quiser'}
                placeholderTextColor={'#F5F5F5'}
                onChangeText={text => setSearchText(text)}
            />
            
            <FlatList
                data={filteredProjects}
                renderItem={renderItem}
                keyExtractor={item => item.id}
            />
            
        </SafeAreaView>
    )
}