import React, { useContext } from "react";
import getAllPosts from "../../firebase/api/admin/getAllPosts";
import { formatDate } from "../../utils/formatDate";
import firestore from '@react-native-firebase/firestore';
import { SafeAreaView, Text, Image, TouchableOpacity, View, FlatList, StyleSheet, Alert } from "react-native";
import ParamContext from "../../context/projetoContext";

export default function TimeLineScreen({ navigation }){
    const { params } = useContext(ParamContext);
    const projetos = params.projeto;
    const posts = getAllPosts();

    function renderItem({ item }){

        async function deleteItem(){
            try{
                const postRef = firestore()
                            .collection('projetos')
                            .doc(projetos.id)
                            .collection('projeto_posts')
                            .doc(item.id);

                await postRef.delete()
                Alert.alert('Concluído', 'Projeto excluído com sucesso')
            } catch(error){
                Alert.alert('Erro', 'Não foi possível deletar o projeto no momento')
                console.error(error);
            }
        }

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

                    <View  style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <TouchableOpacity
                            style={{ flexDirection: 'row' }}
                            onPress={()=> navigation.navigate('CommentsAdmin', { post: item })}
                        >
                            <Image style={styles.comment} source={require('../../assets/images/comentario.png')}/>
                            <Text style={styles.textComment}>Comentários</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={deleteItem}
                        >
                            <Image style={styles.delete} source={require('../../assets/images/deleteIcon.png')}/>
                        </TouchableOpacity>
                    </View>
                </View>        
            </View>
        )
    }

    return(
        <SafeAreaView style={styles.conteiner}>
        {
        posts ? 
            <FlatList
                data={posts}
                keyExtractor={(item) => item.id}
                renderItem={renderItem}
            />
        : 
            <Text style={{ color: '#fff' }}>Sem Posts ainda</Text>
        }
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
        borderBottomColor: '#000',
        borderTopWidth: 0
    },

    textTitle: {
        fontSize: 22,
        color: '#fff'
    },

    textMessage: {
        fontSize: 15,
        color: '#fff',
        marginTop: 5,
        paddingLeft: 5
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
    },

    comment: {
        width: 20,
        height: 20,
        marginLeft: 5,
        marginVertical: 5
    },

    delete: {
        width: 30,
        height: 30,
        marginHorizontal: 5
    },

    textComment: {
        marginLeft: 5,
        marginVertical: 5,
        color: '#fff'
    }
})
