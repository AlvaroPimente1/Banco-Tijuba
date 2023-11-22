import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import TabAdmin from "./tabAdmin";
import TopAdmin from "./topAdmin";
import SolicitacoesScreen from "../../pages/userAdmin/Solicitacoes";
import EditProjectScreen from "../../pages/userAdmin/EditProject";
import SolicitacaoDetalheScreen from "../../pages/userAdmin/SolicitantePerfil";
import DoacaoAdminScreen from "../../pages/userAdmin/Doacao";
import PerfilAdminScreen from "../../pages/userAdmin/PerfilAdmin";
import AddProjectScreen from "../../pages/userAdmin/AddProject";
import AgendaScreen from "../../pages/userAdmin/Shedule";
import CreaterUserAdmin from "../../pages/userAdmin/CreateUserAdmin";
import CommentsUserAdmin from "../../pages/userAdmin/CommentAdmin";
import RelatorioCompromissoScreen from "../../pages/userAdmin/RelatorioCompromisso";


const Stack = createNativeStackNavigator();

export default function AdminRoute(){
    return(
        <Stack.Navigator
            screenOptions={{
                headerStyle: { backgroundColor: '#663399' },
                headerTintColor: '#fff',
                headerTitleStyle: { fontWeight: 'bold'},
                }}        
        >
            <Stack.Screen name="Tab" component={TabAdmin} options={{headerShown: false}}/>
            <Stack.Screen name="TopAdmin" component={TopAdmin} options={{ presentation: 'modal' , headerTitle: ''}} />
            <Stack.Screen name="Solicitacoes" component={SolicitacoesScreen}/>
            <Stack.Screen name="Editar" component={EditProjectScreen}/>
            <Stack.Screen name="DetalheSolicitacao" component={SolicitacaoDetalheScreen}/>
            <Stack.Screen name="DoacaoAdmin" component={DoacaoAdminScreen} options={{ title: 'Doações Solicitadas' }}/>
            <Stack.Screen name="Meu Perfil" component={PerfilAdminScreen}/>
            <Stack.Screen name="Novo projeto" component={AddProjectScreen} />
            <Stack.Screen name="Agenda Mmib" component={AgendaScreen} />
            <Stack.Screen name="Criar Usuario" component={CreaterUserAdmin} />
            <Stack.Screen name="CommentsAdmin" component={CommentsUserAdmin} options={{ title: 'Comentários' }} />
            <Stack.Screen name="RelatorioCompromisso" component={RelatorioCompromissoScreen} options={{ title: 'Relatorio' }} />
        </Stack.Navigator>
    )
}