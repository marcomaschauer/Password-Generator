function getPassword(){ //main
    var length = document.getElementById("pwLength").value;
    if(!checkPasswordLength(length)){
        return false
    }
    var uppercase = "ABCDEFGHKMNPRSTUVWXYZ";
    var lowercase = "abcdefghkmnprstuvwxyz";
    var number = "123456789";
    var specialChar = "$&?#!";
    var passwordlist = "";
    if (document.getElementById("lower").checked) {
        passwordlist = lowercase;
    }
    if (document.getElementById("uppercase").checked) {
        passwordlist += uppercase;
    }
    if (document.getElementById("numbers").checked) {
        passwordlist += number;
    }
    if (document.getElementById("special").checked) {
        passwordlist += specialChar;
    }
    var password = "";
    while (!contains(password)) {
        password = generatePassword(length, passwordlist);
    }
    //console.log(password);
    document.getElementById("password-frame").children[0].innerText = password;
    CheckPasswordStrength();
}
function generatePassword(length, wordlist){
    var password = "";
    for (let index = 0; index < length; index++){
        password += wordlist[Math.floor(Math.random() * wordlist.length)];
    }
    return password;
}
function contains(string){
    var x = true;
    if (document.getElementById("lower").checked) {
        x = checkLowerCaseLetter(string);
    }
    if (document.getElementById("uppercase").checked) {
        x = checkUpperCaseLetter(string);
    }
    if (document.getElementById("numbers").checked) {
        x = checkNumber(string);
    }
    if (document.getElementById("special").checked) {
        x = checkSymbol(string);
    }
    return x;
}
async function CheckPasswordStrength (){
    await sleep(50);
    var securityLevel = 0;
    var pw = document.getElementById("password-frame").children[0].innerText;
    if (pw.length >= 20) {
        securityLevel = 4;
    }else if (pw.length >= 15) {
        securityLevel = securityLevel + 2;
    }else if (pw.length >= 10) {
        securityLevel = securityLevel + 1;
    }
    if(checkUpperCaseLetter(pw)){
        securityLevel++;
    }
    if(checkNumber(pw)) {
        securityLevel++;
    }
    if (checkSymbol(pw)) {
        securityLevel++;
    }
    if (pw.length <= 8) {
        securityLevel = 1;
    }
    document.getElementById('password-strength-meter').setAttribute('value', securityLevel);
}
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
function checkLowerCaseLetter(stringToCheck){
    return /[a-z]+/g.test(stringToCheck)
}
function checkUpperCaseLetter(stringToCheck){
    return /[A-Z]+/g.test(stringToCheck)
}
function checkNumber(stringToCheck){
    return /\d+/g.test(stringToCheck)
}
function checkSymbol(stringToCheck){
    return /[\$%&\/\(\)=\?\}\{@#\*\+!]+/g.test(stringToCheck)
}
function checkPasswordLength(length){
    document.getElementById("message-frame").children[0].innerText = "";
    if (length == ""){
        return false
    }
    if (length > 100) {
        document.getElementById("message-frame").children[0].innerText = "Passwords can't be longer than 100 characters";
        var col = document.getElementById("message-frame").children[0];
        col.style.color="#FF0000"
        return false;
    }
    else{
        var col = document.getElementById("password-frame").children[0];
        col.style.color="#FFFFFF"
        return true
    }
}
async function copy(){
    var copyText = document.getElementById("password-frame").children[0].innerText;
    if (!(document.getElementById("message-frame").children[0].innerText == "Passwords can't be longer than 100 characters")) {
        navigator.clipboard.writeText(copyText);
        document.getElementById("message-frame").children[0].innerText = "Password copied!";
        await sleep(2000)
        document.getElementById("message-frame").children[0].innerText = "";
    }
}


