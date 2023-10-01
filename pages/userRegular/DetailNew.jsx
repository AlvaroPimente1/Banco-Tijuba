import React, { useContext } from "react";
import styles from "../../style/commonsStyles";
import ParamContext from "../../context/projetoContext";
import { View, SafeAreaView, Text, StyleSheet, ScrollView, Image, TouchableOpacity, Alert } from "react-native";
import ImageConteiner from "../../components/ImagemConteiner";
import { adicionarProjetoAoUsuario } from "../../firebase/api/user/addProjectUser";

export default function DetailNew({ route }){
    const { params } = useContext(ParamContext);
    const projetos = params.projeto;
    
    return(
        <SafeAreaView style={styles.conteiner}>
            <ImageConteiner source={require('../../assets/images/imagemTeste.png')} />
            <ScrollView>
                    <Text style={styles.name}>{projetos.nome_projeto}</Text>
                <View style={styles.descriptionConteiner}>
                    <Text style={styles.description}>{projetos.descricao}</Text>
                </View>

                <View style={styles.buttonConteiner}>
                    <TouchableOpacity
                        style={styles.button}
                        onPress={() => adicionarProjetoAoUsuario(projetos)}
                    >
                        <Text style={styles.buttonText}>Quero apoiar esse projeto!</Text>  
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}
