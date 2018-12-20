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
// Class icon
class Icon
{
    constructor($container)
    {
        this.$container = $container

        this.createIcon()
        this.iconAction()
    }

    createIcon()
    {
        // Icon document
        if(this.$container.dataset.media == 'history')
        {
            // Create Dom
            this.documentText = this.$container.querySelector('.icon__text')
            this.$container.removeChild(this.documentText)

            this.icon = document.createElement('img')
            this.icon.src = 'images/fichier.png'
            this.icon.classList.add('icon', 'history')
            this.$container.appendChild(this.icon)

            // Create Dom action
            this.iconActionContainer = document.createElement('div')
            this.iconActionContainer.classList.add('document__container')
            this.$container.appendChild(this.iconActionContainer)

            this.iconDocument = document.createElement('div')
            this.iconDocument.classList.add('document')
            this.iconActionContainer.appendChild(this.iconDocument)

            // Create crossClose
            this.iconDocumentClose = document.createElement('div')
            this.iconDocumentClose.classList.add('btn--close', 'js-button-close')
            this.iconActionContainer.appendChild(this.iconDocumentClose)
            new ButtonClose(this.iconDocumentClose,this.iconActionContainer)

            // Create text container
            this.textContainer = document.createElement('div')
            this.textContainer.classList.add('text__container')
            this.iconDocument.appendChild(this.textContainer)

            // Create inside text
            this.documentTitle = document.createElement('h2')
            this.documentTitle.classList.add('icon__title')
            this.documentTitle.textContent = `${this.$container.dataset.title}`
            this.textContainer.appendChild(this.documentTitle)

            // Create inside paragraph
            this.textContainer.appendChild(this.documentText)
        }
        // Icon info
        if(this.$container.dataset.media == 'info')
        {
            // Create Dom
            this.documentText = this.$container.querySelector('.icon__text')
            this.$container.removeChild(this.documentText)

            this.icon = document.createElement('div')
            this.icon.classList.add('icon')
            this.$container.appendChild(this.icon)

            this.iconInner = document.createElement('h2')
            this.iconInner.textContent = '?'
            this.iconInner.classList.add('icon__inner')
            this.icon.appendChild(this.iconInner)

            // Create Dom action
            this.iconActionContainer = document.createElement('div')
            this.iconActionContainer.classList.add('document__container', 'info')
            this.$container.appendChild(this.iconActionContainer)

            this.iconDocument = document.createElement('div')
            this.iconDocument.classList.add('document')
            this.iconActionContainer.appendChild(this.iconDocument)

            // Create crossClose
            this.iconDocumentClose = document.createElement('div')
            this.iconDocumentClose.classList.add('btn--close', 'js-button-close')
            this.iconActionContainer.appendChild(this.iconDocumentClose)
            new ButtonClose(this.iconDocumentClose,this.iconActionContainer)

            // Create text container
            this.textContainer = document.createElement('div')
            this.textContainer.classList.add('text__container')
            this.iconDocument.appendChild(this.textContainer)

            // Create inside text
            this.documentTitle = document.createElement('h2')
            this.documentTitle.classList.add('icon__title')
            this.documentTitle.textContent = `${this.$container.dataset.title}`
            this.textContainer.appendChild(this.documentTitle)

            // Create inside paragraph
            this.textContainer.appendChild(this.documentText)
        }
        // Icon video
        if(this.$container.dataset.media == 'video')
        {
            // Create Dom
            this.icon = document.createElement('div')
            this.icon.classList.add('icon')
            this.$container.appendChild(this.icon)

            this.iconImage = document.createElement('img')
            this.iconImage.src = 'images/film-icon.png'
            this.iconImage.dataSrc = 'images/film-icon.png'
            this.iconImage.dataHover = 'images/film-violet.png'
            this.iconImage.classList.add('iconImage')
            this.icon.appendChild(this.iconImage)

            // Create Dom action
            this.iconActionContainer = document.createElement('div')
            this.iconActionContainer.classList.add('document__container', 'video')
            this.$container.appendChild(this.iconActionContainer)

            this.iconDocument = document.createElement('div')
            this.iconDocument.classList.add('document')
            this.iconActionContainer.appendChild(this.iconDocument)

            // Create crossClose
            this.iconDocumentClose = document.createElement('div')
            this.iconDocumentClose.classList.add('btn--close', 'js-button-close')
            this.iconActionContainer.appendChild(this.iconDocumentClose)
            new ButtonClose(this.iconDocumentClose,this.iconActionContainer)

            // Create text container
            this.videoContainer = document.createElement('video')
            this.videoContainer.src = this.$container.dataset.src
            this.videoContainer.classList.add('video__container', 'js-videoPlayer')
            this.iconDocument.appendChild(this.videoContainer)
            playersVideo.push(new VideoPlayer(this.iconDocument,this.videoContainer))

            // Create inside text
            this.documentTitle = document.createElement('h2')
            this.documentTitle.classList.add('icon__title')
            this.documentTitle.textContent = `${this.$container.dataset.title}`
            this.iconDocument.appendChild(this.documentTitle)
        }
        // Icon audio
        if(this.$container.dataset.media == 'audio')
        {
            // Create Dom
            this.icon = document.createElement('div')
            this.icon.classList.add('icon')
            this.$container.appendChild(this.icon)

            this.iconImage = document.createElement('img')
            this.iconImage.src = 'images/audio-icon.png'
            this.iconImage.dataSrc = 'images/audio-icon.png'
            this.iconImage.dataHover = 'images/audio-violet.png'
            this.iconImage.classList.add('iconImage')
            this.icon.appendChild(this.iconImage)

            // Create Dom action
            this.iconActionContainer = document.createElement('div')
            this.iconActionContainer.classList.add('document__container', 'audio')
            this.$container.appendChild(this.iconActionContainer)

            this.iconDocument = document.createElement('div')
            this.iconDocument.classList.add('document')
            this.iconActionContainer.appendChild(this.iconDocument)

            // Create crossClose
            this.iconDocumentClose = document.createElement('div')
            this.iconDocumentClose.classList.add('btn--close', 'js-button-close', 'btn--audioClose')
            this.iconActionContainer.appendChild(this.iconDocumentClose)
            new ButtonClose(this.iconDocumentClose,this.iconActionContainer)

            // Create inside text
            this.documentTitle = document.createElement('h2')
            this.documentTitle.classList.add('icon__title', 'audio__time')
            this.documentTitle.textContent = `${this.$container.dataset.title}`
            this.iconDocument.appendChild(this.documentTitle)

            // Create text container
            this.audioContainer = document.createElement('audio')
            this.audioContainer.src = this.$container.dataset.src
            this.audioContainer.classList.add('audio__container', 'js-audioPlayer')
            this.iconDocument.appendChild(this.audioContainer)
            playersAudio.push(new MusicPlayer(this.iconDocument,this.audioContainer))

            // Create inside subtitle
            this.documentSubtitle = document.createElement('h2')
            this.documentSubtitle.classList.add('icon__subtitle')
            this.documentSubtitle.textContent = `${this.$container.dataset.subtitle}`
            this.iconDocument.appendChild(this.documentSubtitle)
        }
        // Icon more
        if(this.$container.dataset.media == 'picture')
        {
            // Create Dom
            this.icon = document.createElement('div')
            this.icon.classList.add('icon')
            this.$container.appendChild(this.icon)

            this.iconInner = document.createElement('h2')
            this.iconInner.textContent = '+'
            this.iconInner.classList.add('icon__inner')
            this.icon.appendChild(this.iconInner)

            // Create Dom action
            this.iconActionContainer = document.createElement('div')
            this.iconActionContainer.classList.add('document__container', 'more')
            this.$container.appendChild(this.iconActionContainer)

            this.iconDocument = document.createElement('div')
            this.iconDocument.classList.add('document')
            this.iconActionContainer.appendChild(this.iconDocument)

            this.createPictures()

            // Create crossClose
            this.iconDocumentClose = document.createElement('div')
            this.iconDocumentClose.classList.add('btn--close', 'js-button-close')
            this.iconActionContainer.appendChild(this.iconDocumentClose)
            new ButtonClose(this.iconDocumentClose,this.iconActionContainer)
        }
    }

