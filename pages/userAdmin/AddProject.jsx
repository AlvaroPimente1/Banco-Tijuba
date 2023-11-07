import React, { useState } from 'react';
import { StyleSheet, TextInput, TouchableOpacity, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import createProject from '../../firebase/api/admin/createProject';
import DropDownPicker from 'react-native-dropdown-picker';

export default function AddProjectScreen() {
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(null);
    const [items, setItems] = useState([
        { label: 'Meio Ambiente', value: 'Ambiente' },
        { label: 'Social', value: 'Social' },
        { label: 'Educação', value: 'Educacao' },
        { label: 'Saude', value: 'Saude' },
    ]);
    
    const {
        nomeProjeto,
        setNomeProjeto,
        descricaoProjeto,
        setDescricaoProjeto,
        categoria,
        setCategoria,
        cadastradorPor,
        setCadastradorPor,
        addProject
    } = createProject();

    return (
        <SafeAreaView style={styles.container}>        
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

            <DropDownPicker
                containerStyle={styles.dropDownContainer}
                style={styles.dropDown}
                labelStyle={styles.label}
                itemStyle={styles.item}
                selectedLabelStyle={styles.selectedLabel}
                arrowStyle={styles.arrow}
                placeholderTextColor={'#F5F5F5'}
                placeholder='Categoria do projeto'
                placeholderStyle={{ color: '#fff' }}
                open={open}
                value={value}
                items={items}
                setOpen={setOpen}
                setValue={(val) => {
                    setValue(val);
                    setCategoria(val);}
                    }
                setItems={setItems}
            />                
            <TouchableOpacity onPress={addProject}>
                <Text style={{color: '#fff'}}>Criar Projeto!</Text>
            </TouchableOpacity>
        </SafeAreaView>
    );
}


const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: '#1C1C1C',
        alignItems: 'center',
        justifyContent: 'space-evenly'
    },

    inputText: {
        width: '90%',
        borderBottomWidth: 1,
        borderColor: '#663399',
        color: '#fff',
        marginVertical: 20
    },
    dropDownContainer: {
        height: 40,
        width: '90%',
        marginBottom: 20,
    },
    dropDown: {
        backgroundColor: '#663399',
        borderWidth: 1,
        borderColor: '#663399',
        borderRadius: 8,
    },
    label: {
        color: '#fff',
    },
    item: {
        justifyContent: 'flex-start', 
    },
    selectedLabel: {
        color: '#fff',
    },
    arrow: {
        backgroundColor: '#663399',
    },
})