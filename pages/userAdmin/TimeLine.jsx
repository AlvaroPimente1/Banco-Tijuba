import React from "react";
import getAllPosts from "../../firebase/api/admin/getAllPosts";
import { formatDate } from "../../utils/formatDate";
import { SafeAreaView, Text, Image, TouchableOpacity, View, FlatList, StyleSheet, ScrollView } from "react-native";

export default function TimeLineScreen(){
    const posts = getAllPosts();

    function renderItem({ item }){
        return(
            <View style={styles.conteinerPost}>
                <View style={styles.viewData}>
                    <Text style={styles.textData}>{formatDate(item.dt_post)}</Text>
                </View>        
                <View style={styles.viewImage}>
                    {item.imagem_post && (
                        <Image
                            source={{ uri: item.imagem_post }}
                            style={styles.image}
                        />
                    )}
                </View>
                <View style={styles.viewText}>
                    <View>
                        <Text style={styles.textTitle}>{item.titulo_post}</Text>
                    </View> 
                    <View>
                        <Text style={styles.textMessage}>{item.mensagem_post}</Text>           
                    </View>                    
                </View>        
            </View>
        )
    }

    return(
        <SafeAreaView style={styles.conteiner}>
                <FlatList 
                    data={posts}
                    keyExtractor={(item) => item.id}
                    renderItem={renderItem}
                />
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    conteiner: {
        flex: 1,
        backgroundColor: '#1C1C1C',
    },

    conteinerPost: {
        paddingVertical: 5,
        paddingHorizontal: 10,
        marginVertical: 10,
        borderWidth: 0.5,
        borderBottomColor: '#fff',
        borderTopWidth: 0
    },

    textTitle: {
        fontSize: 22,
        color: '#fff'
    },

    textMessage: {
        fontSize: 15,
        color: '#fff'
    },

    viewData: {
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 5
    },

    textData: {
        color: '#fff'
    },

    image: {
        width: 300,
        height: 300,
        resizeMode: 'cover', 
        borderRadius: 15,
        borderWidth: 2,
        borderColor: '#D8BFD8'
    },

    viewText: {
        marginVertical: 5
    },

    viewImage: {
        alignItems: 'center',
        justifyContent: 'center',
    }
})
