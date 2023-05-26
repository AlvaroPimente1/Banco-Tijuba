import React from "react";
import axios from "axios";
import { Alert } from "react-native";
import { refFromURL } from "firebase/database";
import { SafeAreaView } from "react-native-safe-area-context";
import { Button } from "react-native-elements";

export default function ChatBotScreen(){

// URL da API do Dialogflow
const dialogflowURL = 'https://dialogflow.googleapis.com/v2/projects/bancotijuba-tju9/agent/sessions/1:detectIntent';

// Chave de autenticação da API do Dialogflow
const dialogflowAPIKey = 'MIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQDCE5emNtPOJLX0\nr3oT7o13AtcVW9HHO2ymzSDMi+Uzvp586Ld6wwtN+Z56dtURlLtt1lyNe1h0PgrV\nRXe9ju2jxSqvxIeWjrVffEKqWIFUGkwQqekqsCWUQ9Zfawlw51u02WQwGjn7DSEj\nP9c4cJQxINReD70WhsodJt37pi9/eKzgUyMtJqgtGT9hr2lrFv32o0K7W0IuAPoD\npoGmpEkzLTzXYsH5PfjM9XqqVznzViw8ghUBGQ1yufnIg4t9NlEVaAdMl5s9X5On\nEn5JAS92e+dG7E7uC2Eh518Mv6aEUdlx6iAH2pOYIrkCtQcbKQlo6xX1/VAbcKLd\n2j1Zl8PDAgMBAAECggEAIaarB1d/X0GPSTd59+XHoqib6airlZuQqdVsh/sDyXaW\nXXsugTs7hRAwsfRT2oILA68FCkUmX7V4RGWQrw4O13QzBBoUFn91JHLTzlydRBtx\nL/x+IPg889nVXGMfVnPPO2rsS8joX8b1hXqm0zL2BxS1rf+VnkfN2MMp/13f436Y\nUcYdCMcA6gUvQZCvqVys0sn+mTk8paWFcCApUa5bj13TQ2kdYNHvBCj05BX148MI\nx2LOstz3JsC90UjS3T/Af7T7GsJ38J0JnNPJTNC7qmgqqe39ZzoD+T6Pa1j8ySFG\n+yTeFyhaiwCFyx/6xPrkyMYublOLC9MJIYfSi8x4HQKBgQDhOvtDJ7VIqahpdSXL\nVKMAvwaRqa21zL8DhSeMGWnIb8Z/aE9ccA8XZxhzfX8McoKEDG1ZURPs7nRJE8EE\nR5tSPFbLfHPP8Fi2zcdB+qFG/qfKQPIwZEWIFblCBQLzYx5yHPNP4hvMjDbhKrH3\nYvdfqWUYsPYsA1e1Va1x7TAufQKBgQDclw/VgMXlFUC1gu0kbxggPP06VDJD65x6\nw/tt2y8CFO8IeGH3/l4/9U0vEmCH2QyYpSWvC53EWT7imCg0xt14iQk9h/JC4Qyf\n9TsxTH4nF/DV19Xub3kRJfxJ102taodl1eWVvgmfiQTu14KbisjbCUU9DAguH0g0\nVjg2+H8PPwKBgH5+iLVLrNXVax9nSsWqkC2QG5ldaZEsH69TbkWR1EZc+Gd/5ups\niR1EqofaWKtd+I0/CX7bOUydE7QjIwlLSiFigACiscx8GOb6JUmaAFAGH6hI13x0\nJFTslnJMrD6TUXsXZVNdEu3LZdsKBo+BBpu0YHIAmRFZAz51kwbkBmZlAoGBAKS6\n1qM8+Au8FEe4TzmPEPg6M2zUpXjdQUzYgDGopfErCtpLc/XLajzfBdWqJpYsO2De\nq0aOKTIQ54o10IihHZC+3TyrAfp5r4DglGSbV/X/xeUbunHFoyZwNHg8JZDkZdph\nooJxmSQfIaTvIWTgfmA8Cw2sp4sx5yzWWkKKze/nAoGAJkK3ZTTxWOoWjc7gFdV8\nU9A/2bLTL2DVX1KZ4R28lsxubagfjntp54OeHlKKixGrGLHpmwWVs3CIsoT/2uP+\nhDny+tEXq129Upfz1wx3Rw+JHfrV/EdE8C7Wzx8c90qqzwp7Ja7Rdshob3SrTw5x\nrqBeSIomw3PlrdjBf27CDEc=';

// ID do projeto do Dialogflow
const dialogflowProjectID = 'YOUR_PROJECT_ID';

// ID da sessão (pode ser qualquer string única)
const dialogflowSessionID = 'YOUR_SESSION_ID';

// Função para enviar uma solicitação para o Dialogflow
const sendRequestToDialogflow = async (message) => {
    try {
        const requestBody = {
        queryInput: {
            text: {
            text: message,
            languageCode: 'pt-BR', // Substitua pelo idioma desejado
            },
        },
        };

        const config = {
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${dialogflowAPIKey}`,
        },
        };

        const response = await axios.post(dialogflowURL, requestBody, config);

        // Trate a resposta do Dialogflow conforme necessário
        Alert.alert(response.data);
    } catch (error) {
        console.error(error);
    }
};

const handleButtonClick = () => {
    const message = 'ola'; // Mensagem desejada
    sendRequestToDialogflow(message);
};

    return(
        <SafeAreaView>
            <Button
                title={'APERTE'}
                onPress={handleButtonClick}
            />
        </SafeAreaView>
    )
}
