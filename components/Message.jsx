import React from 'react';
import { View, Text } from 'react-native';

const Message = ({ message, isUser }) => {
    return (
        <View style={{ alignItems: isUser ? 'flex-end' : 'flex-start' }}>
            <View
                style={{
                    backgroundColor: isUser ? '#4caf50' : '#e0e0e0',
                    borderRadius: 5,
                    padding: 10,
                    margin: 5,
                    maxWidth: '80%',
                }}
            >
                <Text style={{ color: isUser ? '#fff' : '#000' }}>{message}</Text>
            </View>
        </View>
    );
};

export default Message;