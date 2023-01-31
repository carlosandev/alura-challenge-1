const letters = {
    "a":"ai",
    "e":"enter",
    "i":"imes",
    "o":"ober",
    "u":"ufat",
}
const userText = document.getElementById("user-text");
const buttonEncrypt = document.getElementById("button-encrypt");
const buttonDecrypt = document.getElementById("button-decrypt");
const buttonCopy = document.getElementById("copy-text");
const responseText = document.getElementById("response-text");
const waitingText = document.getElementById("waiting-text");
const response = document.getElementById("response");
const alphabet = "abcdefghijklmnñopqrstuvwxyz ";
let run = true

function validate(){
    for(let i=0;i<userText.value.length;i++){
        if(!alphabet.includes(userText.value[i])){
            return false
        }
    }  
    return true
}

function encrypt(){
    if(validate()){
        let encryptText = "";
        for(let i = 0; i < userText.value.length;i++){
            let char = userText.value[i];
            if (char in letters){
                encryptText += letters[char];
            }else{
                encryptText += char;
            }
        }
        waitingText.style.display="none";
        buttonCopy.style.display="grid"; 
        response.style.display="grid";
        response.style.justifyItems="center";  
        responseText.innerHTML=encryptText; 
        clearInput()       
    }else{
        clearInput()
        alert("Solo puedes ingresar letras minúsculas y sin acento.");
    }
}

function decrypt(){
    if(validate()){
        let decrypText = userText.value;
        for(let key in letters){
            let value = letters[key];
            while(decrypText.indexOf(value) !== -1){
                decrypText = decrypText.replace(value, key);
            }
        }
        waitingText.style.display="none";
        response.style.display="grid";
        buttonCopy.style.display="grid"; 
        responseText.innerHTML=decrypText;   
        clearInput()
    }else{
        clearInput()
        alert("Solo puedes ingresar letras minúsculas y sin acento.");
    }
}

function copyText(){
    let textToCopy = responseText.innerHTML;
    if (navigator.clipboard) {
        navigator.clipboard.writeText(textToCopy)
            .then(() => {
                console.log('Texto copiado al portapapeles');
            })
            .catch(err => {
                console.error('Error al copiar texto al portapapeles: ', err);
            });

    } else {
        console.error('Tu navegador no soporta la API clipboard');
    }
}

function clearInput(){
    userText.value = "";
}

buttonEncrypt.addEventListener("click", encrypt);
buttonDecrypt.addEventListener("click", decrypt);
buttonCopy.addEventListener("click", copyText);


