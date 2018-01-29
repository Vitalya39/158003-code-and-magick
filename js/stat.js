'use strict';

var CLOUD_X = 100;
var CLOUD_Y = 10;
var CLOUD_WIDTH = 420;
var CLOUD_HEIGHT = 270;
var GAP = 10;

var COL_WIDTH = 40;
var COL_MAX_HEIGHT = 150;
var COL_SPACE = 50;

var renderCloud = function (ctx, x, y, color) {
  ctx.fillStyle = 'rgba(0,0,0,0.7)';
  ctx.fillRect(x, y, CLOUD_WIDTH + GAP, CLOUD_HEIGHT + GAP);
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

var getRandomColor = function (players) {
  return players === 'Вы' ? 'rgba(255, 0, 0, 1)' : 'rgba(0,0,255, ' + Math.random() + ')';
};

window.renderStatistics = function (ctx, players, times) {
  renderCloud(ctx, CLOUD_X, CLOUD_Y, '#fff');

  ctx.fillStyle = '#000';
  ctx.font = '16px PT Mono';
  ctx.fillText('Ура, Вы победили!', CLOUD_X + GAP * 4, CLOUD_Y + GAP * 2);
  ctx.fillText('Список результатов: ', CLOUD_X + GAP * 4, CLOUD_Y + GAP * 4);

  var maxTime = getMaxElement(times);
  var colGap = COL_WIDTH + COL_SPACE;

  for (var i = 0; i < players.length; i++) {
    var colHeight = COL_MAX_HEIGHT * times[i] / maxTime;
    var xPosition = CLOUD_X + COL_SPACE + colGap * i;

    ctx.fillStyle = '#000';
    ctx.fillText(Math.round(times[i]), xPosition, CLOUD_Y + GAP * 6 + COL_MAX_HEIGHT - colHeight);

    ctx.fillStyle = getRandomColor(players[i]);
    ctx.fillRect(xPosition, CLOUD_Y + GAP * 7 + COL_MAX_HEIGHT - colHeight, COL_WIDTH, colHeight);

    ctx.fillStyle = '#000';
    ctx.fillText(players[i], xPosition, CLOUD_Y + GAP * 9 + COL_MAX_HEIGHT);
  }
};
