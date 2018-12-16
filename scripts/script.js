const $buttons = document.querySelectorAll('.js-button')
const $menu = document.querySelector('.js-menu')
const $closeButton = document.querySelectorAll('.js-button-close')
const $pages = document.querySelector('.js-pages')

for(const $button of $buttons)
{
    const button = new Button($button)
}

for(const $button of $closeButton)
{
    const button = new ButtonClose($button,$menu)
}

page = new Pages($pages)
menu = new Menu($menu)