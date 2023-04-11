import React from "react";
import { View ,SafeAreaView, Text, TouchableOpacity, StyleSheet , StatusBar, Image} from "react-native";

export default function Home({ navigation }){

return(
    <SafeAreaView style={styles.container}>
        <StatusBar
            barStyle="light-content"
            backgroundColor="transparent"
            translucent
        />
        
        <Image
            style={styles.logo}
            source={require('../assets/images/BanCotijuba_3.png')}
        />

            <View style={{marginTop: 40}}>
                <TouchableOpacity 
                    style={styles.botao}
                    onPress={()=> navigation.navigate('List')}
                >
                    <Text style={styles.textoBotao}>Lista de projetos</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                    style={styles.botao}
                    onPress={()=> navigation.navigate('New')}
                >
                    <Text style={styles.textoBotao}>Novo projeto</Text>
                </TouchableOpacity>
            </View>
    </SafeAreaView>
);
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#1C1C1C',
        alignItems: 'center',
    },
    bordaTexto:{
        borderWidth: 3,
        borderColor: '#000',
        borderTopRightRadius: 30,
        borderBottomLeftRadius: 30,
        borderBottomRightRadius: 10,
        borderTopLeftRadius: 10,

},
    texto: {
        fontSize: 32,
        fontWeight: 'bold',
        textAlign: 'center',
        marginVertical: 32,
        paddingHorizontal: 20,
        color: '#000',
},
    botao: {
        backgroundColor: '#663399',
        paddingVertical: 16,
        paddingHorizontal: 32,
        borderRadius: 12,
        marginVertical: 16,
},
    textoBotao: {
        color: '#D8BFD8',
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
},
    conteudo: {
        paddingVertical: 150
},
    logo: {
        marginTop: 100,
        width: 200,
        height: 200,
    }
});
