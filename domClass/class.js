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