    iconAction()
    {
        this.icon.addEventListener(
            'click',
            () =>
            {
                this.iconActionContainer.classList.add('open')
            }
        )

        this.iconActionContainer.addEventListener(
            'click',
            (_event) =>
            {
                this.iconDocumentBounding = this.iconDocument.getBoundingClientRect()

                if(_event.clientX > this.iconDocumentBounding.right || _event.clientX < this.iconDocumentBounding.left || _event.clientY > this.iconDocumentBounding.bottom || _event.clientY < this.iconDocumentBounding.top)
                {
                    this.iconActionContainer.classList.remove('open')
                    if(this.$container.dataset.media == 'audio')
                    {
                        this.audioContainer.pause()
                        this.iconDocument.querySelector('.play').classList.toggle('appear')
                        this.iconDocument.querySelector('.pause').classList.toggle('appear')
                    }
                    if(this.$container.dataset.media == 'video')
                    {
                        this.videoContainer.pause()
                        this.iconDocument.querySelector('.play').classList.toggle('appear')
                        this.iconDocument.querySelector('.pause').classList.toggle('appear')
                    }
                }
            }
        )

        if(this.$container.dataset.media == 'audio')
        {
            this.iconActionContainer.querySelector('.btn--audioClose').addEventListener(
                'click',
                () =>
                {
                    this.audioContainer.pause()
                    this.iconDocument.querySelector('.play').classList.toggle('appear')
                    this.iconDocument.querySelector('.pause').classList.toggle('appear')
                }
            )
        }

        if(this.$container.dataset.media == 'audio' || this.$container.dataset.media == 'video')
        {
            this.icon.addEventListener(
                'mouseenter',
                () =>
                {
                    this.iconImage.src = this.iconImage.dataHover
                }
            )
            this.icon.addEventListener(
                'mouseleave',
                () =>
                {
                    this.iconImage.src = this.iconImage.dataSrc
                }
            )
        }
    }

