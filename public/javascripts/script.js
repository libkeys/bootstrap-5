let navButton = document.getElementById('navButton')
let toggleMenu = document.getElementById('toggleMobileMenu')
let navOverlay = document.getElementById('navOverlay')
let active = false

function clickNav() {
    if (active === false) {
        navButton.classList.add('active')
        toggleMenu.classList.add('header__navigation_active')
        toggleMenu.classList.remove('header__navigation_hide')
        navOverlay.classList.add('header__overlay_active')
        active = true
    } else {
        navButton.classList.remove('active')
        toggleMenu.classList.remove('header__navigation_active')
        toggleMenu.classList.add('header__navigation_hide')
        navOverlay.classList.remove('header__overlay_active')
        active = false
    }
}

navButton.onclick = function(){
    clickNav()
}
navOverlay.onclick =function(){
    clickNav()
}