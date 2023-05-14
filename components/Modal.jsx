import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useState } from "react";
import { Button, Overlay, CheckBox } from "react-native-elements";
import Icon from 'react-native-vector-icons/FontAwesome';
import { Image } from "react-native-elements";



export default function Modal(){
    const [isVisible, setIsVisible] = useState(true);
    const [checkBox1, setCheckBox1] = useState(false);
    const [checkBox2, setCheckBox2] = useState(false);
    const [checkBox3, setCheckBox3] = useState(false);
    const [checkBox4, setCheckBox4] = useState(false);
    const [checkBox5, setCheckBox5] = useState(false);

    function showModal(){
        setIsVisible(true)
    }

    function hiddenModal(){
        setIsVisible(false)
    }

    return(
        <Overlay
            isVisible={isVisible}
            onBackdropPress={() => setIsVisible(false)}
            overlayStyle={styles.overlay}
        >
        <View style={styles.modal}>
            <Text style={styles.modalText}>Qual o tipo de projeto você procura?</Text>
            <View >
                <Text>Intuito:</Text>
                <Text style={styles.modalText}>Selecione as opções:</Text>
            <CheckBox
            title='Opção 1'
            checked={checkBox1}
            onPress={() => setCheckBox1(!checkBox1)}
            containerStyle={styles.checkBoxContainer}
            textStyle={styles.checkBoxText}
            checkedImage={<Image source={require('../assets/images/outline_check_box_black_24dp.png')} />}
            uncheckedImage={<Image source={require('../assets/images/outline_check_box_outline_blank_black_24dp.png')} />}
            />
            <CheckBox
            title='Opção 2'
            checked={checkBox2}
            onPress={() => setCheckBox2(!checkBox2)}
            containerStyle={styles.checkBoxContainer}
            textStyle={styles.checkBoxText}
            checkedIcon='check-square-o'
            uncheckedIcon='square-o'
            />
            </View>
        </View>
        </Overlay>
    )
}

const styles = StyleSheet.create({
    overlay: {

        backgroundColor: '#FFFFFF',
        width: '100%',
        padding: 20,
    },

    modal: {
        alignItems: 'center',
    },

    modalText: {
        fontSize: 20,
        fontWeight: 'bold',
    },

    check:{
        transform: [{ scaleX: 0.8 }, { scaleY: 0.8 }],
    }
})