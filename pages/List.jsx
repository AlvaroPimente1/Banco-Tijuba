import React from "react";
import { SafeAreaView, View, Text, TextInput, StyleSheet, FlatList, TouchableOpacity, Image } from 'react-native';
import { useState } from "react";
import { useEffect } from "react";
import '@react-native-firebase/database'
import { novaQuery } from "./ChatBot";

export default function ListProject({ navigation }){
    const [text, setText] = useState('')
    const [list, setList] = useState('')
    const [items, setItems] = useState('')
    const [projetosAtivados, setProjetosAtivados] = useState([])

    useEffect(() => {
        const projetosRef = database.ref('TodosProjetos');
        projetosRef.once('value', (snapshot) => {
        const projetos = snapshot.val();
        const projetosFiltrados = Object.values(projetos).filter((projeto) => projeto.ativado);
        setProjetosAtivados(projetosFiltrados);
    });
    }, []); 
/* 
    function enviarDadosParaBancoDeDados(dados) {
        // referencie a coleção que você deseja enviar os dados
        const projetosRef = database.ref('TodosProjetos');
        TodosProjetos[
        {
            key: 1, 
            nome: 'Recicla Já!',
            causa: 'ambiental',
            doacao: null,
            intuito: 'O projeto pode incluir ações de conscientização e educação ambiental para a população, bem como o estabelecimento de parcerias com empresas, cooperativas e organizações para a coleta seletiva e a destinação correta dos materiais recicláveis. O objetivo final é promover a sustentabilidade e preservar os recursos naturais, gerando benefícios econômicos, sociais e ambientais para a comunidade em que o projeto é implementado.',
        },
    
        {
            key: 2,
            nome: 'Leitura salva vidas!',
            causa: 'educação',
            doacao: null,
            intuito: 'A biblioteca comunitária pode ser gerida por voluntários, com o apoio de doações e recursos locais, tornando-se um centro de aprendizado e integração social para a comunidade em que é implementado. O objetivo final é fomentar a educação, a cultura e a cidadania, contribuindo para o desenvolvimento social e humano da comunidade.'
        },
    
        {
            key: 3,
            nome: 'Alimento para todos',
            causa: 'humana',
            doacao: null,
            intuito: ' Os alimentos arrecadados podem ser distribuídos para instituições beneficentes, como abrigos, asilos, orfanatos e comunidades carentes, ajudando a suprir as necessidades básicas de alimentação dessas pessoas. O projeto pode incluir campanhas de conscientização sobre a importância da redução do desperdício de alimentos e a valorização da alimentação saudável e sustentável. O objetivo final é promover a solidariedade e o cuidado com o meio ambiente, contribuindo para a melhoria da qualidade de vida das pessoas que mais precisam.'
        },
    
        {
            key: 4,
            nome: 'Animais são amigos',
            causa: 'animal',
            doacao: null,
            intuito: 'O projeto tem como objetivo promover a proteção, cuidado e adoção de animais que foram abandonados, resgatados ou estão em situação de vulnerabilidade. O objetivo final é proporcionar melhores condições de vida para os animais e estimular a solidariedade e o respeito aos seres vivos, criando uma cultura de proteção e cuidado com os animais.'
        }
    ];
        // envie os dados para o Realtime Database
        projetosRef.set(dados)
            .then(() => console.log('Dados enviados com sucesso!'))
            .catch((erro) => console.error('Erro ao enviar dados:', erro));
    }
 */

    function FiltroBusca(text) {
        const filterList = items.filter((item) => {  
            const itemFilter = item.nome ? item.nome.toUpperCase() : ''.toUpperCase();
            const newText = text.toUpperCase();
            return itemFilter.indexOf(newText) > -1;
        });
            setList(filterList)
            setText(text)
        }   

        useEffect(()=>{
            setList(projetosAtivados)
            setItems(projetosAtivados)    
        },[])  
    

    function renderItem({ item }){
        return(
            <View>
                <TouchableOpacity style={styles.conteinerLista}
                    onPress={()=> navigation.navigate('Details', { projetos: item })}
                >
                    <View style={{flexDirection: 'row'}}>
                        <Image style={styles.fotoDemo} source={require('../assets/images/imagemTeste.png')}/>
                        <Text style={styles.textoLista}>{item.nome}</Text>
                    </View>
                    <Text style={styles.descricao}>{item.intuito}</Text>
                </TouchableOpacity>
            </View>
        )
    }

    return(
        <SafeAreaView style={styles.conteiner}>
        <TextInput
            style={styles.inputText}
            placeholder={'Pesquise o projeto que quiser'}
            placeholderTextColor={'#F5F5F5'}
            onChangeText={(t)=>FiltroBusca(t)} 
            value={text}
        />
        <FlatList
            data={projetosAtivados}
            renderItem={renderItem}
            keyExtractor={(item) => item.key.toString()}
        />
        </SafeAreaView>
    );
}


const styles = StyleSheet.create({
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
        alignSelf: 'center',
        marginLeft: 5
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
    }
})