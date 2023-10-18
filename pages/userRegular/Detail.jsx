import React, { useContext, useState, useEffect } from "react";
import styles from "../../style/detailStyles";
import ParamContext from "../../context/projetoContext";
import { View, SafeAreaView, Text, TouchableOpacity, ScrollView, Image } from "react-native";
import { formatDate } from "../../utils/formatDate";
import ListApoiadores from "../../components/ListaParticipantes";

export default function Detail(){
    const { params } = useContext(ParamContext);
    const projetos = params.projeto;

    const [ showList, setShowList ] = useState(false);

    function mostrarListaUsuarios(){
        if(!showList){
            setShowList(true)
        }else{
            setShowList(false)
        }
    }

    return(
<SafeAreaView style={styles.conteiner}>
                <View style={styles.imagemConteiner}>
                    <Image style={styles.image} source={require('../../assets/images/imagemTeste.png')}/>
                </View>
                        <Text style={styles.name}>{projetos.nome_projeto}</Text>
                    <View style={styles.descriptionConteiner}>
                        <Text style={styles.description}>{projetos.descricao}</Text>
                        <Text style={styles.description}>Categoria: {projetos.categoria}</Text>
                        <Text style={styles.description}>Cadastrado por {projetos.cadastradorPor}</Text>
                    </View>


            <TouchableOpacity style={styles.botaoLista}
                onPress={mostrarListaUsuarios}
            >
                <Text style={styles.participantesText}>Participantes</Text>
                
                {
                    showList
                    ? <Image style={styles.iconLista} source={require('../../assets/images/setaBaixo.png')}/>
                    : <Image style={styles.iconLista} source={require('../../assets/images/setaDireita.png')}/>
                }

            </TouchableOpacity>

            {showList
                ? <ListApoiadores/>
                : null
            }
        </SafeAreaView>
    )
}