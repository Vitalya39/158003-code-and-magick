'use strict';

var CLOUD_WIDTH = 420;
var CLOUD_HEIGHT = 270;
var GAP = 10;
var CLOUD_X = 100;
var CLOUD_Y = 10;

var COL_MAX_HEIGHT = 150;
var COL_WIDTH = 40;
var COL_DISTANCE = 50;
var COL_START = 250;

var TEXT_FONT = '16px PT Mono';
var TEXT_COLOR = '#000';
var YOU = 'Вы';

var renderCloud = function (ctx, x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, CLOUD_WIDTH, CLOUD_HEIGHT);
};


window.renderStatistics = function (ctx, names, times) {
  renderCloud(ctx, CLOUD_X + GAP, CLOUD_Y + GAP, 'rgba(0, 0 , 0 ,0.7)');
  renderCloud(ctx, CLOUD_X, CLOUD_Y, '#fff');

  ctx.font = TEXT_FONT;
  ctx.fillStyle = TEXT_COLOR;
  ctx.fillText('Ура, вы победили!', CLOUD_X + 40, CLOUD_Y + 30);
  ctx.fillText('Список результатов:', CLOUD_X + 40, CLOUD_Y + 50);

  var bestTime = times[0];
  for (var i = 0; i < times.length; i++) {
    if (times[i] > bestTime) {
      bestTime = times[i];
    }
  }

  for (var j = 0; j < names.length; j++) {
    if (names[j] === YOU) {
      ctx.fillStyle = 'rgba(255, 0, 0, 1)';
    } else {
      ctx.fillStyle = 'rgba(0, 0, 255, ' + Math.random() + ')';
    }

    var colHeight = -Math.round(COL_MAX_HEIGHT * times[j] / bestTime);
    ctx.fillRect(CLOUD_X + COL_WIDTH + (COL_WIDTH + COL_DISTANCE) * j,
    COL_START - CLOUD_Y, COL_WIDTH, colHeight);
    ctx.fillStyle = TEXT_COLOR;
    ctx.fillText(Math.round(times[j]),
    CLOUD_X + COL_WIDTH + (COL_WIDTH + COL_DISTANCE) * j, COL_START - CLOUD_Y * 2 + colHeight);
    ctx.fillText(names[j], CLOUD_X + COL_WIDTH + (COL_WIDTH + COL_DISTANCE) * j,
     COL_START + CLOUD_Y);
  }
};
