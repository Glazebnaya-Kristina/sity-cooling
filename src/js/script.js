$(document).ready(function () {
  //бергр меню
  $('.menu-burger').on('click', function (e) {
    e.preventDefault();

    $('.menu-burger').toggleClass('menu-burger--open');
    $('.navigation').toggleClass('navigation--opened');
    $('body').toggleClass('hidden')
  });

  //якорные ссылки
  var $anchor = $('.js-anchor');

  if ($anchor.length) {
    $anchor.on('click', function (event) {
      event.preventDefault();
      var $that = $(this), hb = $('body, html');

      if ($that.is('button')) {
        hb.stop().animate({scrollTop: $('.' + $that.data('id')).offset().top}, 1000, 'swing');
      } else if ($that.is('a')) {
        hb.stop().animate({scrollTop: $('.' + $that.attr('href').replace('#', '')).offset().top}, 1000, 'swing');
      }
    });
  }

  // модальные окна
  // document.addEventListener('DOMContentLoaded', function () {
  //
  //   /* Записываем в переменные массив элементов-кнопок и подложку.
  //      Подложке зададим id, чтобы не влиять на другие элементы с классом overlay*/
  //   var modalButtons = document.querySelectorAll('.js-open-modal'),
  //     overlay = document.querySelector('.js-overlay-modal'),
  //     closeButtons = document.querySelectorAll('.close');
  //   modalWrapp = document.querySelector('.modal');
  //
  //
  //   /* Перебираем массив кнопок */
  //   modalButtons.forEach(function (item) {
  //
  //     /* Назначаем каждой кнопке обработчик клика */
  //     item.addEventListener('click', function (e) {
  //
  //       /* Предотвращаем стандартное действие элемента. Так как кнопку разные
  //          люди могут сделать по-разному. Кто-то сделает ссылку, кто-то кнопку.
  //          Нужно подстраховаться. */
  //       e.preventDefault();
  //
  //       /* При каждом клике на кнопку мы будем забирать содержимое атрибута data-modal
  //          и будем искать модальное окно с таким же атрибутом. */
  //       var modalId = this.getAttribute('data-modal'),
  //         modalElem = document.querySelector('.popup[data-modal="' + modalId + '"]');
  //
  //
  //       /* После того как нашли нужное модальное окно, добавим классы
  //          подложке и окну чтобы показать их. */
  //       modalElem.classList.add('popup--opened');
  //       overlay.classList.add('modal__overlay--opened');
  //       modalWrapp.classList.add('modal--opened');
  //       document.querySelector('body').classList.add('hidden');
  //       // jcf.replaceAll();
  //     }); // end click
  //
  //   }); // end foreach
  //
  //
  //   // закрытие модального окна заявкой
  //   // var btnRegistration = document.querySelectorAll('button[data-modal="thanks"]');
  //   //
  //   // btnRegistration.forEach(function (item) {
  //   //   item.addEventListener('click', function (e) {
  //   //     e.preventDefault();
  //   //     var modalRegistr = document.querySelector('.popup[data-modal="request"]');
  //   //     modalRegistr.classList.remove('popup--opened');
  //   //   });
  //   //
  //   // });
  //
  //   closeButtons.forEach(function (item) {
  //
  //     item.addEventListener('click', function (e) {
  //       var parentModal = this.closest('.popup');
  //
  //       parentModal.classList.remove('popup--opened');
  //       overlay.classList.remove('modal__overlay--opened');
  //       modalWrapp.classList.remove('modal--opened');
  //       document.querySelector('.hidden').classList.remove('hidden');
  //     });
  //
  //   }); // end foreach
  //
  //
  //   document.body.addEventListener('keyup', function (e) {
  //     var key = e.keyCode;
  //
  //     if (key == 27) {
  //
  //       document.querySelector('.modal--opened').classList.remove('modal--opened');
  //       document.querySelector('.modal__overlay--opened').classList.remove('modal__overlay--opened');
  //       document.querySelector('.popup--opened').classList.remove('popup--opened');
  //       document.querySelector('.hidden').classList.remove('hidden');
  //     }
  //     ;
  //   }, false);
  //
  //
  //   overlay.addEventListener('click', function () {
  //     document.querySelector('.modal--opened').classList.remove('modal--opened');
  //     document.querySelector('.popup--opened').classList.remove('popup--opened');
  //     document.querySelector('.hidden').classList.remove('hidden');
  //     this.classList.remove('.modal__overlay--opened');
  //   });
  // }); // end ready

});