    createPictures()
    {
        this.$pictures = this.$container.querySelectorAll('.picture')
        for(const $picture of this.$pictures)
        {
            this.$container.removeChild($picture)
            this.pictureContainer = document.createElement('div')
            this.pictureContainer.classList.add('picture__container')
            this.iconDocument.appendChild(this.pictureContainer)
            this.pictureContainer.appendChild($picture)

            // Picture
            $picture.style.backgroundImage = `url(${$picture.dataset.src})`

            // Text
            // Create text container
            this.textContainer = document.createElement('div')
            this.textContainer.classList.add('picture__text__container')
            this.pictureContainer.appendChild(this.textContainer)

            // Create inside title
            this.pictureTitle = document.createElement('h2')
            this.pictureTitle.classList.add('picture__title')
            this.pictureTitle.textContent = `${$picture.dataset.title}`
            this.textContainer.appendChild(this.pictureTitle)

            // Create inside paragraph
            this.documentText = document.createElement('p')
            this.documentText.classList.add('picture__text')
            this.documentText.textContent = `${$picture.dataset.text}`
            this.textContainer.appendChild(this.documentText)

            $picture.addEventListener(
                'click',
                () =>
                {
                    $picture.parentNode.classList.add('appear')
                    $picture.parentNode.querySelector('.picture__text__container').classList.add('appear')
                }
            )
        }
    }
}
// Class player Video
class VideoPlayer
{
    constructor($container,$video)
    {
        this.$container = $container
        this.$video = $video

        this.createPlayer()
        this.playerEvent()
    }

    createPlayer()
    {
        // Create button container
        this.$buttonContainer = document.createElement('div')
        this.$buttonContainer.classList.add('button__container')
        this.$container.appendChild(this.$buttonContainer)

        // Pause play button
        this.$play = document.createElement('img')
        this.$play.src = 'images/iconPlay_player.png'
        this.$play.classList.add('play', 'appear')
        this.$buttonContainer.appendChild(this.$play)

        this.$pause = document.createElement('img')
        this.$pause.src = 'images/iconpause_player.png'
        this.$pause.classList.add('pause')
        this.$buttonContainer.appendChild(this.$pause)

        // Create seek bar
        this.$seek = document.createElement('div')
        this.$seek.classList.add('seek')
        this.$buttonContainer.appendChild(this.$seek)
        this.seekWidth = this.$seek.offsetWidth

        this.$fill = document.createElement('div')
        this.$fill.classList.add('fill')
        this.$seek.appendChild(this.$fill)

        this.$circle = document.createElement('div')
        this.$circle.classList.add('circle')
        this.$fill.appendChild(this.$circle)

        // Create time
        this.$currentTime = document.createElement('p')
        this.$currentTime.classList.add('time')
        this.$currentTime.textContent = '0:00'
        this.$buttonContainer.appendChild(this.$currentTime)
        
        // Create volume
        this.$volumeContainer = document.createElement('div')
        this.$volumeContainer.classList.add('volume')
        this.$buttonContainer.appendChild(this.$volumeContainer)

        this.$volume = document.createElement('img')
        this.$volume.src = 'images/iconVolume_player.png'
        this.$volume.classList.add('volume--image')
        this.$volumeContainer.appendChild(this.$volume)

        // Create full screen
        this.$fullScreen = document.createElement('img')
        this.$fullScreen.src = 'images/iconAgrandir_player.png'
        this.$fullScreen.classList.add('fullScreen')
        this.$buttonContainer.appendChild(this.$fullScreen)
    }

