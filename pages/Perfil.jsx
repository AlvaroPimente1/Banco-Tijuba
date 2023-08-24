import React, { useState, useEffect } from "react";
import { SafeAreaView, Text } from "react-native";
import firestore from '@react-native-firebase/firestore';
import getUserID from "../firebase/getUserID";

export default function PerfilUsuario(){
    const [usuario, setUsuario] = useState(null);

    useEffect(() => {
        const fetchUsuario = async () => {
            const userRef = firestore().collection('usuarios').doc(getUserID());
            const querySnapshot = await userRef.get();
            if (querySnapshot.exists) {
                setUsuario(querySnapshot.data());
            }
        };
    
        fetchUsuario();
    }, []);


    return(
        <SafeAreaView>
            <Text>{usuario.nome}</Text>
        </SafeAreaView>
    )
}
