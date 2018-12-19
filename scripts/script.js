const $buttons = document.querySelectorAll('.js-button')
const $menu = document.querySelector('.js-menu')
const $menuButton = document.querySelector('.btn-menu')
const $aboutOpen = document.querySelector('.aboutus--open')
const $about = document.querySelector('.js-about')
const $closeButton = document.querySelectorAll('.js-button-close')
const $pages = document.querySelector('.js-pages')
const $icons = document.querySelectorAll('.js-icon')

for (const $button of $buttons)
{
    const button = new Button($button)
}
for (const $button of $closeButton)
{
    const button = new ButtonClose($button,$about)
}

menu = new Menu($menu)

$menuButton.addEventListener(
    'click',
    () =>
    {
        $menu.classList.add('appear')
    }
)

$aboutOpen.addEventListener(
    'click',
    () =>
    {
        $about.classList.toggle('open')
    }
)
let $sentences = []
$sentences.push(document.querySelector('.show'))
$sentences.push(document.querySelector('.hideSecond'))
$sentences.push(document.querySelector('.hideThird'))

$sentences[1].style.display='none'
$sentences[2].style.display='none'

let i = 1;

const display = () =>
{
    if (i < 3)
    {
        $sentences[i - 1].style.display = 'none'
        $sentences[i].style.display = 'block'
        i++
    }
}

const sentencesDisplay = setInterval(display, 4000)
