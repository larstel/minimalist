function onSideNavigationLinkClicked(newActiveElement) {
    var allElementsWhichAreActive = document.getElementsByClassName("secondary active");
  
    while (allElementsWhichAreActive.length) {
        allElementsWhichAreActive[0].classList.remove("active");
    }
  
    document.getElementById("_nav").scrollIntoView();

    var toggleButton = document.getElementById("sideNavigationButton");

    if (toggleButton) {
      if (toggleButton.value == "opened") {
        closeSideNavigation();
      }
    }
}

function onSideNavigationButtonClicked() {
    var toggleButton = document.getElementById("sideNavigationButton");

    if (toggleButton) {
        if (toggleButton.value == "closed") {
            openSideNavigation();
        } else if (toggleButton.value == "opened") {
            closeSideNavigation();
        }
    }
}

function openSideNavigation() {
    var sideNavigation = document.getElementsByTagName("nav")[0];
    var toggleButton = document.getElementById("sideNavigationButton");
  
    if (sideNavigation && toggleButton) {
      sideNavigation.style.width = "200px";
      toggleButton.style.left = "150px";
      toggleButton.value = "opened";
  
      var el = document.getElementById(parent.location.hash.substring(1) + "_nav");
      el.classList.add("active");
      document.getElementById("_nav").scrollIntoView();
    }
}

function closeSideNavigation() {
    var sideNavigation = document.getElementsByTagName("nav")[0];
    var toggleButton = document.getElementById("sideNavigationButton");
  
    if (
      sideNavigation &&
      toggleButton
    ) {
      sideNavigation.style.width = "20px";
      toggleButton.style.left = "-30px";
      toggleButton.value = "closed";
    }
}

// function onMediaWidthChanged(mediaMatcher) {
//     var sideNavigation = document.getElementsByTagName("nav")[0];
    
//     var toggleButton = document.getElementById("sideNavigationButton");
//     var content = document.getElementById("content");
  
//     if (mediaMatcher.matches) {
  
//       if (sideNavigation && toggleButton && content) {
//         sideNavigation.style.width = "10px";
//         toggleButton.style.left = "-28px";
//         toggleButton.value = "closed";
//         toggleButton.style.visibility = "visible";
//         content.style.marginLeft = "10px";
//       }
//     } else {
//       if (sideNavigation && toggleButton && content) {
//         toggleButton.style.visibility = "hidden";
//         toggleButton.value = "opened";
//         content.style.marginLeft = "200px";
//         sideNavigation.style.width = "200px";
//       }
//     }
//   }
  
  // var mediaMatcher = window.matchMedia("(max-width: 560px)");
  // onMediaWidthChanged(mediaMatcher);
  // mediaMatcher.addListener(onMediaWidthChanged);