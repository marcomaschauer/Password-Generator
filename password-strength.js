async function CheckPasswordStrength (){
    await sleep(50);
    var securityLevel = 0;
    var pw = document.getElementById("password-frame").children[0].contentWindow.document.getElementById("password").innerText;
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
function copy(){
    var copyText = document.getElementById("password-frame").children[0].contentWindow.document.getElementById("password").innerText
    navigator.clipboard.writeText(copyText);
    //document.getElementById("new_coder").innerHTML = <p>Password copied</p>
}