'use strict';

var CLOUD_WIDTH = 420;
var CLOUD_HEIGHT = 270;
var CLOUD_X = 100;
var CLOUD_Y = 10;
var GAP = 10;
var FONT_GAP = 16;
var BAR_WIDTH = 40;
var BAR_HEIGHT = 150;
var BAR_GAP = 50;

var renderCloud = function (ctx, x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, CLOUD_WIDTH, CLOUD_HEIGHT);
};

var getMaxElement = function (arr) {
  var maxElement = arr[0];

  for (var i = 0; i < arr.length; i++) {
    if (arr[i] > maxElement) {
      maxElement = arr[i];
    }
  }

  return maxElement;
};

var getElementHeight = function (elementTime, maxTime) {

  return (BAR_HEIGHT * elementTime) / maxTime;
};

var getRandomFloat = function (min, max) {

  return Math.random() * (max - min) + min;
};

window.renderStatistics = function (ctx, names, times) {
  renderCloud(ctx, CLOUD_X + GAP, CLOUD_Y + GAP, 'rgba(0, 0, 0, 0.7)');
  renderCloud(ctx, CLOUD_X, CLOUD_Y, '#fff');

  ctx.fillStyle = '#000';
  ctx.font = '16px PT Mono';
  ctx.textBaseline = 'hanging';
  ctx.fillText('Ура Вы победили!', CLOUD_X + 2 * GAP, CLOUD_Y + 2 * GAP);
  ctx.fillText('Список результатов:', CLOUD_X + 2 * GAP, CLOUD_Y + 2 * GAP + FONT_GAP);

  var amountOfElements = Math.min(names.length, times.length);
  var maxTime = getMaxElement(times);
  var leftGap = (CLOUD_WIDTH - (amountOfElements * (BAR_WIDTH + BAR_GAP) - BAR_GAP)) / 2;

  for (var i = 0; i < amountOfElements; i++) {
    ctx.fillStyle = '#000';
    ctx.fillText(names[i], CLOUD_X + leftGap + (BAR_GAP + BAR_WIDTH) * i, CLOUD_Y + CLOUD_HEIGHT - GAP - FONT_GAP);
    ctx.fillText(Math.round(times[i]), CLOUD_X + leftGap + (BAR_GAP + BAR_WIDTH) * i, CLOUD_Y + CLOUD_HEIGHT - 2 * GAP - 2 * FONT_GAP - getElementHeight(times[i], maxTime));
    if (names[i] === 'Вы') {
      ctx.fillStyle = 'rgba(255, 0, 0, 1)';
    } else {

      ctx.fillStyle = 'rgba(0, 0, 255, ' + getRandomFloat(0.1, 1) + ')';
    }

    ctx.fillRect(CLOUD_X + leftGap + (BAR_GAP + BAR_WIDTH) * i, CLOUD_Y + CLOUD_HEIGHT - 2 * GAP - FONT_GAP - getElementHeight(times[i], maxTime), BAR_WIDTH, getElementHeight(times[i], maxTime));
  }
};
