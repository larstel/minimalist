/**
 * Gets the current theme and applies the oppsite.
 */
function toggleTheme() {
    let htmlElement = document.getElementsByTagName('html')[0];
    let currentTheme = htmlElement.dataset.theme;
    
    if (currentTheme == 'light') {
        setTheme('dark');
    } else {
        setTheme('light');
    }
}

/**
 * Sets the local storage, dataset and icon to specific values based on the selected theme.
 * @param {*} theme the theme which should be applied
 */
function setTheme(theme) {
    let htmlElement = document.getElementsByTagName('html')[0];
    let themeButton = document.getElementById("theme-button");

    htmlElement.dataset.theme = theme;
    localStorage.setItem('theme', theme);

    // set the darkmode icon
    if(theme == 'dark') {
        themeButton.innerText = "light_mode";
    } else if (theme == 'light') {
        themeButton.innerText = "dark_mode";
    }
}