!function(){
	'use strict';

	var canvas = document.getElementById('myCanvas');

	if (canvas.getContext) {
		var ctx = canvas.getContext('2d');
	}
	var image = new Image();

	image.onload = function() {
	  var canvas = document.createElement('canvas');
	  canvas.width = image.width;
	  canvas.height = image.height;
	  canvas.getContext('2d').drawImage(image, 0, 0);
	  // 插入页面底部
	  document.body.appendChild(image);
	  return canvas;
	}

	image.src = 'image.png';
}(window)
