const decimalInput = document.getElementById('decimalInput');
const binaryInput = document.getElementById('binaryInput');
const octalInput = document.getElementById('octalInput');
const hexInput = document.getElementById('hexInput');

function convertDecimalToBinary(decimal) {
    let binary = '';
    let number = decimal;
    do {
        binary = (number % 2) + binary;
        number = Math.floor(number / 2);
    } while (number > 0);
    return binary || '0';
}

function convertDecimalToOctal(decimal) {
    let octal = '';
    let number = decimal;
    do {
        octal = (number % 8) + octal;
        number = Math.floor(number / 8);
    } while (number > 0);
    return octal || '0';
}

function convertDecimalToHex(decimal) {
    const hexChars = '0123456789ABCDEF';
    let hex = '';
    let number = decimal;
    do {
        hex = hexChars[number % 16] + hex;
        number = Math.floor(number / 16);
    } while (number > 0);
    return hex || '0';
}

function convertToDecimal(value, base) {
    const digits = value.split('');
    let decimal = 0;
    digits.reverse().forEach((digit, index) => {
        const digitValue = parseInt(digit, base);
        if (isNaN(digitValue) || digitValue >= base) throw new Error('Invalid input');
        decimal += digitValue * Math.pow(base, index);
    });
    return decimal;
}

function updateFromDecimal() {
    try {
        const decimalValue = parseInt(decimalInput.value, 10);
        if (isNaN(decimalValue)) throw new Error('Invalid decimal number');
        binaryInput.value = convertDecimalToBinary(decimalValue);
        octalInput.value = convertDecimalToOctal(decimalValue);
        hexInput.value = convertDecimalToHex(decimalValue);
    } catch {
        binaryInput.value = '';
        octalInput.value = '';
        hexInput.value = '';
    }
}

function updateFromBinary() {
    try {
        const decimalValue = convertToDecimal(binaryInput.value, 2);
        decimalInput.value = decimalValue;
        octalInput.value = convertDecimalToOctal(decimalValue);
        hexInput.value = convertDecimalToHex(decimalValue);
    } catch {
        decimalInput.value = '';
        octalInput.value = '';
        hexInput.value = '';
    }
}

function updateFromOctal() {
    try {
        const decimalValue = convertToDecimal(octalInput.value, 8);
        decimalInput.value = decimalValue;
        binaryInput.value = convertDecimalToBinary(decimalValue);
        hexInput.value = convertDecimalToHex(decimalValue);
    } catch {
        decimalInput.value = '';
        binaryInput.value = '';
        hexInput.value = '';
    }
}

function updateFromHex() {
    try {
        const decimalValue = convertToDecimal(hexInput.value.toUpperCase(), 16);
        decimalInput.value = decimalValue;
        binaryInput.value = convertDecimalToBinary(decimalValue);
        octalInput.value = convertDecimalToOctal(decimalValue);
    } catch {
        decimalInput.value = '';
        binaryInput.value = '';
        octalInput.value = '';
    }
}

decimalInput.addEventListener('input', updateFromDecimal);
binaryInput.addEventListener('input', updateFromBinary);
octalInput.addEventListener('input', updateFromOctal);
hexInput.addEventListener('input', updateFromHex);
