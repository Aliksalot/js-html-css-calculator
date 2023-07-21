

const modes = ['I', 'D', 'M', 'A', 'S']

let mode = 'I'
let buffer = '0'
let current = '0'

const outField = document.querySelector('.input-field');

const displayCurrent = () => {
    current = current.length > 9 ? current.substring(0,9) : current;
    console.log(current.length)
    outField.textContent = current
}

const clear = () => {
    buffer = '0'
    current = '0'
    mode = 'I'
    displayCurrent();
}

const writeNumber = (number) => {
 
    if(current === '0' && number !== '.'){
        current = number;            
    }else{
        current += number;
    }    
        
    displayCurrent();
}

const performMath = () => {
    
    const calculate = () => {
        switch(mode){
            case 'D': return buffer / current;
            case 'M': return buffer * current;
            case 'A': return Number(buffer) + Number(current);
            case 'S': return buffer - current;
        }
    }
    
    const ans = calculate();

    clear()
    current = ans;
    displayCurrent();      
}

const setMode = (action) => {
    switch(action){
        case '/': mode = 'D'; break;
        case 'x': mode = 'M'; break;
        case '+': mode = 'A'; break;
        case '-': mode = 'S'; break;            
    }    
    buffer = current;
    current = '0';
    console.log('MODE', mode, "action", action)
    displayCurrent();
}

const performAction = (action) => {
    

    if(mode === 'I'){

        if(action.isNumber || action.content === '.'){
            return writeNumber(action.content)
        }
       
        setMode(action.content)
    }else{

        if(action.isNumber || action.content === '.'){
            return writeNumber(action.content)
        }
        
        if(action.content === '='){
            return performMath()
        }
        performMath();
        setMode(action.content);

    }

    

}

const initializeButtons = () => {
    const buttons = document.querySelectorAll('.number-button')
    
    buttons.forEach(button => {
        button.onclick = () => {performAction({isNumber: !isNaN(Number(button.textContent)), content: button.textContent}); console.log(mode, buffer, current)};
    })

    const clear_button = document.querySelector('.clear-button')
    clear_button.onclick = () => clear()
}

initializeButtons()