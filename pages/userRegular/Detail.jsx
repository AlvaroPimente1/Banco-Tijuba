import React from "react";
import styles from "../../style/commonsStyles";
import { View, SafeAreaView, Text, StyleSheet, ScrollView, Image } from "react-native";

export default function Detail({ route }){
    const projetos = route.params.projetos;

    return(
        <SafeAreaView style={styles.conteiner}>
            <View style={styles.imagemConteiner}>
                <Image style={styles.image} source={require('../../assets/images/imagemTeste.png')}/>
            </View>
            <ScrollView>
                    <Text style={styles.name}>{projetos.nome_projeto}</Text>
                <View style={styles.descriptionConteiner}>
                    <Text style={styles.description}>{projetos.descricao}</Text>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}
