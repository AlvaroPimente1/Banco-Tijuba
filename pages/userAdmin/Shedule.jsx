import React, { useState, useEffect } from 'react';
import { SafeAreaView, View, Text, StyleSheet, Modal, TextInput, Button } from 'react-native';
import { Calendar } from 'react-native-calendars';
import firestore from '@react-native-firebase/firestore';
import ModalAgenda from '../../components/ModalAgenda';


export default function AgendaScreen() {
    const [selectedDate, setSelectedDate] = useState(null);
    const [events, setEvents] = useState([]);
    const [isModalVisible, setModalVisible] = useState(false);

    useEffect(() => {
        if (selectedDate) {
            const unsubscribe = firestore()
                .collection('agenda')
                .doc(selectedDate)
                .collection('compromisso')
                .onSnapshot(querySnapshot => {
                    const eventsForDate = [];
                    querySnapshot.forEach(documentSnapshot => {
                        eventsForDate.push(documentSnapshot.data());
                    });
                    setEvents(eventsForDate);
                });

            return () => unsubscribe();
        }
    }, [selectedDate]);

    const addEvent = (eventText) => {
        if (selectedDate && eventText) {
            firestore()
                .collection('agenda')
                .doc(selectedDate)
                .collection('compromisso')
                .add({ text: eventText });
        }
    };

    return (
        <SafeAreaView style={styles.conteiner}>
            <Calendar
                onDayPress={(day) => {
                    setSelectedDate(day.dateString);
                    setModalVisible(true);
                }}
                
                markedDates={{
                    [selectedDate]: {
                        selected: true,
                        selectedColor: '#663399',
                    },
                }}
            />

            {/* Sua lista de compromissos customizada */}
            <View style={styles.areaCompromissos}>
                <Text style={{ color: 'white' }}>Compromissos para {selectedDate}</Text>
                {events.map((event, index) => (
                    <Text key={index} style={{ color: 'white', marginTop: 5 }}>{event.text}</Text>
                ))}
            </View>
            <ModalAgenda isModalVisible={isModalVisible} setModalVisible={setModalVisible} addEvent={addEvent} />
        </SafeAreaView>
    );
}


const styles = StyleSheet.create({
    conteiner: {
        flex: 1,
    },

    areaCompromissos: {
        flex: 1, 
        backgroundColor: '#1C1C1C'
    },
})