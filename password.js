function generatePassword(){ 
    var securityLevel = document.querySelector('input[name="sLevel"]:checked').value;
    var length = document.getElementById("pwLength").value;
    if (length > 55) {
        document.getElementById("password-frame").children[0].innerText = "Passwords can't be longer than 55 characters";
        var col = document.getElementById("password-frame").children[0];
        col.style.color="#FF0000"
        return false;
    }
    else{
        var col = document.getElementById("password-frame").children[0];
        col.style.color="#FFFFFF"
    }
    var uppercase = "ABCDEFGHKLMNOPRSTUVWXYZ";
    var lowercase = "abcdefghiklmnoprstuvwxyz";
    var number = "0123456789";
    var specialChar = "$%&/()=?}{@#*+!";
    switch (securityLevel) {
        case '1':
            var passwordlist = uppercase + lowercase;
            break;
        case '2':
            var passwordlist = lowercase + number;
            break;
        case '3':
            var passwordlist = lowercase + uppercase + number;
            break;
        case '4':
            var passwordlist = lowercase + uppercase + number +specialChar;
            break;
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
function copy(){
    var copyText = document.getElementById("password-frame").children[0].innerText;
    navigator.clipboard.writeText(copyText);
    //document.getElementById("new_coder").innerHTML = <p>Password copied</p>
}
