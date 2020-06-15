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
var MAX_OFFERS = 5;
var PIN_WIDTH = 50;
var PIN_HEIGHT = 70;

var map = document.querySelector('.map');
var mapPins = document.querySelector('.map__pins');

var createRandomValue = function (min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

var createRandomX = function (min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

var createRandomPrice = function (min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

var createRandomY = function (min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};


var createRandomRooms = function (min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};


var createRandomGuests = function (min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};


var createRandomType = function () {
  return TYPE_OF_HOUSING[Math.floor(Math.random() * TYPE_OF_HOUSING.length)];
};

var createCheckinTime = function () {
  return CHECKIN_PERIODS[Math.floor(Math.random() * CHECKIN_PERIODS.length)];
};


var createCheckoutTime = function () {
  return CHECKOUT_PERIODS[Math.floor(Math.random() * CHECKOUT_PERIODS.length)];
};

var createProperty = function () {
  return FEATURES[Math.floor(Math.random() * FEATURES.length)];
};


var createPhotos = function () {
  return PHOTOS[Math.floor(Math.random() * PHOTOS.length)];
};

var renderObject = function () {
  var avatarLocation = 'img/avatars/user0' + value + '.png';
  var value = createRandomValue(1, 8);
  var createObject = {
    author: {
      avatar: avatarLocation
    },
    offer: {
      title: HEADER + value,
      // address: location.x, location.y,
      price: createRandomPrice(MIN_PRICE, MAX_PRICE),
      type: createRandomType(),
      rooms: createRandomRooms(MIN_ROOMS, MAX_ROOMS),
      guests: createRandomGuests(MIN_GUESTS, MAX_GUESTS),
      checkin: createCheckinTime(),
      checkout: createCheckoutTime(),
      features: createProperty(),
      description: DESCRIPTION_TITLE + value,
      photos: createPhotos()
    },
    location: {
      x: createRandomX(MIN_COORDINATE_X, MAX_COORDINATE_X),
      y: createRandomY(MIN_COORDINATE_Y, MAX_COORDINATE_Y)
    }
  };
  return createObject;
};

var createPin = function (off) {
  var pinElem = document.querySelector('#pin').content.querySelector('.map__pin').cloneNode(true);
  var pinImg = pinElem.querySelector('img');
  var moveX = PIN_WIDTH / 2;
  var moveY = PIN_HEIGHT;

  pinElem.style.left = (off.location.x - moveX) + 'px';
  pinElem.style.top = (off.location.y - moveY) + 'px';
  pinImg.src = off.author.avatar;
  pinImg.alt = off.offer.title;
  return pinElem;
};

var fillArrayOffer = function () {
  var offers = [];
  for (var i = 1; i <= MAX_OFFERS; i++) {
    var offer = renderObject(i);
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
