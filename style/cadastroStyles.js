import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#1C1C1C',
        alignItems: 'center',
        justifyContent: 'center',
        paddingBottom: 100
    },

    texto: {
            color: '#fff',
    },

    conteudo: {
        paddingVertical: 150
    },

    logo: {
        width: 200,
        height: 200,
        marginBottom: 30
    },

    input: {
        borderWidth: 2,
        borderColor: '#663399',
        paddingHorizontal: 12,
        paddingVertical: 1,
        color: "#fff",
        borderRadius: 10,
        marginBottom: 20
    },

    botao: {
        backgroundColor: '#663399',
        paddingVertical: 8,
        borderRadius: 20,
    },

    textoBotao: {
        color: '#D8BFD8',
        fontSize: 14,
        fontWeight: 'bold',
        textAlign: 'center',
    },

    textoMenor: {
        fontSize: 9,
        color: '#D8BFD8',
        alignSelf: 'center',
        marginTop: 10
    }
})

export default styles;