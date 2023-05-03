import 'firebase/database';
import { firebase } from '@react-native-firebase/app';

const firebaseConfig = {
    apiKey: "AIzaSyC9FxrNdOK-GZXa-zSmuixBuoMCWujEHlY",
    authDomain: "bancotijuba-83426.firebaseapp.com",
    databaseURL: "https://bancotijuba-83426-default-rtdb.firebaseio.com/",
    projectId: "902495629453",
    appId: "1:902495629453:android:2a2e28a8656e54b06132c4"
};

firebase.initializeApp(firebaseConfig);

export default firebase;
