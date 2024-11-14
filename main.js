var inputBox = document.querySelector('input');
var equalBtn = document.querySelector('#equal');
var resultBox = document.querySelector('#result');

// Xử lý các số hạng có phép nhân, chia, các hàm sin, cos, log,...
function calculate(input) {
    var arrayElements = [];
    var arrayMarks = [];
    var start = 0;
    var end = 1;
    var inputLength = input.length;
    while(end < inputLength) {
        if(input[end] != '*' && input[end] != '/') {
            end++;
        } else {
            arrayMarks.push(input[end]);
            arrayElements.push(input.slice(start,end));
            start = end+1;
            end++;
        }
    }
    arrayElements.push(input.slice(start,end));
    console.log(arrayMarks);
    var arrayElementsLength = arrayElements.length;
    var arrayMarksLength = arrayMarks.length;
    // console.log(arrayElementsLength);
    // console.log(arrayMarksLength);
    for(var i = 0; i < arrayElementsLength; i++) {
        arrayElements[i] = handleMathFunction(arrayElements[i]);
    }
    console.log(arrayElements);
    var result = arrayElements[0];
    console.log(result);
    for(var i = 0; i < arrayMarksLength; i++) {
        if(arrayMarks[i] == '*') {
            result *= arrayElements[i+1];
        } else if(arrayElements[i+1] != '0') {
            result /= arrayElements[i+1];
        } else {
            result = 'ERROR';
            console.error('ERROR');
            break;
        }
    }
    return result;
}

function handleMathFunction(element) {
    function factorial(number) {
        if(number == 0 || number == 1) return 1;
        return number * factorial(number-1);
    }
    // Tính sin
    if(element.slice(0,3) == 'sin') {
        element = Math.sin(Number(element.slice(4,element.length-1)) * Math.PI / 180);
    }
    // Tính cosin
    else if(element.slice(0,3) == 'cos') {
        element = Math.cos(Number(element.slice(4,element.length-1)) * Math.PI / 180);
    }
    // Tính loga nepe
    else if(element.slice(0,2) == 'ln') {
        if(element.slice(3,element.length-1) == 'e') {
            element = 1;
        }
        else if(element.slice(3,5) == 'e^') {
            element = Number(element.slice(5,element.length-1));
        }
        else {
            element = Math.log(Number(element.slice(3,element.length-1)));
        }
    }
    // Tính giai thừa
    
    else if(element[element.length-1] == '!') {
        element = factorial(Number(element.slice(0,element.length-1)));
    }
    return Number(element);
}


function getElementsAndMarks(input) {
    var elementsAndMarks = [];
    var start = 0;
    var end = 1;
    while(end <= input.length - 1) {
        if(input[end] != '+' && input[end] != '-') {
            end++;
        }
        else {
            elementsAndMarks.push(input.slice(start, end));
            elementsAndMarks.push(input[end]);
            start = end+1;
            end++;
        }
    }
    elementsAndMarks.push(input.slice(start));
    return elementsAndMarks;
}

equalBtn.onclick = function() {
    var input = inputBox.value;
    var elementsAndMarks = getElementsAndMarks(input);
    console.log(elementsAndMarks);
    var elementsAndMarksLength = elementsAndMarks.length;
    // Xử lý các số hạng có phép nhân, phép chia
    for(var i = 0; i < elementsAndMarksLength; i += 2) {
        elementsAndMarks[i] = calculate(elementsAndMarks[i]);
    }
    console.log(elementsAndMarks);

    // Tính toán và render ra kết quả
    var result = elementsAndMarks[0];
    for(var i = 1; i < elementsAndMarks.length-1; i+=2) {
        if(elementsAndMarks[i] == '+') {
            result += elementsAndMarks[i+1];
        }
        else if(elementsAndMarks[i] == '-') {
            result -= elementsAndMarks[i+1];
        }
    }
        
    resultBox.innerText = result;
}