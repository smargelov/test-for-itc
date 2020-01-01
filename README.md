# Тестовое задание для компании [itc-media.ru](https://itc-media.ru/)

## Выполнение задания:

1. Подготовил макет

- Перенёс макет в Avocode

  ![avocode](/img-for-md/2019-12-24_22-59.png)

* Создал переменные для цвета

  ![colors-var](/img-for-md/2019-12-24_23-04.png)

- «Нарезал» картинки и svg

  ![images](/img-for-md/2019-12-24_23-08.png)

* Исправил битые svg (в идеале следовало бы векторизовать логотип, но это остаётся на усмотрение дизайнера)

  ![fix-svg](/img-for-md/2019-12-24_23-13.png)

2. Склонировал и подготовил [стартовый шаблон](https://github.com/smargelov/newGulpStart) (в окружении используется Gulp 4, соответсвенно необходим NodeJS 12+)

3. Дальнешее можно смотреть по коммитам

## Особенности

1. AJAX запросы отправляются на фейковый сервер. Для проверки работы необходимо запустить сборку в dev-режиме (gulp default). JSON-server установлен как плагин к Gulp.
2. Адаптивность не делалась, так как не понятна дизайнерская задумка
3. В качестве сетки я использую плагин SmartGrid. Удобная и простая альтернатива сеткам Bootstrap и ей подобным.
4. Макет по какой-то причине неправильно отображается в Avocode. Причину не нашёл
5. Сборка билда с минифицированными версиями js и css запускается командой gulp build-min. Там же прходит и оптимизация изображений.
6. Я использовал Pug для структуры и Sass (в синтаксисе sass) для стилей. Кроме того, в проекте есть зависимость JQuery. На боевом проекте я бы согласовал этот момент отдельно.
7. Я не знаю точно, правильно ли я понял задание, но в меру своего понимания, я результатом доволен ))
