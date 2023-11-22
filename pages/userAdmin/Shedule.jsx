import React, { useState, useEffect } from 'react';
import { SafeAreaView, View, Text, StyleSheet, FlatList, TouchableOpacity, Image, Alert } from 'react-native';
import { Calendar } from 'react-native-calendars';
import firestore from '@react-native-firebase/firestore';
import ModalAgenda from '../../components/ModalAgenda';
import getUserINFOAdmin from "../../firebase/api/admin/getUserInfoAdmin";
import { NavigationContainer } from '@react-navigation/native';


export default function AgendaScreen({ navigation }) {
    const [selectedDate, setSelectedDate] = useState(null);
    const [ events, setEvents ] = useState([]);
    const [ isModalVisible, setModalVisible ] = useState(false);
    const [ usuario, setUsuario ] = useState('');
    const [ showCalendar, setShowCalendar ] = useState(true);

    function handleShowCalendar(){
        if(showCalendar){
            setShowCalendar(false)
        }else{
            setShowCalendar(true)
        }
    }

    useEffect(() => {
        const fetchUsuario = async () => {
            const userInfoSnapshot = await getUserINFOAdmin();
            if (userInfoSnapshot.exists) {
                setUsuario(userInfoSnapshot.data());
            }
        };
        fetchUsuario();
    }, []);

    useEffect(() => {
        if (selectedDate) {
            const unsubscribe = firestore()
                .collection('agenda')
                .doc(selectedDate)
                .collection('compromisso')
                .onSnapshot(querySnapshot => {
                    const eventsForDate = [];
                    querySnapshot.forEach(documentSnapshot => {
                        eventsForDate.push({
                            id: documentSnapshot.id,  
                            ...documentSnapshot.data()
                        });
                    });
                    setEvents(eventsForDate);
                    
                });

            return () => unsubscribe();
        }
    }, [selectedDate]);

    const addEvent = (titulo, descricao) => {
        if (selectedDate && titulo && descricao) {
            firestore()
                .collection('agenda')
                .doc(selectedDate)
                .collection('compromisso')
                .add({ 
                    titulo_compromisso: titulo,
                    descricao_compromisso: descricao,
                    data_compromisso: selectedDate,
                    criado_por: usuario.nome
                });
        }
    };

    const deleteEvent = (eventId) => {
        if (selectedDate && eventId) {
            firestore()
                .collection('agenda')
                .doc(selectedDate)
                .collection('compromisso') 
                .doc(eventId)
                .delete()
                .then(() => {
                    Alert.alert("Compromisso deletado!");
                })
                .catch((error) => {
                    Alert.alert("Erro ao deletar compromisso: ", error);
                });
        }
    };

    function renderItem({ item }){
        return(
            <TouchableOpacity style={styles.conteinerLista}
                onPress={() => navigation.navigate('RelatorioCompromisso', { compromisso : item })}
            >
                <Text style={styles.textTitulo}>{item.titulo_compromisso}</Text>
                <Text style={styles.textDescricao}>{item.descricao_compromisso}</Text>
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end' }}>
                    <Text style={styles.textInfo}>Criado por {item.criado_por} em {selectedDate}</Text>
                    <TouchableOpacity
                        onPress={()=> deleteEvent(item.id)}
                    >
                        <Image style={styles.icon} source={require('../../assets/images/deleteIcon.png')}/>
                    </TouchableOpacity>   
                </View>
            </TouchableOpacity>
        )
    }

    return (
        <SafeAreaView style={styles.conteiner}>
            {
                showCalendar ?
                <Calendar
                    style={styles.agenda}
                    onDayPress={(day) => {
                        setSelectedDate(day.dateString);
                    }}
                    
                    markedDates={{
                        [selectedDate]: {
                            selected: true,
                            selectedColor: '#663399',
                        },
                    }}
                />
                :
                <View></View>
            }

            <View style={styles.areaCompromissos}>
                <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 10 }}>
                    <Text style={{ color: 'white' }}>Compromissos para {selectedDate}</Text>
                    <TouchableOpacity
                        onPress={()=> setModalVisible(true)}
                    >
                        <Image style={styles.icon} source={require('../../assets/images/adicionarIcon.png')}/>        
                    </TouchableOpacity>
                    
                    <TouchableOpacity
                        onPress={handleShowCalendar}
                    >
                        {
                            showCalendar ?
                            <Image style={styles.icon} source={require('../../assets/images/hideCalendar.png')}/>
                            :
                            <Image style={styles.icon} source={require('../../assets/images/showCalendar.png')}/>
                        }
                    </TouchableOpacity>
                </View>
                <FlatList
                    data={events}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={renderItem}
                />
            </View>
            <ModalAgenda isModalVisible={isModalVisible} setModalVisible={setModalVisible} addEvent={addEvent} />
        </SafeAreaView>
    );
}


const styles = StyleSheet.create({
    conteiner: {
        flex: 1,
        backgroundColor: '#1C1C1C'
    },

    areaCompromissos: {
        flex: 1
    },  

    icon: {
        width: 30,
        height: 30,
        marginHorizontal: 10
    },

    conteinerLista: {
        backgroundColor: '#333333',
        paddingVertical: 10,
        paddingHorizontal: 5,
        marginBottom: 15,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#663399',
        marginHorizontal: 30
    },

    textTitulo: {
        fontSize: 18,
        color: '#fff',
        marginLeft: 2
    },

    textDescricao: {
        fontSize: 15,
        color: '#fff',
        marginLeft: 10
    },

    textInfo: {
        color: '#fff'
    }
})