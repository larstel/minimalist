/**
 * Handles clicks on the tooltip symbol. The url will be copied into the clipboard. 
 * The tooltip tex will change to indicate, that the link is copied into the clipboard.
 * @param {*} element the parent element which the tooltip button is a childen of
 * @param {*} url the url which should be copied into the clipboard
 */
function onTooltipClicked(element, url) {
    navigator.clipboard.writeText(url)

    let tooltipText = element.getElementsByClassName("tooltiptext")[0];
    tooltipText.innerHTML = "link copied"; // TODO: translate dynamically to choosen language
}

/**
 * Handles if the tooltip icon is not hovered anymore. 
 * The tooltip text is set back and will be hidden.
 * @param {*} element the parent element which the tooltip button is a childen of
 */
function onTooltipLeft(element) {
    let tooltipText = element.getElementsByClassName("tooltiptext")[0];

    tooltipText.innerHTML = "copy link"; // TODO: translate dynamically to choosen language
    tooltipText.style.visibility = "hidden";
}

/**
 * Handles if the tooltip icon is entered. Therefore the tooltip text will be shown.
 * @param {*} element the parent element which the tooltip button is a childen of
 */
function onTooltipEnter(element){
    let tooltipText = element.getElementsByClassName("tooltiptext")[0];
    tooltipText.style.visibility = "visible";
}