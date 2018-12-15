const $buttons = document.querySelectorAll('.js-button')
const $menu = document.querySelector('.js-menu')
const $menuButton = document.querySelector('.btn-menu')

for(const $button of $buttons)
{
    const button = new Button($button)
}

menu = new Menu($menu)

$menuButton.addEventListener(
    'click',
    () =>
    {
        $menu.classList.add('appear')
    }
)