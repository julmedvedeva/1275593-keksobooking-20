'use strict';
var map = document.querySelector('.map');

var header = 'Заголовок предложения №';
var typeOfHouse = ['place', 'flat', 'house', 'bungalo'];
var checkinTime = ['12:00', '13:00', '14:00'];
var checkoutTime = ['12:00', '13:00', '14:00'];
var property = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var describe = 'Описание предложения №';
var arrayPhotos = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
var minCoordinateX = 0;
var maxCoordinateX = 1200;
var minCoordinateY = 130;
var maxCoordinateY = 630;
var minPrice = 0;
var maxPrice = 10000;
var minRooms = 1;
var maxRooms = 10;
var minGuests = 1;
var maxGuests = 20;
var pinWidth = 25;
var pinHeight = 60;

var createRandomValue = function (min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};
var value = createRandomValue(1, 8);
var createRandomX = function (min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};
createRandomX(minCoordinateX, maxCoordinateX);

var createRandomPrice = function (min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};
createRandomPrice(minPrice, maxPrice);

var createRandomY = function (min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};
createRandomY(minCoordinateY, maxCoordinateY);

var createRandomRooms = function (min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};
createRandomRooms(minRooms, maxRooms);

var createRandomGuests = function (min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};
createRandomGuests(minGuests, maxGuests);

var createRandomType = function () {
  return typeOfHouse[Math.floor(Math.random() * typeOfHouse.length)];
};
createRandomType();

var createCheckinTime = function () {
  return checkinTime[Math.floor(Math.random() * checkinTime.length)];
};
createCheckinTime();

var createCheckoutTime = function () {
  return checkoutTime[Math.floor(Math.random() * checkoutTime.length)];
};
createCheckoutTime();

var createProperty = function () {
  return property[Math.floor(Math.random() * property.length)];
};
createProperty();

var createPhotos = function () {
  return arrayPhotos[Math.floor(Math.random() * arrayPhotos.length)];
};
createPhotos();

var avatarLocation = 'img/avatars/user0' + value + '.png';

var renderObject = function () {
  var createObject = {
    author: {
      avatar: avatarLocation
    },
    offer: {
      title: header + value,
      address: location.x, location.y,
      price: createRandomPrice(minPrice, maxPrice),
      type: createRandomType(),
      rooms: createRandomRooms(minRooms, maxRooms),
      guests: createRandomGuests(minGuests, maxGuests),
      checkin: createCheckinTime(),
      checkout: createCheckoutTime(),
      features: createProperty(),
      description: describe + value,
      photos: createPhotos()
    },
    location: {
      x: createRandomX(minCoordinateX, maxCoordinateX),
      y: createRandomY(minCoordinateY, maxCoordinateY)
    }
  };
  return createObject;
};

var createPin = function () {
  var pinElem = document.querySelector('#pin').content.querySelector('.map__pin').cloneNode(true);
  var pinImg = pinElem.querySelector('img');
  pinImg.src = author.avatar;
  pinImg.alt = offer.title;
  return pinElem;
};


map.classList.remove('map--faded');
