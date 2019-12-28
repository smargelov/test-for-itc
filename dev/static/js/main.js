$(document).ready(function () {
    svg4everybody({});

    // Number formatting
    function formatNumber(num) {
        return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1 ')
    }
    function changeFormattingNum(targetNum) {
        $.each(targetNum, function (index, value) {
            let num = $(value).text();
            $(value).text(formatNumber(num))
        });
    }
    function changeFormattingNumInput(targetInput) {
        $.each(targetInput, function (index, value) {
            let num = $(value).val();
            $(value).val(formatNumber(num))
        });
    }
    changeFormattingNum($('.product-card__price > span'));
    changeFormattingNum($('.product-card__old-price'));
    changeFormattingNumInput($('.param-form__lable > input'));


    var slider = document.getElementById('price-slider');

    noUiSlider.create(slider, {
        start: [20, 80],
        connect: true,
        range: {
            'min': 0,
            'max': 100
        }
    });
});


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
