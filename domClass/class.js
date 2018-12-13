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
                    $card.classList.add('active')
                    this.setCardWidth(this.cards.width*2,$card)
                }
            )
        }
    }
}