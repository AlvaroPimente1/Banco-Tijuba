import React from "react";
import { View, SafeAreaView, Text, StyleSheet, ScrollView, Image, TouchableOpacity } from "react-native";
import database from '@react-native-firebase/database';

export default function DetailNew({ route }){
    const projetos = route.params.projetos;

    function atualizarProjeto(key) {
        const ref = database().ref(`TodosProjetos/1`);
        ref.update({ ativado: true });
    }
    
    return(
        <SafeAreaView style={styles.conteiner}>
            <View style={styles.imagemConteiner}>
                <Image style={styles.image} source={require('../assets/images/imagemTeste.png')}/>
            </View>
            <ScrollView>
                    <Text style={styles.name}>{projetos.nome}</Text>
                <View style={styles.descriptionConteiner}>
                    <Text style={styles.description}>{projetos.intuito}</Text>
                </View>

                <View style={styles.buttonConteiner}>
                    <TouchableOpacity
                        style={styles.button}
                        onPress={atualizarProjeto}
                    >
                        <Text style={styles.buttonText}>Quero investir nesse projeto!</Text>  
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}


const styles = StyleSheet.create({
    conteiner: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#1C1C1C'
    }, 
    image: {
        width: 200,
        height: 200,
        marginBottom: 20,
        borderRadius: 5,
        borderWidth: 2,
        borderColor: "#333333"
    },
    name: {
        fontSize: 29,
        fontWeight: 'bold',
        color: "#fff",
        paddingTop: 5,
        textAlign: 'center',
        paddingBottom: 7
    },
    description: {
        fontSize: 15,
        textAlign: 'justify',
        paddingHorizontal: 10,
        color: '#fff',
    },

    subTitulo: {
        fontSize: 15,
        marginBottom: 10,
        color: "#fff",
        textAlign: 'center'
    },

    imagemConteiner: {
        paddingVertical: 20,
        backgroundColor: "#663399",
        paddingHorizontal: 100,
        borderBottomRightRadius: 30,
        borderBottomLeftRadius: 30,
        borderBottomWidth: 1,
        borderColor: '#333333'
    }, 

    descriptionConteiner: {
        paddingHorizontal: 5,
        backgroundColor: '#333333',
        paddingVertical: 8,
        marginHorizontal: 5,
        borderRadius: 5,
    },

    button: {
        backgroundColor: '#663399',
        paddingVertical: 10,
        paddingHorizontal: 10,
        borderRadius: 10,
        borderWidth: 1
    },

    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },

    buttonConteiner: {
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 20
    }
})