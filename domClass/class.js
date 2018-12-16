/* 
Creation of class button
exemple of html :
    <div class="btn--main js-button" data-text="ICI"></div>
*/
class Button
{
    constructor($container)
    {
        this.$container = $container
        this.text = this.$container.dataset.text

        this.createBackground()
    }

    createBackground()
    {
        // Create dom element back border
        this.backBorder = document.createElement('span')
        this.backBorder.classList.add('btn--border', 'border--back')
        this.$container.appendChild(this.backBorder)

        // Create dom element text and border middle
        this.textMiddle = document.createElement('span')
        this.textMiddle.classList.add('btn--border', 'btn--content')
        this.textMiddle.textContent = `${this.text}`
        this.$container.appendChild(this.textMiddle)

        // Create dom element front border
        this.frontBorder = document.createElement('span')
        this.frontBorder.classList.add('btn--border', 'border--front')
        this.$container.appendChild(this.frontBorder)

        // Create lines
        this.addBackgroundLine(this.backBorder)
        this.addBackgroundLine(this.textMiddle)
        this.addBackgroundLine(this.frontBorder)
    }
    
    addBackgroundLine($container)
    {
        // Adding top left lines
        this.topLeftLine = document.createElement('span')
        this.topLeftLine.classList.add('btn--line', 'top--left')
        $container.appendChild(this.topLeftLine)

        // Adding bottom right lines
        this.bottomRightLine = document.createElement('span')
        this.bottomRightLine.classList.add('btn--line', 'bottom--right')
        $container.appendChild(this.bottomRightLine)
    }
}
/* 
Creation of class menu
exemple of html :
    <div class="menu__card" data-background="images/background_roms.png">
        <div class="menu__card__content">
            <h2 class="card__title">les roms</h2>
            <div class="card__content__inner">
                <p class="card__text">Déconstruisons ensemble l’entièreté des préjugés autour de cette communauté dont la richesse culturelle doit perdurer…</p>
                <div class="btn--main js-button" data-text="ICI"></div>
            </div>
            <img class="frontImage" src="images/roms.png" alt="">
        </div>
    </div>
*/
class Menu
{
    constructor($container)
    {
        this.$container = $container

        this.setCards()
        this.setActive()
    }

    setCards()
    {
        this.cards = {}
        this.cards.$items = this.$container.querySelectorAll('.menu__card')
        this.cards.width = 100 / this.cards.$items.length

        for(const $card of this.cards.$items)
        {
            this.setCardWidth(this.cards.width,$card)
            $card.style.backgroundImage = `url('${$card.dataset.background}')`
        }
    }

    setCardWidth(width,element)
    {
        element.style.width = `${width}%`
    }

    setActive()
    {
        for(const $card of this.cards.$items)
        {
            $card.addEventListener(
                'click',
                () =>
                {
                    if(this.$container.querySelector('.active'))
                    {
                        const $card = this.$container.querySelector('.active')
                        this.setCardWidth(this.cards.width,$card)
                        $card.classList.remove('active')
                    }
                    if($card.dataset.incoming)
                    {
                        $card.classList.add('incoming')
                    }
                    $card.classList.add('active')
                    this.setCardWidth(this.cards.width*2,$card)
                    this.$parallaxe = $card.querySelector('.frontImage')
                    this.mouseParallaxe()
                }
            )
        }
    }

    mouseParallaxe()
    {
        window.addEventListener(
            'mousemove',
            (_event) =>
            {
                const ratioX = _event.clientX / this.cards.width / 3
                const ratioY = _event.clientY / this.cards.width / 3
                this.$parallaxe.style.transform = `translateX(${-ratioX}px) translateY(${-ratioY}px)`
            }
        )
    }
}
/* Creation of a close button */
class ButtonClose
{
    constructor($container, $elementClose)
    {
        this.$container = $container
        this.$elementClose = $elementClose

        this.close()
    }

    close()
    {
        this.$container.addEventListener(
            'click',
            () =>
            {
                this.$container.classList.toggle('close')
                this.$elementClose.classList.toggle('open')
            }
        )
    }
}