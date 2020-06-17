'use strict';
var HEADER = 'Заголовок предложения №';
var TYPE_OF_HOUSING = ['place', 'flat', 'house', 'bungalo'];
var CHECKIN_PERIODS = ['12:00', '13:00', '14:00'];
var CHECKOUT_PERIODS = ['12:00', '13:00', '14:00'];
var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var DESCRIPTION_TITLE = 'Описание предложения №';
var PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
var MIN_COORDINATE_X = 0;
var MAX_COORDINATE_X = 1200;
var MIN_COORDINATE_Y = 130;
var MAX_COORDINATE_Y = 630;
var MIN_PRICE = 0;
var MAX_PRICE = 10000;
var MIN_ROOMS = 1;
var MAX_ROOMS = 10;
var MIN_GUESTS = 1;
var MAX_GUESTS = 20;
var MAX_OFFERS = 8;
var PIN_WIDTH = 50;
var PIN_HEIGHT = 70;

var map = document.querySelector('.map');
var mapPins = document.querySelector('.map__pins');

var createRandomValue = function (min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

var getRandomArr = function (array) {
  return array[Math.floor(Math.random() * array.length)];
};


var createObject = function (index) {
  var avatarAddress = 'img/avatars/user0' + index + '.png';
  var createOffer = {
    author: {
      avatar: avatarAddress
    },
    offer: {
      title: HEADER + index,
      address: createRandomValue(location.x) + ', ' + createRandomValue(location.y),
      price: createRandomValue(MIN_PRICE, MAX_PRICE),
      type: getRandomArr(TYPE_OF_HOUSING),
      rooms: createRandomValue(MIN_ROOMS, MAX_ROOMS),
      guests: createRandomValue(MIN_GUESTS, MAX_GUESTS),
      checkin: getRandomArr(CHECKIN_PERIODS),
      checkout: getRandomArr(CHECKOUT_PERIODS),
      features: getRandomArr(FEATURES),
      description: DESCRIPTION_TITLE + index,
      photos: getRandomArr(PHOTOS)
    },
    location: {
      x: createRandomValue(MIN_COORDINATE_X, MAX_COORDINATE_X),
      y: createRandomValue(MIN_COORDINATE_Y, MAX_COORDINATE_Y)
    }
  };
  return createOffer;
};

var createPin = function (obj) {
  var pinElem = document.querySelector('#pin').content.querySelector('.map__pin').cloneNode(true);
  var pinImg = pinElem.querySelector('img');
  var moveX = PIN_WIDTH / 2;
  var moveY = PIN_HEIGHT;

  pinElem.style.left = (obj.location.x - moveX) + 'px';
  pinElem.style.top = (obj.location.y - moveY) + 'px';
  pinImg.src = obj.author.avatar;
  pinImg.alt = obj.offer.title;
  return pinElem;
};

var fillArrayOffer = function () {
  var offers = [];
  for (var i = 0; i <= MAX_OFFERS; i++) {
    var offer = createObject(i);
    offers.push(offer);
  }
  return offers;
};

var renderPinList = function (array) {
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < array.length; i++) {
    fragment.appendChild(createPin(array[i]));
  }
  mapPins.appendChild(fragment);
};

map.classList.remove('map--faded');
renderPinList(fillArrayOffer());
