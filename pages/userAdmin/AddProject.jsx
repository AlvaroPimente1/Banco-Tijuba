import React from 'react';
import styles from '../../style/commonsStyles';
import { Button, TextInput, TouchableOpacity, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import createProject from '../../firebase/api/admin/createProject';

export default function AddProjectScreen() {
    const {
        nomeProjeto,
        setNomeProjeto,
        descricaoProjeto,
        setDescricaoProjeto,
        addProject
    } = createProject();

    return (
        <SafeAreaView style={styles.conteiner}>
            <TextInput
                style={styles.inputText}
                value={nomeProjeto}
                onChangeText={setNomeProjeto}
                placeholder={'Nome do projeto'}
                placeholderTextColor={'#F5F5F5'}
            />
            <TextInput
                style={styles.inputText}
                value={descricaoProjeto}
                onChangeText={setDescricaoProjeto}
                placeholder={'Descrição do projeto'}
                placeholderTextColor={'#F5F5F5'}
            />
            <TouchableOpacity onPress={addProject}>
                <Text style={{color: '#fff'}}>Criar Projeto!</Text>
            </TouchableOpacity>
        </SafeAreaView>
    );
}
