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
        paddingVertical: 15,
        marginHorizontal: 5,
        marginVertical: 10,
        borderRadius: 5,
        justifyContent: 'space-between',
        alignItems: 'center',
        minWidth: 300
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
    },

    textInput: {
        borderBottomWidth: 1,
        borderColor: '#663399',
        maxWidth: 500,
        minWidth: 200,
        color: '#fff'
    },

    buttonEdit: {
        backgroundColor: '#663399',
        padding: 8,
        borderRadius: 20,
        marginVertical: 5
    },

    textButtonEdit: {
        fontWeight: 'bold',
        fontSize: 16,
        color: '#fff'
    }
})

export default styles;