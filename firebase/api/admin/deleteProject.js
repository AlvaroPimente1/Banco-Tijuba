import { useState } from 'react';
import firestore from '@react-native-firebase/firestore';
import { Alert } from 'react-native';

export default function deleteProject(){

    const projectRef = firestore().collection('projetos')
}