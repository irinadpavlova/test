'use strict';

(function () {
  var body = document.querySelector('body');
  var navMain = document.querySelector('.main-nav');
  var navToggle = document.querySelector('.main-nav__toggle');

  navMain.classList.remove('main-nav--nojs');

  navToggle.addEventListener('click', function () {
    if (navMain.classList.contains('main-nav--closed')) {
      navMain.classList.remove('main-nav--closed');
      body.classList.add('body-lock');
      navMain.classList.add('main-nav--opened');
    } else {
      navMain.classList.add('main-nav--closed');
      body.classList.remove('body-lock');
      navMain.classList.remove('main-nav--opened');
    }
  });
})();

(function () {
  var body = document.querySelector('body');
  var buttons = document.querySelectorAll('.login');
  var buttonClose = document.querySelector('.modal__button-close');
  var popup = document.querySelector('.modal--login');
  var overlay = document.querySelector('.overlay');
  var password = document.querySelector('.modal__password');
  var email = document.querySelector('.modal__email');
  var storageMail = '';

  var onPopupEscPress = function (evt) {
    if (evt.key === 'Escape') {
      evt.preventDefault();
      closePopup(popup, overlay, buttonClose);
    }
  };

  var onOutsideOfPopupClick = function (evt) {
    evt.preventDefault();
    closePopup(popup, overlay, buttonClose);
  };

  var onButtonCloseClick = function (evt) {
    evt.preventDefault();
    closePopup(popup, overlay, buttonClose);
  };

  var openPopup = function (modalPopup, modalOverlay, modalButtonClose) {
    modalPopup.classList.add('modal--show');
    modalOverlay.classList.add('overlay--show');

    modalOverlay.addEventListener('click', onOutsideOfPopupClick);

    modalButtonClose.addEventListener('click', onButtonCloseClick);

    document.addEventListener('keydown', onPopupEscPress);

    body.classList.add('body-lock');
  };

  var closePopup = function (modalPopup, modalOverlay, modalButtonClose) {
    modalPopup.classList.remove('modal--show');
    modalOverlay.classList.remove('overlay--show');

    modalOverlay.removeEventListener('click', onOutsideOfPopupClick);

    modalButtonClose.removeEventListener('click', onButtonCloseClick);

    document.removeEventListener('keydown', onPopupEscPress);

    body.classList.remove('body-lock');
  };

  for (var i = 0; i < buttons.length; i++) {
    buttons[i].addEventListener('click', function (evt) {
      evt.preventDefault();
      openPopup(popup, overlay, buttonClose);

      if (storageMail) {
        email.value = storageMail;
        password.focus();
      } else {
        email.focus();
      }
    });
  }
})();

(function () {
  var swiper = new Swiper('.new__swiper-container', {
    slidesPerView: 4,
    slidesPerGroup: 4,
    spaceBetween: 30,
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
      renderBullet: function (index, className) {
        return '<span class="' + className + '">' + (index + 1) + '</span>';
      },
    },
    navigation: {
      nextEl: '.new__button-next',
      prevEl: '.new__button-prev',
    },
    breakpoints: {
      1023: {
        slidesPerView: 2,
        slidesPerGroup: 2,
      }
    }
  });
})();

(function () {
  var panelItem = document.querySelectorAll('.questions__item-title');
  var active = document.getElementsByClassName('questions__item-title--active');
  var panel = document.querySelector('.questions');

  if (panel) {
    panel.classList.remove('questions--nojs');
  }

  Array.prototype.slice.call(panelItem).forEach(function (item) {
    item.addEventListener('click', function () {
      if (active.length > 0 && active[0] !== item) {
        active[0].classList.remove('questions__item-title--active');
      }
      item.classList.toggle('questions__item-title--active');
    });
  });
})();

(function () {
  var panelItem = document.querySelectorAll('.filter__item-legend');
  var active = document.getElementsByClassName('filter__item-legend--active');

  Array.prototype.slice.call(panelItem).forEach(function (item) {
    item.addEventListener('click', function () {
      if (active.length > 0 && active[0] !== item) {
        active[0].classList.remove('filter__item-legend--active');
      }
      item.classList.toggle('filter__item-legend--active');
    });
  });
})();

(function () {
  var body = document.querySelector('body');
  var filterButton = document.querySelector('.filter__button');
  var filterClose = document.querySelector('.filter__button-close');
  var filterPopup = document.querySelector('.filter__form');
  var modalOverlay = document.querySelector('.filter');

  if (filterPopup) {
    filterPopup.classList.remove('filter__form--nojs');
  }

  var onPopupEscPress = function (evt) {
    if (evt.key === 'Escape') {
      evt.preventDefault();
      closePopup(filterPopup, filterClose);
    }
  };

  var onButtonCloseClick = function (evt) {
    evt.preventDefault();
    closePopup(filterPopup, filterClose);
  };

  var openPopup = function (modalPopup, modalButtonClose) {
    modalPopup.classList.add('filter__form--modal');

    modalButtonClose.addEventListener('click', onButtonCloseClick);

    document.addEventListener('keydown', onPopupEscPress);

    body.classList.add('body-lock');

    modalOverlay.classList.add('filter--modal');
  };

  var closePopup = function (modalPopup, modalButtonClose) {
    modalPopup.classList.remove('filter__form--modal');

    modalButtonClose.removeEventListener('click', onButtonCloseClick);

    document.removeEventListener('keydown', onPopupEscPress);

    body.classList.remove('body-lock');

    modalOverlay.classList.remove('filter--modal');
  };

  if (filterButton) {
    filterButton.addEventListener('click', function (evt) {
      evt.preventDefault();
      openPopup(filterPopup, filterClose);
    });
  }
})();

(function () {
  var body = document.querySelector('body');
  var button = document.querySelector('.success__button-close');
  var overlay = document.querySelector('.overlay');
  var form = document.querySelector('.card__form');
  var popupSuccess = document.querySelector('.success');

  var URL = 'https://echo.htmlacademy.ru';
  var StatusCode = {
    OK: 200
  };

  var save = function (data, onLoad, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === StatusCode.OK) {
        onLoad(xhr.response);
      } else {
        onError('Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
      }
    });
    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });

    xhr.open('POST', URL);
    xhr.send(data);
  };

  var onSuccessPopupEscPress = function (evt) {
    if (evt.key === 'Escape') {
      evt.preventDefault();
      closeSuccessPopup();
    }
  };

  var onOutsideOfSuccessPopupClick = function (evt) {
    evt.preventDefault();
    closeSuccessPopup();
  };

  var onButtonSuccessClick = function (evt) {
    evt.preventDefault();
    closeSuccessPopup();
  };

  var openSuccessPopup = function () {
    popupSuccess.classList.add('modal--show');
    overlay.classList.add('overlay--show');

    overlay.addEventListener('click', onOutsideOfSuccessPopupClick);

    button.addEventListener('click', onButtonSuccessClick);

    document.addEventListener('keydown', onSuccessPopupEscPress);

    body.classList.add('body-lock');
  };

  var closeSuccessPopup = function () {
    popupSuccess.classList.remove('modal--show');
    overlay.classList.remove('overlay--show');

    overlay.removeEventListener('click', onOutsideOfSuccessPopupClick);

    button.removeEventListener('click', onButtonSuccessClick);

    document.removeEventListener('keydown', onSuccessPopupEscPress);

    body.classList.remove('body-lock');
  };

  if (form) {
    form.addEventListener('submit', function (evt) {
      save(new FormData(form), function () {
        openSuccessPopup();
      }, function () {
        console.log('неправильный ввод');
      });
      evt.preventDefault();
    });
  }
})();
