function changeLanguage(languageCode) {

    

    var languageCodeElement = document.getElementById("language-code");
    languageCodeElement.innerHTML = languageCode;
    
    const currentUrl = window.location.href;

    let languageCodeReplaceIndex = 1;
    let languageReplaceIndex = 2;
    let filenameReplaceIndex = 3;
    if(currentUrl.startsWith("file")){ // dev environment
        languageCodeReplaceIndex = 10;
        languageReplaceIndex = 11;
        filenameReplaceIndex = 12;
    } 

    const urlParts = currentUrl.split('/');
    urlParts[languageCodeReplaceIndex] = languageCode;
    urlParts[languageReplaceIndex] = languages[languageCode];
    urlParts[filenameReplaceIndex] = filenames[languageCode] + ".html";
    var newUrl = urlParts.join('/');

    const hashIndex = newUrl.indexOf('#');

    if (hashIndex !== -1) {
        newUrl = newUrl.slice(0, hashIndex);
    }

    console.log(newUrl)
    window.location.href = newUrl;

    var selector = document.getElementById("language-selector");
    selector.style.display = "none";
}

function closeLanguageSelector() {
    var selector = document.getElementById("language-selector");
    selector.style.display = "none";
}

function openLanguageSelector() {
    var selector = document.getElementById("language-selector");
    selector.style.display = "block";
}

function toggleLanguageSelector() {
    var selector = document.getElementById("language-selector");

    if(selector.style.display == "block") {
        closeLanguageSelector();
    } else {
        openLanguageSelector();
    }
}
