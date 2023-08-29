import React from 'react';
import { View, Image, StyleSheet } from 'react-native';

export default function ImageContainer({ source }) {
    return (
        <View style={styles.imagemConteiner}>
            <Image style={styles.image} source={source} />
        </View>
    );
}

const styles = StyleSheet.create({
    image: {
        width: 200,
        height: 200,
        marginBottom: 20,
        borderRadius: 5,
        borderWidth: 2,
        borderColor: "#333333"
    },
    
    imagemConteiner: {
        paddingVertical: 20,
        backgroundColor: "#663399",
        paddingHorizontal: 100,
        borderBottomRightRadius: 30,
        borderBottomLeftRadius: 30,
        borderBottomWidth: 1,
        borderColor: '#333333'
    }, 
})