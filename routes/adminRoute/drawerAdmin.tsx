import { createDrawerNavigator } from '@react-navigation/drawer';

import AddProjectScreen from '../../pages/userAdmin/AddProject';
import AgendaScreen from '../../pages/userAdmin/Shedule';
import PerfilAdminScreen from '../../pages/userAdmin/PerfilAdmin';
import CreaterUserAdmin from '../../pages/userAdmin/CreateUserAdmin';
import OverViewScreen from '../../pages/userAdmin/OverView';

const Drawer = createDrawerNavigator();

export default function DrawerAdmin() {
    return (
        <Drawer.Navigator initialRouteName="Perfil"
            screenOptions={{
                headerStyle: { backgroundColor: '#663399' },
                headerTintColor: '#fff',
                headerTitleStyle: { fontWeight: 'bold'},
                drawerStyle:{ backgroundColor: '#1C1C1C' },
                drawerActiveTintColor: '#8a63d2',
                drawerInactiveTintColor: '#663399'
            }}

        >
            <Drawer.Screen name="Meu Perfil" component={PerfilAdminScreen}/>
            <Drawer.Screen name="Sobre" component={OverViewScreen}/>
            <Drawer.Screen name="Novo projeto" component={AddProjectScreen} />
            <Drawer.Screen name="Agenda Mmib" component={AgendaScreen} />
            <Drawer.Screen name="Criar Usuario " component={CreaterUserAdmin} />
        </Drawer.Navigator>
    );
}