function getPassword(){ 
    var length = document.getElementById("pwLength").value;
    if(!checkPasswordLength(length)){
        return false
    }
    var uppercase = "ABCDEFGHKMNPRSTUVWXYZ";
    var lowercase = "abcdefghkmnprstuvwxyz";
    var number = "123456789";
    var specialChar = "$&?#!";
    var passwordlist = lowercase;
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
    for (let index = 0; index < length; index++) {
        password += passwordlist[Math.floor(Math.random() * passwordlist.length)];
    }
    //console.log(password);
    document.getElementById("password-frame").children[0].innerText = password;
    CheckPasswordStrength();
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
function checkNumber(stringToCheck){
    return /\d+/g.test(stringToCheck)
}
function checkUpperCaseLetter(stringToCheck){
    return /[A-Z]+/g.test(stringToCheck)
}
function checkSymbol(stringToCheck){
    return /[\$%&\/\(\)=\?\}\{@#\*\+!]+/g.test(stringToCheck)
}
function checkPasswordLength(length){
    if (length > 40) {
        document.getElementById("password-frame").children[0].innerText = "Passwords can't be longer than 55 characters";
        var col = document.getElementById("password-frame").children[0];
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
    navigator.clipboard.writeText(copyText);
    document.getElementById("password-frame").children[0].innerText = "Password copied!";
    await sleep(2000)
    document.getElementById("password-frame").children[0].innerText = copyText;
}
