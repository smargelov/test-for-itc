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

    let slider = document.getElementById('price-slider'),
        priceMin = document.getElementById('price-min'),
        priceMax = document.getElementById('price-max'),
        prices = [5990, 3990, 3400, 5990, 5990, 5990, 3400, 3990], // получить из базы
        maxRange = prices.reduce((a, b) => a > b ? a : b),
        minRange = prices.reduce((a, b) => a < b ? a : b);
    noUiSlider.create(slider, {
        start: [minRange, maxRange],
        connect: true,
        step: 10,
        range: {
            'min': minRange,
            'max': maxRange
        }
    })
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
}); priceMax.addEventListener('change', function () {
    slider.noUiSlider.set([null, this.value]);
});

let newStoreList,
    setNewStore = (newStore) => {
        let cards = $('.product-card');
        for (let i = 0; i < cards.length; i++) {
            const card = cards[i],
                newCard = newStore[i];
            if (newCard) {
                let imgLink = $(card).find('.product-card__link-img'),
                    img = $(imgLink).find('img'),
                    titleLink = imgLink = $(card).find('.product-card__link'),
                    onStock = imgLink = $(card).find('.product-card__on-stock');

                $(imgLink).attr('href', newCard.link);
                $(imgLink).attr('title', newCard.title);
                $(img).attr('src', newCard.img);
                $(img).attr('alt', newCard.title);
                $(titleLink).attr('href', newCard.link);
                $(titleLink).attr('title', newCard.title);
                $(titleLink).text(newCard.title);
                if (newCard.onStock) {
                    $(onStock).removeClass('product-card__on-stock--delivery');
                    $(onStock)
                        .find('svg')
                        .removeClass('product-card__delivery-icon')
                        .addClass('product-card__delivery-icon');
                    $(onStock)
                        .find('use')
                        .attr('xlink:href', 'images/svg/symbol/sprite.svg#tick');
                    $(onStock)
                        .find('p')
                        .html('в наличии');
                } else {
                    $(onStock).addClass('product-card__on-stock--delivery')
                    $(onStock)
                        .find('svg')
                        .removeClass('product-card__delivery-icon')
                        .addClass('product-card__delivery-icon');
                    $(onStock)
                        .find('use')
                        .attr('xlink:href', 'images/svg/symbol/sprite.svg#wheel');
                    $(onStock)
                        .find('p')
                        .html('под заказ <span>' + newCard.deliveryDay + '</span> дней');
                };
                $(card).find('.product-card__price > span').text(formatNumber(newCard.price));
                $(card).find('.product-card__old-price').remove()
                if (newCard.oldPrice && newCard.oldPrice > newCard.price) {
                    $(card).find('.product-card__price').append('<div class="product-card__old-price"></div>')
                    $(card).find('.product-card__old-price').text(newCard.oldPrice)
                }
                $(card).find('.product-card__btn').attr('data-product', newCard.id);
                $(card).find('.product-card__sale').remove()
                if (newCard.sale) {
                    $(card).append('<div class="product-card__sale"></div>');
                    $(card).find('.product-card__sale').html('<span>' + newCard.salePercent + '</span> %');
                }
            } else {
                $(card).remove();
            }
        }
    };

$('#reset-btn').click(function (e) {
    e.preventDefault();
    slider.noUiSlider.set([minRange, maxRange]);
    priceMin.value = formatNumber(Math.round(minRange));
    priceMax.value = formatNumber(Math.round(maxRange));
    $.ajax({
        type: "GET",
        url: "http://localhost:3002/storeList?price_gte=3000&price_lte=6000&_limit=8",
        // data: "data",
        dataType: "json",
        success: function (response) {
            newStoreList = response;
            console.log(newStoreList);
            setNewStore(newStoreList);
        }
    });
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