    playerEvent()
    {
        this.$play.addEventListener(
            'click',
            () =>
            {
                this.$video.play()
                this.$play.classList.toggle('appear')
                this.$pause.classList.toggle('appear')
            }
        )

        this.$pause.addEventListener(
            'click',
            () =>
            {
                this.$video.pause()
                this.$play.classList.toggle('appear')
                this.$pause.classList.toggle('appear')
            }
        )

        this.$volume.addEventListener(
            'click',
            () =>
            {
                if(this.$video.volume != 0)
                {
                    this.$video.volume = 0
                    this.$buttonContainer.classList.add('mute')
                }
                else
                {
                    this.$video.volume = 1
                    this.$buttonContainer.classList.remove('mute')
                }
            }
        )

        this.$seek.addEventListener(
            'click',
            (_event) =>
            {
                this.mouseX = _event.clientX
                this.updateSeekBar(_event)
                this.holdAndDragTime(_event)
            }
        )

        this.$seek.addEventListener(
            'mousedown', 
            (_event) => 
            {
                this.mouseX = _event.clientX
                this.updateSeekBar(_event)
                this.holdAndDragTime(_event)
            }
        )

        this.$fullScreen.addEventListener(
            'click', 
            () => 
            {
                this.$video.webkitRequestFullScreen()
            }
        )
    }

    updateSeekBar(_event)
    {
        this.bounding = this.$seek.getBoundingClientRect()
        this.ratio = (this.mouseX - this.bounding.left) / this.bounding.width
        this.time = this.ratio * this.$video.duration

        this.$video.play()
        this.$video.currentTime = this.time
        const scale = this.$video.currentTime / this.$video.duration * 100
        this.$fill.style.transform = `translateX(${scale - 100}%)`
        this.$currentTime.textContent = `${Math.floor(this.$video.currentTime/60)}:${leadingZeroTime(this.$video.currentTime%60)}`

        if(!this.$pause.classList.contains('appear'))
        {
            this.$play.classList.toggle('appear')
            this.$pause.classList.toggle('appear')
        }
    }

    holdAndDragTime(_event)
    {
        this.mouseX = _event.clientX
        _event.preventDefault()
        this.$seek.addEventListener('mousemove', this.updateSeekBar(_event))
        this.$seek.addEventListener('mouseup', () =>
        {
            if(this.$play.classList.contains('appear')){
                this.$video.play()
            }
            this.$seek.removeEventListener('mousemove', this.updateSeekBar())
        })
    }
}

// Class player Music
class MusicPlayer
{
    constructor($container,$audio)
    {
        this.$container = $container
        this.$audio = $audio

        this.createPlayer()
        this.playerEvent()
    }

    createPlayer()
    {
        // Create button container
        this.$buttonContainer = document.createElement('div')
        this.$buttonContainer.classList.add('button__container', 'audio')
        this.$container.appendChild(this.$buttonContainer)

        // Pause play button
        this.$play = document.createElement('img')
        this.$play.src = 'images/iconPlay_player.png'
        this.$play.classList.add('play', 'appear')
        this.$buttonContainer.appendChild(this.$play)

        this.$pause = document.createElement('img')
        this.$pause.src = 'images/iconpause_player.png'
        this.$pause.classList.add('pause')
        this.$buttonContainer.appendChild(this.$pause)

        // Create seek bar
        this.$seek = document.createElement('div')
        this.$seek.classList.add('seek')
        this.$buttonContainer.appendChild(this.$seek)
        this.seekWidth = this.$seek.offsetWidth

        this.$fill = document.createElement('div')
        this.$fill.classList.add('fill')
        this.$seek.appendChild(this.$fill)

        // Create time
        this.$currentTimeContainer = document.querySelector('.audio__time')
        this.$currentTime = document.createElement('span')
        this.$currentTime.textContent = `(0:00)`
        this.$currentTimeContainer.appendChild(this.$currentTime)
        
        // Create volume
        this.$volumeContainer = document.createElement('div')
        this.$volumeContainer.classList.add('volume')
        this.$buttonContainer.appendChild(this.$volumeContainer)

        this.$volume = document.createElement('img')
        this.$volume.src = 'images/iconVolume_player.png'
        this.$volume.classList.add('volume--image')
        this.$volumeContainer.appendChild(this.$volume)
    }

