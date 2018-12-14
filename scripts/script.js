let button = document.querySelector(".js-about")
let menu = document.querySelector(".about")

button.addEventListener(
    "click", function(){
        menu.classList.toggle("open")
    }
)