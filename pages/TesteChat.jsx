import React from 'react';
import { View, Button, Alert } from 'react-native';
import { KommunicateChat } from 'react-native-kommunicate-chat';

const ChatScreen = () => {
        const appId = '367d66f4cbe8523671d332fd9b5728ee0'; // Substitua pelo seu APP ID do Kommunicate
    
        // Função para abrir a tela de chat
        const openChat = () => {
        KommunicateChat.openConversation()
            .then(() => console.log('Tela de chat aberta'))
            .catch((error) => Alert.alert('Erro ao abrir a tela de chat:', error));
        };
    
        return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Button title="Abrir Chat" onPress={openChat} />
            <KommunicateChat appId={appId} />
        </View>
        );
};

export default ChatScreen;