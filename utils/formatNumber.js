
export const formatPhoneNumber = (input) => {

const cleaned = input.replace(/\D/g, '');

if (cleaned.length > 11) {
    return numero; 
}

let formatted = '';
    for (let i = 0; i < cleaned.length; i++) {
        if (i === 0) {
            formatted += '(';
        } else if (i === 2) {
            formatted += ') ';
        }
        formatted += cleaned[i];
    }

    return formatted;
};