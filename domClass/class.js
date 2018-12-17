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
                    if(!$card.dataset.incoming)
                    {
                        this.$parallaxe = $card.querySelector('.frontImage')
                        this.mouseParallaxe()
                    }
                    else
                    {
                        this.$parallaxe = $card.querySelector('.card__title')
                    }
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
/* Creation of the class Pages */
class Pages
{
    constructor($container)
    {
        this.$container = $container
        
        this.setPages()
        this.setSiblings()

        this.gotTo(0)
    }

    setPages()
    {
        this.pages = {}
        this.pages.index = 0
        this.pages.$items = this.$container.querySelectorAll('.page')
    }

    setSiblings()
    {
        this.siblings = {}
        this.siblings.active = !!this.$container.dataset.siblings
        
        if(this.siblings.active)
        {
            if(!this.siblings.active)
            {
                return
            }

            //create DOM
            this.siblings.$previous = document.createElement('button')
            this.siblings.$previous.classList.add('sibling', 'previous', 'firstLast')
            this.$container.appendChild(this.siblings.$previous)
            
            this.siblings.$next = document.createElement('button')
            this.siblings.$next.classList.add('sibling', 'next')
            this.$container.appendChild(this.siblings.$next)

            // Listen click events
            this.siblings.$previous.addEventListener(
                'click', 
                () =>
                {
                    this.previous()
                }
            )

            this.siblings.$next.addEventListener(
                'click',
                () =>
                {
                    this.next()
                }
            )
        }
    }

    previous()
    {
        let index = this.pages.index - 1

        if(index < 0)
        {
            index = this.pages.$items.length - 1
        }
        if(index == 0)
        {
            this.siblings.$previous.classList.add('firstLast')
        }

        this.gotTo(index)
    }

    next()
    {
        let index = this.pages.index + 1

        if(index > this.pages.$items.length - 1)
        {
            index = 0
        }
        if(index == this.pages.$items.length - 1)
        {
            this.siblings.$next.classList.add('firstLast')
        }

        this.gotTo(index)
    }

    gotTo(_index)
    {
        // Update pages classes
        for(let i = 0; i < this.pages.$items.length; i++)
        {
            const $page = this.pages.$items[i]

            if(i < _index)
            {
                $page.classList.add('is-before')
                $page.classList.remove('is-current','is-after')
            }
            else if(i === _index)
            {
                $page.classList.add('is-current')
                $page.classList.remove('is-before','is-after')
            }
            else
            {
                $page.classList.add('is-after')
                $page.classList.remove('is-current','is-before')
            }
        }

        // Save index
        this.pages.index = _index

        if(this.pages.index > 0 && this.pages.index < this.pages.$items.length - 1)
        {
            this.siblings.$next.classList.remove('firstLast')
            this.siblings.$previous.classList.remove('firstLast')
        }
    }
}