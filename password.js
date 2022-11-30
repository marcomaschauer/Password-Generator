function getPassword(){ //main
    //var length = document.getElementById("pwLength").value;
    var length = document.getElementById("pwLength").value;
    if(!checkPasswordLength(length)){
        return false
    }
    var uppercase = "ABCDEFGHIJKLMNOPRSTUVWXYZ";
    var lowercase = "abcdefghijklmnoprstuvwxyz";
    var number = "0123456789";
    var specialChar = "[$%&/\()=?}{@#*+!]";
    var passwordlist = "";
    if (document.getElementById("lowercase").checked) {
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
    document.getElementById("password-frame").children[0].innerText = password;
    CheckPasswordStrength();
    document.getElementById("password-frame").children[2].innerText = "Entropy: " + getPasswordEntropy(password, passwordlist) + " Bits";
    createCookie();
}
function generatePassword(length, wordlist){
    var password = "";
    for (let index = 0; index < length; index++){
        password += wordlist[Math.floor(Math.random() * wordlist.length)];
    }
    return password;
}
function contains(string){
    if (document.getElementById("lowercase").checked) {
        if (!checkLowerCaseLetter(string)){
            return false;
        }
    }
    if (document.getElementById("uppercase").checked) {
        if (!checkUpperCaseLetter(string)){
            return false;
        }
    }
    if (document.getElementById("numbers").checked) {
        if (!checkNumber(string)){
            return false;
        }
    }
    if (document.getElementById("special").checked) {
        if (!checkSymbol(string)){
            return false;
        }
    }
    return true;
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
    if (length > 100 || length < 4) {
        document.getElementById("message-frame").children[0].innerText = "Passwords must be between 4 and 100 characters";
        var col = document.getElementById("message-frame").children[0];
        col.style.color="#FF0000"
        return false;
    }
    else{
        return true
    }
}
async function copy(){
    var copyText = document.getElementById("password-frame").children[0].innerText;
    if (!(copyText == "")) {
        navigator.clipboard.writeText(copyText);
        document.getElementById("message-frame").children[0].innerText = "Password copied!";
        var col = document.getElementById("message-frame").children[0];
        col.style.color = "#c6ff00"
        await sleep(2000)
        document.getElementById("message-frame").children[0].innerText = "";
    }
}
function getPasswordEntropy(password, wordlist){
    return Math.trunc(Math.log2(Math.pow(wordlist.length, password.length)));
}
function toggleSettings(){
    if (document.getElementById("settings").getAttribute('style') == "visibility: hidden;"){
        document.getElementById("settings").setAttribute('style', 'visibility: visible')
    }else{
        document.getElementById("settings").setAttribute('style', "visibility: hidden;")
    }

}
function loadCookie(){
    if (document.cookie == "") {
        createCookie();
    }else{
        document.getElementById("pwLength").value = getCookie("pwlength");
        if(getCookie("lowercase") == "true"){
            document.getElementById("lowercase").checked = true;
        }else{
            document.getElementById("lowercase").checked = false;
        }
        if(getCookie("uppercase") == "true"){
            document.getElementById("uppercase").checked = true;
        }else{
            document.getElementById("uppercase").checked = false;
        }
        if(getCookie("numbers") == "true"){
            document.getElementById("numbers").checked = true;
        }else{
            document.getElementById("numbers").checked = false;
        }
        if(getCookie("special") == "true"){
            document.getElementById("special").checked = true;
        }else{
            document.getElementById("special").checked = false;
        }
    }
    getPassword();
    
}
function createCookie(){
    document.cookie = "pwlength=" + document.getElementById("pwLength").value;
    document.cookie = "lowercase=" + document.getElementById("lowercase").checked;
    document.cookie = "uppercase=" + document.getElementById("uppercase").checked;
    document.cookie = "numbers=" + document.getElementById("numbers").checked;
    document.cookie = "special=" + document.getElementById("special").checked;
}
function getCookie(cname) {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for(let i = 0; i <ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
  }