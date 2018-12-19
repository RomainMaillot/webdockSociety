# Paeideia

The Paeideia project is a french webdock that aim to show the importance of intangible culture in our society.
This work was carried out as part of a pedagogical project and for pedagogical purposes. Operating rights have not been audited or acquired.

## Requirements

* A modern browser (Firefox, Chrome, Edge, and Safari)
* A sufficient internet connexion
* A resolution of minimum 860*1000

## Usage of Class

### Button

Create a div with class 'js-button' to create the button and 'btn--main' to create style.
Then add a data-text with the inner text you want on your button.

Exemple :
```
<div class="btn--main js-button" data-text="ICI"></div>
```
### Menu

Create a big div that will contain all your menu with the class 'menu' and 'js-menu'.
Then an other big div inside that will contain all your card with the class 'menu__cards'

All you cards inside this div will have the class 'menu__card' and a data-background with the src of the background you want on your card.
Each cards will have to contain a div with a class 'menu__card__content', a title with class 'card__title' a div class 'card__content__inner',  with 'card__text' and a button inside. Finally an image that will have a parallaxe if the data-incoming="true". 

Exemple :
```
<div class="menu js-menu">
    <div class="menu__cards">
        <div class="menu__card" data-background="images/background_roms.png">
            <div class="menu__card__content">
                <h2 class="card__title">les roms</h2>
                <div class="card__content__inner">
                    <p class="card__text"></p>
                    <div class="btn--main js-button" data-text="ICI"></div>
                </div>
                <img class="frontImage" src="images/roms.png" alt="">
            </div>
        </div>
    </div>
</div>
```

### ButtonClose

You will just have to call the class.

### Pages

Create a big div that will contain all your pages with the class 'pages--container' and 'js-pages'.
Then an other big div inside that will contain all your card with the class 'pages' with a div 'page' inside and a div 'content'.

Exemple :
```
<div class="pages--container js-pages" data-siblings="true">
    <div class="pages">
         <div class="page">
             <div class="content">
             </div>
         </div>
    </div>
</div>
```
### Icons

Create a div with the class 'js-icon' and a data-media corresponding to the media you want and the data link with the 

Exemple :
```
<div class="js-icon" data-media="info" data-title="" data-text"" data-src"" data-subtitle"">
```

### Ressources

* Font : [Lato](https://fonts.google.com/?selection.family=Lato)
* Font : [Bodoni]