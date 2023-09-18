import React from "react";
import styles from "../../style/commonsStyles";
import { useContext } from "react";
import ParamContext from "../../context/projetoContext";
import { SafeAreaView, Text, Image, TouchableOpacity } from "react-native";

export default function TimeLineScreen({ navigation }){
    const { params } = useContext(ParamContext);
    const projetos = params.projeto;
    
    return(
        <SafeAreaView style={styles.conteiner}>
            <TouchableOpacity
                onPress={()=> navigation.navigate('TopAdmin', { params: { projeto: item } })}
            >
                <Text>{projetos.nome_projeto}</Text>
            </TouchableOpacity>
        </SafeAreaView>
    )
}