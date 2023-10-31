import { StyleSheet } from 'react-native';

const styles =  StyleSheet.create({
    conteiner: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#1C1C1C',
    },

    inputText: {
        borderWidth: 2,
        paddingHorizontal: 30,
        paddingVertical: 8,
        borderColor: '#663399',
        marginVertical: 10,
        borderRadius: 15,
        backgroundColor: '#444444',
        color: '#F5F5F5',
        borderRightWidth: 0,
        borderLeftWidth: 0,
        borderTopWidth: 0,
        borderBottomWidth: 0
    },

    textoLista: {
        color: '#F5F5F5',
        marginLeft: 5
    },

    textoMenorLista: {
        color: '#F5F5F5',
        marginLeft: 5,
        marginTop: 3,
        fontSize: 10
    },  

    conteinerLista: {
        backgroundColor: '#333333',
        paddingVertical: 8,
        paddingHorizontal: 5,
        marginBottom: 15,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#663399',
        marginHorizontal: 30
    },

    fotoDemo: {
        width: 40,
        height: 40,
        borderRadius: 5,
        marginLeft: 2
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

});

export default styles;