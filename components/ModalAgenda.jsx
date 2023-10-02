import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Modal, TextInput, Button } from 'react-native';

export default function ModalAgenda({ isModalVisible, setModalVisible, addEvent }){
    const [newEventText, setNewEventText] = useState('');

    return(
        <>
        <Modal
            animationType="slide"
            transparent={true}
            visible={isModalVisible}
            onRequestClose={() => {
                setModalVisible(false);
            }}
        >
            <View style={styles.centeredView}>
                <View style={styles.modalView}>
                    <Text style={{ marginBottom: 10 }}>Novo Compromisso</Text>
                    <TextInput
                        style={styles.input}
                        value={newEventText}
                        onChangeText={setNewEventText}
                        placeholder="Digite o compromisso"
                    />
                    <Button title="Adicionar" onPress={() => {
                        addEvent(newEventText);
                        setNewEventText('');
                        setModalVisible(false);
                    }} />
                    <Button title="Cancelar" onPress={() => {
                        setModalVisible(false);
                    }} />
                </View>
            </View>
        </Modal>
    </>
    )
}

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0,0,0,0.4)", // Isso adicionará um fundo escuro transparente
    },

    modalView: {
        width: '80%',
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },

    input: {
        width: '100%',
        padding: 10,
        borderColor: '#ccc',
        borderWidth: 1,
        marginBottom: 10,
        borderRadius: 5,
    },
})