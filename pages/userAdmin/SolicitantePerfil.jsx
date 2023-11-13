import React, { useContext } from "react";
import { SafeAreaView, Text, TouchableOpacity, Alert } from "react-native";
import ParamContext from "../../context/projetoContext";
import firestore from '@react-native-firebase/firestore';


export default function SolicitacaoDetalheScreen({ route }){
    const { params } = useContext(ParamContext);
    const projetos = params.projeto;
    const perfil = route.params.perfil;

    async function aceitarUsuario(){
        const projetoRef = firestore().collection('projetos').doc(projetos.id);
        const userSolicitacaoRef = firestore().collection('usuarios').doc(perfil.id).collection('solicitacao_usuario').doc(projetos.id);
        const userProjetosRef = firestore().collection('usuarios').doc(perfil.id).collection('projetos_usuario');

        try{
            await projetoRef.update({
                solicitacoesProjeto: firestore.FieldValue.arrayRemove(perfil.id),
                participantesProjeto: firestore.FieldValue.arrayUnion(perfil.id)
            });

            userSolicitacaoRef.delete();

            userProjetosRef.set({
                projetoRef: projetoRef,
                nome_projeto: projetos.nome_projeto,
                dt_entrada: firestore.FieldValue.serverTimestamp(),
            })

            Alert.alert('Concluído', 'Solicitação aceita!');

        }
        catch(error){
            Alert.alert('Erro', 'Não foi possível efetuar a operação no momento');
            console.error(error);
        }
    }    

    return(
        <SafeAreaView>
            <Text>{perfil.id}</Text>
            <Text>{projetos.id}</Text>

            <TouchableOpacity onPress={aceitarUsuario}>
                <Text>Aceitar</Text>
            </TouchableOpacity>
        </SafeAreaView>
    )
}