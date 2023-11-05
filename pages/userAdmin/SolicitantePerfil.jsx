import React, { useContext } from "react";
import { SafeAreaView, Text } from "react-native";
import ParamContext from "../../context/projetoContext";

export default function SolicitacaoDetalheScreen({ route }){
    const { params } = useContext(ParamContext);
    const projetos = params.projeto;

    const perfil = route.params.perfil;

    return(
        <SafeAreaView>
            <Text>{perfil.nome}</Text>
            <Text>{projetos.nome_projeto}</Text>
        </SafeAreaView>
    )
}