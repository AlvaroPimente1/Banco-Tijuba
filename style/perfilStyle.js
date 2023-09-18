import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    conteiner: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#1C1C1C',
        justifyContent: 'flex-start'
    },

    texto: {
        fontSize: 18,
        marginBottom: 15,
        color: '#F5F5F5',
        fontWeight: 'bold',
    },

    usuarioConteiner: {
        paddingHorizontal: 8,
        backgroundColor: '#333333',
        paddingVertical: 8,
        marginHorizontal: 5,
        marginVertical: 10,
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center'
    },

    botaoFoto: {
        flexDirection: 'row',
        backgroundColor: '#663399',
        paddingHorizontal: 15,
        paddingVertical: 2,
        borderBottomEndRadius: 10,
        borderBottomLeftRadius: 10
    },

    logoCamera: {
        width: 35,
        height: 35,
        marginHorizontal: 4
    }
})

export default styles;