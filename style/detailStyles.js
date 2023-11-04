import { StyleSheet } from 'react-native';

const styles =  StyleSheet.create({
    conteiner: {
        flex: 1,
        alignSelf: 'center',
        backgroundColor: '#1C1C1C',
    },

    descricao: {
        color: '#F5F5F5',
        paddingVertical: 4,
        paddingHorizontal: 10
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
        flexDirection: 'column',
        alignItems: 'center',
        paddingVertical: 20,
        backgroundColor: "#663399",
        paddingHorizontal: 100,
        borderBottomRightRadius: 30,
        borderBottomLeftRadius: 30,
        borderBottomWidth: 1,
        borderColor: '#333333'
    }, 

    editIcon: {
        width: 25,
        height: 25
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
        justifyContent: 'center',
        marginVertical: 10,
        flexDirection: 'row'
    },

    participantesText: {
        fontSize: 18,
        marginHorizontal: 8,
        color: '#fff'
    },

    botaoLista: {
        flexDirection: 'row',
    
    },

    iconLista: {
        marginVertical: 1,
        marginRight: 9
    }

});

export default styles;