    playerEvent()
    {
        this.$play.addEventListener(
            'click',
            () =>
            {
                this.$audio.play()
                this.$play.classList.toggle('appear')
                this.$pause.classList.toggle('appear')
            }
        )

        this.$pause.addEventListener(
            'click',
            () =>
            {
                this.$audio.pause()
                this.$play.classList.toggle('appear')
                this.$pause.classList.toggle('appear')
            }
        )

        this.$volume.addEventListener(
            'click',
            () =>
            {
                if(this.$audio.volume != 0)
                {
                    this.$audio.volume = 0
                    this.$buttonContainer.classList.add('mute')
                }
                else
                {
                    this.$audio.volume = 1
                    this.$buttonContainer.classList.remove('mute')
                }
            }
        )

        this.$seek.addEventListener(
            'click',
            (_event) =>
            {
                this.mouseX = _event.clientX
                this.updateSeekBar(_event)
                this.holdAndDragTime(_event)
            }
        )

        this.$seek.addEventListener(
            'mousedown', 
            (_event) => 
            {
                this.mouseX = _event.clientX
                this.updateSeekBar(_event)
                this.holdAndDragTime(_event)
            }
        )
    }

    updateSeekBar(_event)
    {
        this.bounding = this.$seek.getBoundingClientRect()
        this.ratio = (this.mouseX - this.bounding.left) / this.bounding.width
        this.time = this.ratio * this.$audio.duration

        this.$audio.play()
        this.$audio.currentTime = this.time
        const scale = this.$audio.currentTime / this.$audio.duration * 100
        this.$fill.style.transform = `translateX(${scale - 100}%)`
        this.$currentTime.textContent = ` (${Math.floor(this.$audio.currentTime/60)}:${leadingZeroTime(this.$audio.currentTime%60)})`

        if(!this.$pause.classList.contains('appear'))
        {
            this.$play.classList.toggle('appear')
            this.$pause.classList.toggle('appear')
        }
    }

    holdAndDragTime(_event)
    {
        this.mouseX = _event.clientX
        _event.preventDefault()
        this.$seek.addEventListener('mousemove', this.updateSeekBar(_event))
        this.$seek.addEventListener('mouseup', () =>
        {
            if(this.$play.classList.contains('appear')){
                this.$audio.play()
            }
            this.$seek.removeEventListener('mousemove', this.updateSeekBar())
        })
    }
}

let playersVideo = []
let playersAudio = []

const loop = () => 
{
    window.requestAnimationFrame(loop)
    for($player of playersVideo)
    {
        if(!$player.$video.paused)
        {
            const scale = $player.$video.currentTime / $player.$video.duration * 100
            $player.$fill.style.transform = `translateX(${scale - 100}%)`
            $player.$currentTime.textContent = `${Math.floor($player.$video.currentTime/60)}:${leadingZeroTime($player.$video.currentTime%60)}`
        }
    }
    for($player of playersAudio)
    {
        if(!$player.$audio.paused)
        {
            const scale = $player.$audio.currentTime / $player.$audio.duration * 100
            $player.$fill.style.transform = `translateX(${scale - 100}%)`
            $player.$currentTime.textContent = ` (${Math.floor($player.$audio.currentTime/60)}:${leadingZeroTime($player.$audio.currentTime%60)})`
        }
    }
}

// Function to add Leading zeros for the current time and time
const leadingZeroTime = (time) =>
{
    var result
    // if time is less than 10s, then add a leading zero
    if(time<10){
        result = `0${Math.floor(time)}`
    }
    else{
        result = Math.floor(time)
    }
    return result
}

loop()