const $pages = document.querySelector('.js-pages')

page = new Pages($pages)

// For the menu

const $buttons = document.querySelectorAll('.js-button')
const $menu = document.querySelector('.js-menu')
const $menuButton = document.querySelector('.btn-menu')
const $instructionsOpens = document.querySelectorAll('.instructions--open')
const $instructions = document.querySelector('.js-instructions')
const $closeButton = document.querySelectorAll('.js-button-close')

for(const $button of $buttons)
{
    const button = new Button($button)
}
for(const $button of $closeButton)
{
    const button = new ButtonClose($button,$instructions)
}

for(const $instructionsOpen of $instructionsOpens)
{
    $instructionsOpen.addEventListener(
        'click',
        () =>
        {
            $instructions.classList.toggle('open')
        }
    )
}