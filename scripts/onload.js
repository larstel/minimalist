let latestElementId;

window.onload = function() {
    //darkmode
    const currentTheme = localStorage.getItem('theme') ? localStorage.getItem('theme') : null;

    if (currentTheme) {
        setTheme(currentTheme);
    } else if(window.matchMedia("(prefers-color-scheme:dark)").matches) {
        setTheme('dark')
    } else {
        setTheme('light');
    }

    document.getElementById("content-scroll").addEventListener("scroll", (event) => {
        scrollTest();
    });

    // navigation
    var currentLocation = document.getElementById(parent.location.hash.substring(1) + "_nav");
    if(currentLocation != null) {
        currentLocation.classList.add("active");
        document.getElementById("_nav").scrollIntoView();
    }

    // scroll
    scrollTest();

    // language selector
    var languageCodeElement = document.getElementById("language-code");

    const currentUrl = window.location.href;

    let languageCodePlace = 3;
    if(currentUrl.startsWith("file")){ // dev environment
        languageCodePlace = 10;
    } 

    const urlParts = currentUrl.split('/');
    languageCodeElement.innerHTML = urlParts[languageCodePlace] ? urlParts[languageCodePlace] : 'EN';
}

function scrollTest() {
    var headerElements = document.getElementsByClassName("anchor");
    var scrollPos = document.getElementById("content-scroll").scrollTop;
    for (const element of headerElements) {
        var distance = element.offsetTop - scrollPos;
        if(distance > 20 && distance < (window.innerHeight - window.innerHeight/1.5)) {
            if(element.id === 'top') {
                // history.pushState({}, "", " ");
            } else if(latestElementId != element.id){
                // history.pushState({}, "", "#" + element.id);
                latestElementId = element.id;
            }

            var allElementsWhichAreActive = document.getElementsByClassName("subNavigationElement active");

            while (allElementsWhichAreActive.length) {
                allElementsWhichAreActive[0].classList.remove("active");
            }

            if(element.id != 'top') {
                console.log(element.id)
                document.getElementById(element.id + '_nav').classList.add("active");
            }
            break;
        }
      }
}