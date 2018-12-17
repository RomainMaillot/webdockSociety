const $buttons = document.querySelectorAll('.js-button')
const $menu = document.querySelector('.js-menu')
const $closeButton = document.querySelectorAll('.js-button-close')
const $pages = document.querySelector('.js-pages')
const $icons = document.querySelectorAll('.js-icon')

for(const $button of $buttons)
{
    const button = new Button($button)
}

for(const $button of $closeButton)
{
    const button = new ButtonClose($button,$menu)
}

for(const $icon of $icons)
{
    const icon = new Icon($icon)
}

page = new Pages($pages)
menu = new Menu($menu)