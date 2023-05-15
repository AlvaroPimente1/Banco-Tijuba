import React, { useState, useEffect } from 'react';
import { FlatList, View, TextInput, Button, TouchableOpacity, Text, Image, StyleSheet } from 'react-native';
import Message from '../components/Message';
import { Alert } from 'react-native';

export default function ChatBot() {
    const [messages, setMessages] = useState([]);
    const [text, setText] = useState('');
    const [step, setStep] = useState(0);
    const [isConversationOver, setIsConversationOver] = useState(false);
    const [projetosAtivados, setProjetosAtivados] = useState([])

    useEffect(() => {
        setMessages([{ text: 'Olá sou o BanChat! Estou aqui para lhe auxiliar a encontrar projetos que você possa se interessar. Primeiramente qual tipo de causa você quer apoiar?\n(Responda com o número correspondente)\n\n1- Animal\n2- Ambiental\n3- Educação\n4- Humana', isUser: false }]);
    }, []);

    const handleReset = () => {
        setMessages([{ text: 'Olá sou o BanChat! Estou aqui para lhe auxiliar a encontrar projetos que você possa se interessar. Primeiramente qual tipo de causa você quer apoiar?\n(Responda com o número correspondente)\n\n1- Animal\n2- Ambiental\n3- Educação\n4- Humana', isUser: false }]);
        setText('');
        setStep(0);
        setIsConversationOver(false);
        setProjetosAtivados([]);
    };

    const handleSend = () => {
            setMessages([...messages, { text, isUser: true }]);
            setText('');
            // Lógica condicional para adicionar a mensagem do chatbot
            if (step === 0 && text === '1') {
                const chatbotMessage = { text: 'Você escolheu a causa animal. Você tem preferência a algum grupo de animais?\n\n1- Cachorro\n2- Gato\n3- Não tenho preferência', isUser: false };
                setMessages([...messages, chatbotMessage]);
                setStep(1);
            //Escolheu causa animal
            } else if (step === 1 && text === '1') {
                const chatbotMessage = { text: 'Você escolheu a causa animal com foco em cachorros. Irei lhe enviar o projeto que condiz com sua vontade.', isUser: false };
                setMessages([...messages, chatbotMessage]);
                setStep(2);

            } else if (step === 1 && text === '2') {
                const chatbotMessage = { text: 'Você escolheu a causa animal com foco em gatos. Vá na barra de pesquisa de "Novo Projeto" e pesquise pelo projeto "Gatos são amigos".', isUser: false };
                setMessages([...messages, chatbotMessage]);
                setStep(2);
            
            // Sem preferência gato ou cachorro
            } else if (step === 2) {
                const chatbotMessage = { text: 'Ótimo, obrigado por compartilhar suas preferências. Vou buscar projetos que se encaixam no seu perfil.', isUser: false };
                setMessages([...messages, chatbotMessage]);
                setStep(3);
            }
            //Escolheu causa ambiental
            else if(step == 0 && text === '2'){
                const chatbotMessage = { text: 'Você escolheu a causa Ambiental. Você tem preferência a alguma área ambiental?\n\n1- Praia\n2- Horta\n3- Não tenho preferência', isUser: false };
                setMessages([...messages, chatbotMessage]);
                setStep(1);
            }
            else if(step == 1 && text ==='2'){
                const chatbotMessage = { text: 'Você escolheu a causa Ambiental na praia de Cotijuba. Vá na barra de pesquisa de "Novo Projeto" e pesquise pelo projeto "Recicle Já! (praia)".', isUser: false };
                setMessages([...messages, chatbotMessage]);
                setStep(2);
            }
            else if(step == 1 && text === '2'){
                const chatbotMessage = { text: 'Você escolheu a causa Ambiental nas Hortas de Cotijuba. Irei lhe enviar o projeto que condiz com sua vontade.', isUser: false };
                setMessages([...messages, chatbotMessage]);
                setStep(2);

            } else {
                // Mensagem de erro
                const chatbotMessage = { text: 'Desculpe, não entendi. Por favor, tente novamente.', isUser: false }
                setMessages([...messages, chatbotMessage]);
            }
        };

    return (
        <View style={styles.conteiner}>
            <FlatList
                data={messages}
                renderItem={({ item }) => <Message message={item.text} isUser={item.isUser} />}
                keyExtractor={(item, index) => index.toString()}
                style={{ flex: 1 }}
            />
            <View style={styles.barraInteracao}>
                <TextInput
                    value={text}
                    onChangeText={setText}
                    placeholder="Digite sua mensagem..."
                    placeholderTextColor={'#fff'}
                    style={styles.textInput}
                />
                <TouchableOpacity style={{backgroundColor: '#663399'}} onPress={handleSend}>
                    <Text
                        style={styles.sendButton}
                    >
                        Enviar</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.resetButton}
                    onPress={handleReset}
                >
                    <Image source={require('../assets/images/replayBot.png')} style={{width: 35, height: 35}}/>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    conteiner: {
        flex: 1, 
        backgroundColor: '#333333' 
    },

    barraInteracao: {
        flexDirection: 'row',
        alignItems: 'center' 
    },

    textInput: {
        flex: 1,
        backgroundColor: '#333333', 
        color: '#fff', 
        borderWidth: 2, 
        borderColor: '#663399', 
        paddingLeft: 10 
    },

    sendButton: {
        fontSize: 20, 
        color: '#fff', 
        paddingVertical: 11, 
        borderWidth: 2, 
        paddingHorizontal: 10, 
        borderRadius: 4, 
        borderColor: '#663399'
    }, 

    resetButton: {
        backgroundColor: '#663399', 
        paddingVertical: 9, 
        paddingHorizontal: 10, 
        borderColor: '#663399'
    }
})