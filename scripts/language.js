function changeLanguage(languageCode) {
    var languageCodeElement = document.getElementById("language-code");
    languageCodeElement.innerHTML = languageCode;
    
    const currentUrl = window.location.href;

    let languageCodeReplaceIndex = 3;
    let languageReplaceIndex = 4;
    let filenameReplaceIndex = 5;
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

    window.location.href = newUrl;
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
