function changeLanguage(languageCode) {
    var languageCodeElement = document.getElementById("language-code");
    languageCodeElement.innerHTML = languageCode;
    // TODO: redirect to language

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