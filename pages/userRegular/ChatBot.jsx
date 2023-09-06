import React, { useState, useEffect } from 'react';
import { FlatList, View, TextInput, Button, TouchableOpacity, Text, Image, StyleSheet } from 'react-native';
import Message from '../../components/Message';
import { Alert, Linking } from 'react-native';

export default function ChatBot() {
    const [messages, setMessages] = useState([]);
    const [text, setText] = useState('');
    const [step, setStep] = useState(0);

    useEffect(() => {
        setMessages([{ text: 'Olá sou o BanChat! Estou aqui para lhe auxiliar a encontrar projetos que você possa se interessar. Primeiramente qual tipo de causa você quer apoiar?\n(Responda com o número correspondente)\n\n1- Animal\n2- Ambiental\n3- Educação\n4- Humana', isUser: false }]);
    }, []);

    const handleReset = () => {
        setMessages([{ text: 'Olá sou o BanChat! Estou aqui para lhe auxiliar a encontrar projetos que você possa se interessar. Primeiramente qual tipo de causa você quer apoiar?\n(Responda com o número correspondente)\n\n1- Animal\n2- Ambiental\n3- Educação\n4- Humana', isUser: false }]);
        setText('');
        setStep(0);
    };

    const handleSend = () => {
            setMessages([...messages, { text, isUser: true }]);
            setText('');
            // Lógica condicional para adicionar a mensagem do chatbot
            if (step === 0 && text === '1') {
                const chatbotMessage = { text: 'Você escolheu a causa animal. Você tem preferência a algum grupo de animais?\n\n1- Cachorro\n2- Gato\n3- Não tenho preferência', isUser: false };
                setMessages([...messages, chatbotMessage]);
                setStep(1);
            } else if (step === 1) {
                if (text === '1') {
                    const chatbotMessage = { text: 'Você escolheu a causa animal com foco em cachorros. Irei lhe enviar o projeto que condiz com sua vontade.', isUser: false };
                    setMessages([...messages, chatbotMessage]);
                    setStep(2);
                } else if (text === '2') {
                    const chatbotMessage = { text: 'Você escolheu a causa animal com foco em gatos. Vá na barra de pesquisa de "Novo Projeto" e pesquise pelo projeto "Gatos são amigos".', isUser: false };
                    setMessages([...messages, chatbotMessage]);
                    setStep(2);
                } else if (text === '3') {
                    const chatbotMessage = { text: 'Como você não tem preferência a nenhum a nenhum grupo de animais recomendo o projeto "Animais são Amigos".', isUser: false };
                    setMessages([...messages, chatbotMessage]);
                    setStep(2);
                }
            } 

            else if(step == 0 && text == '2'){
                const chatbotMessage = { text: 'Você escolheu a causa Ambiental. Você tem preferência a alguma área ambiental?\n\n1- Praia\n2- Horta\n3- Não tenho preferência', isUser: false };
                setMessages([...messages, chatbotMessage]);
                setStep(3);
            } else if(step == 3){
                if(text == '1'){
                    const chatbotMessage = { text: 'Você escolheu a causa Ambiental na praia de Cotijuba. Vá na barra de pesquisa de "Novo Projeto" e pesquise pelo projeto "Recicle Já! (praia)"', isUser: false };
                    setMessages([...messages, chatbotMessage]);
                }
                else if(text == '2'){
                    const chatbotMessage = { text: 'Você escolheu a causa Ambiental nas Hortas de Cotijuba. Irei lhe enviar o projeto que condiz com sua vontade.', isUser: false };
                    setMessages([...messages, chatbotMessage]);
                }
                else if(text == '3'){
                    const chatbotMessage = { text: 'Como você não tem preferência a nenhuma área ambiental, recomendo o projeto "Cidade Verde".', isUser: false };
                    setMessages([...messages, chatbotMessage]);
                }
            }

            else if(step == 0 && text == '3'){
                const chatbotMessage = { text: 'teste', isUser: false };
                setMessages([...messages, chatbotMessage]);
                setStep(4);
            } else if(step == 4){
                if(text == '1'){
                    const chatbotMessage = { text: 'teste2 hehe', isUser: false };
                    setMessages([...messages, chatbotMessage]);
                }
            }

            else{
                const chatbotMessage = { text: 'Desculpe não compreendi. Reinicie a conversa!', isUser: false };
                setMessages([...messages, chatbotMessage]);    
            }
        };

        const openZap = () => {
            const url = `https://t.me/BanCotijubaBot`;
            Linking.openURL(url);
        };

    return (
        <View style={styles.conteiner}>
            <FlatList
                data={messages}
                renderItem={({ item }) => <Message message={item.text} isUser={item.isUser} />}
                keyExtractor={(item, index) => index.toString()}
                style={{ flex: 1 }}
            />
            <TouchableOpacity
                style={styles.zapButton}
                onPress={openZap}
            >
                <Image source={require('../../assets/images/telegram.png')} style={{width: 40, height: 40}}/>
            </TouchableOpacity>
            <View style={styles.barraInteracao}>
                <TextInput
                    value={text}
                    onChangeText={setText}
                    placeholder="Digite sua mensagem..."
                    placeholderTextColor={'#fff'}
                    style={styles.textInput}
                />
                <TouchableOpacity onPress={handleSend}>
                    <Text style={styles.sendButton}>
                        Enviar
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.resetButton}
                    onPress={handleReset}
                >
                    <Image source={require('../../assets/images/replayBot.png')} style={{width: 35, height: 35}}/>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    conteiner: {
        flex: 1, 
        backgroundColor: '#1C1C1C' 
    },

    barraInteracao: {
        flexDirection: 'row',
        alignItems: 'center' ,
        marginBottom: 5
    },

    textInput: {
        flex: 1,
        backgroundColor: '#1C1C1C', 
        color: '#fff', 
        borderWidth: 1, 
        borderColor: '#663399', 
        paddingLeft: 10 ,
        borderRadius: 10,
    },

    sendButton: {
        fontSize: 15, 
        color: '#fff', 
        paddingVertical: 5,  
        paddingHorizontal: 10, 
        borderRadius: 10, 
        borderColor: '#663399'
    }, 

    zapButton: {
        justifyContent: 'flex-end',
        alignItems: 'flex-end',
        marginRight: 5,
        marginBottom: 5
    }

})