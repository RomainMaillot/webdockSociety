class Button
{
    constructor($container)
    {
        this.$container = $container
        this.text = "C'est parti"

        this.createVisual()
    }

    createVisual()
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
    }
}