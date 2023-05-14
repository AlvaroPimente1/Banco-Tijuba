import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import { BancoDados } from '../data';


  const [meusProjetos, setMeusProjetos] = useState([]);

  export default function adicionarProjeto(projeto) {
    setMeusProjetos([...meusProjetos, projeto]);
  }
/* 

  return (
    <View>
      <Text>Meus Projetos</Text>
      <FlatList
        data={BancoDados.TodosProjetos}
        renderItem={renderItem}
        keyExtractor={(item) => item.key.toString()}
      />
      <Text>Projetos Adicionados</Text>
      <FlatList
        data={meusProjetos}
        renderItem={renderItem}
        keyExtractor={(item) => item.key.toString()}
      />
    </View>
  ); */
}