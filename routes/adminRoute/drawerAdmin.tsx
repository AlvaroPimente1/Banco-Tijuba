import { createDrawerNavigator } from '@react-navigation/drawer';
import AddProjectScreen from '../../pages/userAdmin/AddProject';

const Drawer = createDrawerNavigator();

export default function DrawerAdmin() {
    return (
        <Drawer.Navigator initialRouteName="NewProject"
            screenOptions={{
                headerStyle: { backgroundColor: '#663399' },
                headerTintColor: '#fff',
                headerTitleStyle: { fontWeight: 'bold'},
            }}
        >
            <Drawer.Screen name="NewProject" component={AddProjectScreen} />
        {/* Adicione outras screens se necessário */}
        </Drawer.Navigator>
    );
}