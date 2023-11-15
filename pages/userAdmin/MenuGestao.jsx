import React from "react";
import { SafeAreaView, View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";

export default function MenuGestaoScreen({ navigation }){

    return(
        <SafeAreaView style={styles.container}>
            <TouchableOpacity
                style={styles.containerLista}
                onPress={() => navigation.navigate('Meu Perfil')}
            >
                <Image style={styles.icons} source={require('../../assets/images/MenuPerson.png')}/>
                <Text style={styles.textLista}>Meu Perfil</Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={styles.containerLista}
                onPress={() => navigation.navigate('Novo projeto')}
            >
                <Image style={styles.icons} source={require('../../assets/images/NovoProjetoIcon.png')}/>
                <Text style={styles.textLista}>Criar Novo Projeto</Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={styles.containerLista}
                onPress={() => navigation.navigate('Agenda Mmib')}
            >
                <Image style={styles.icons} source={require('../../assets/images/MenuCalendario.png')}/>
                <Text style={styles.textLista}>Agenda Compartilhada MMIB</Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={styles.containerLista}
                onPress={() => navigation.navigate('Criar Usuario')}
            >
                <Image style={styles.icons} source={require('../../assets/images/MenuPersonAdd.png')}/>
                <Text style={styles.textLista}>Criar Usuário Administrador MMIB</Text>
            </TouchableOpacity>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#1C1C1C'
    },

    containerLista: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#663399',
        paddingHorizontal: 20,
        paddingVertical: 15,
        marginVertical: 10,
        borderRadius: 50
    },

    textLista: {
        fontSize: 18,
        color: '#fff',
        paddingHorizontal: 10
    },

    icons: {
        width: 35,
        height:35
    }
})