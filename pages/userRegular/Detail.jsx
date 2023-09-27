import React, { useContext, useState, useEffect } from "react";
import styles from "../../style/commonsStyles";
import ParamContext from "../../context/projetoContext";
import { View, SafeAreaView, Text, StyleSheet, ScrollView, Image, FlatList } from "react-native";
import { formatDate } from "../../utils/formatDate";
import ListApoiadores from "../../components/ListaParticipantes";

export default function Detail(){
    const { params } = useContext(ParamContext);
    const projetos = params.projeto;

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
                <Text style={styles.description}>Criado em: {formatDate(projetos.dt_criacao)}</Text>
            </ScrollView>
            <ListApoiadores/>
        </SafeAreaView>
    )
}
