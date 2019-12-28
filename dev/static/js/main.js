$(document).ready(function () {
    svg4everybody({});

    // Number formatting
    let formatNumber = (num) => {
        return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1 ')
    }
    let changeFormattingNum = (targetNum) => {
        $.each(targetNum, (index, value) => {
            let num = $(value).text();
            $(value).text(formatNumber(num))
        });
    }
    changeFormattingNum($('.product-card__price > span'));
    changeFormattingNum($('.product-card__old-price'));


    // Price slider

    const slider = document.getElementById('price-slider'),
        priceMin = document.getElementById('price-min'),
        priceMax = document.getElementById('price-max'),
        prices = [5990, 3990, 3400, 5990, 5990, 5990, 3400, 3990], // получить из базы
        maxRange = prices.reduce((a,b) => a > b ? a : b),
        minRange = prices.reduce((a,b) => a < b ? a : b);
    
    noUiSlider.create(slider, {
        start: [minRange, maxRange],
        connect: true,
        step: 10,
        range: {
            'min': minRange,
            'max': maxRange
        }
    });

    slider.noUiSlider.on('update', (values, handle) => {
        let value = values[handle];
        if (!handle) {
            priceMin.value = formatNumber(Math.round(value));
        } else {
            priceMax.value = formatNumber(Math.round(value));
        }
    });

    priceMin.addEventListener('change', function () {
        slider.noUiSlider.set([this.value, null]);
    });
    priceMax.addEventListener('change', function () {
        slider.noUiSlider.set([null, this.value]);
    });
});
console.log(
    
    [4,5,30,21,112,0,114,99,15,5,6].reduce((a,b) => a > b ? a : b)
);


// Полифилы

// forEach IE 11
if ('NodeList' in window && !NodeList.prototype.forEach) {
    console.info('polyfill for IE11');
    NodeList.prototype.forEach = function (callback, thisArg) {
        thisArg = thisArg || window;
        for (var i = 0; i < this.length; i++) {
            callback.call(thisArg, this[i], i, this);
        }
    };
}

// closest IE 11
(function () {
    if (!Element.prototype.closest) {
        Element.prototype.closest = function (css) {
            var node = this;
            while (node) {
                if (node.matches(css)) return node;
                else node = node.parentElement;
            }
            return null;
        };
    }
})();

// matches IE 11
(function () {
    if (!Element.prototype.matches) {
        Element.prototype.matches = Element.prototype.matchesSelector ||
            Element.prototype.webkitMatchesSelector ||
            Element.prototype.mozMatchesSelector ||
            Element.prototype.msMatchesSelector;
    }
})();

//Array.form IE 11
if (!Array.from) {
    Array.from = function (object) {
        'use strict';
        return [].slice.call(object);
    };
}
