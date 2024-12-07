function submitText(event) {
    event.preventDefault();
    let isi = document.getElementById("text-input").value;
    let cleanedStr = isi.trim().toLowerCase().replace(/[^a-z0-9]/gi, '');

    if(cleanedStr === "") {
        console.log("Please input a value");
        alert("Please input a value");
    }
    else {
        let palindrom = checkPalindrom(cleanedStr);
        if(palindrom) {
            document.getElementById("result").textContent = isi +" is a palindrome";
        }
        else {
            document.getElementById("result").textContent = isi +" is not a palindrome";
        }
    }
}

function checkPalindrom(cleanedStr="") {
    let lengthisi = cleanedStr.length;
    let middleindex = Math.floor(lengthisi/2);
    for (let i = 0; i < middleindex; i++) {
        let leftpart = cleanedStr.charAt(i);
        let rightpart = cleanedStr.charAt(lengthisi-1-i);
        if(leftpart != rightpart) {
            return false;
        }
    }
    return true;
}

function clearText(event) {
    event.preventDefault();
    document.getElementById("result").textContent = "";
    document.getElementById("text-input").value = "";
    document.getElementById("text-input").focus();
}