
/*
*   Preloader screen
 */

const $preloader = document.querySelector('.preloader')
const $container = document.querySelector('.container')
const $percent = document.querySelector('.preloader__percentage')

window.addEventListener('load', () => {

        let $counter = 0

        const frame = () => {
            if ($counter === 100) {
                $preloader.style.display = 'none'
                $container.style.transform = `translateY(${0}`
                clearInterval($percentageLoader)
                const sentencesDisplay = setInterval(display, 4000)
            }
            else {
                $counter += 1
                $percent.textContent = $counter + '%'
            }
        }

        const $percentageLoader = setTimeout(setInterval(frame, 50), 3)
})

/*
*   Button
 */

const $buttons = document.querySelectorAll('.js-button')
const $menu = document.querySelector('.js-menu')
const $menuButton = document.querySelector('.btn-menu')
const $aboutOpen = document.querySelector('.aboutus--open')
const $about = document.querySelector('.js-about')
const $closeButton = document.querySelectorAll('.js-button-close')

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
        console.log($about)
        $about.classList.toggle('open')
    }
)

/*
*   Ghost text
 */

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
