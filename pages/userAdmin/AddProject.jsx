import React, { useState } from 'react';
import styles from '../../style/commonsStyles';
import { Button, TextInput, TouchableOpacity, Text } from 'react-native';
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
        { label: 'Agricultura Familiar', value: 'Agricultura' },
        { label: 'Turismo', value: 'Turismo' },
        { label: 'BioJoias', value: 'Biojoias' }
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
            <DropDownPicker
                style={styles.inputText}
                placeholderTextColor={'#F5F5F5'}
                placeholder='Selecione um parâmetro'
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
