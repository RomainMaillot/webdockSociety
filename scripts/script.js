const $buttons = document.querySelectorAll('.js-button')
const $menu = document.querySelector('.js-menu')
const $closeButton = document.querySelectorAll('.js-button-close')

for(const $button of $buttons)
{
    const button = new Button($button)
}

for(const $button of $closeButton)
{
    const button = new ButtonClose($button,$menu)
}

menu = new Menu($menu)