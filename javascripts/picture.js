! function($) {

  'use strict';
  // 兼容性处理
  function getObjectURL(file) {
    var url = null;
    if (window.createObjectURL != undefined) { // basic
      url = window.createObjectURL(file);
    } else if (window.URL != undefined) { // mozilla(firefox)
      // console.log(file)
      url = window.URL.createObjectURL(file);
    } else if (window.webkitURL != undefined) { // webkit or chrome
      url = window.webkitURL.createObjectURL(file);
    }
    return url;
  }

  function html5Reader(file) {
    var fileObj = file.files,
      ulObj = document.createElement('ul'),
      liObj = document.createElement('li');
    if (fileObj) {
      for (var i = 0; i < fileObj.length; i++) {
        var imgObj = document.createElement('img');
        $(imgObj).attr('src', getObjectURL(fileObj[i]));
        $(imgObj).appendTo($(liObj))
      }
      $(imgObj).appendTo($(liObj));
      $(liObj).appendTo($(ulObj));
      $(ulObj).appendTo($('.img-group'));
    }
    $('img').velocity({
      width: '100%'
    }, 200);
    $('.picture').velocity({
      marginTop: '2vh',
      marginLeft: '80vw'
    }, {
      "easing": "ease-in-out",
      "duration": 200
    });
    return fileObj;
  }


  function imageLoaded(selector, onload) {
    for (var i = 0; i < selector.length; i++) {

      (function() {
        var img = new Image();
        var dom = selector[i];
        img.onload = function() {
          //real_width,real_height
          onload.call(dom, this.width, this.height);
          img.onload = null;
          img = null;
        };
        img.src = $(dom).attr("src");

      })(i)

    }

  }

  function ease(x) {
    return Math.sqrt(1 - Math.pow(x - 1, 2));
  }


  $('#picture').on('change', function(e) {
    var ua = navigator.userAgent.toLowerCase(),
      img = document.getElementById("img"),
      $this = $(this);
    var ext = $this[0].value.substring($this[0].value.lastIndexOf(".") + 1).toLowerCase();
    // gif在IE浏览器暂时无法显示
    if (ext != 'png' && ext != 'jpg' && ext != 'jpeg' && ext != '') {
      alert("不支持" + ext + '文件');
      return;
    }

    html5Reader($this[0]);

    var topPx;

    imageLoaded($("img"), function(w, h) {
      $(this).css('display', 'block');
      topPx = window.innerHeight / 2 - (h * window.innerWidth / w) / 2;
      $(this).css('top', topPx + "px");

      Transform($(this)[0]);
      touchAddHandle($(this)[0], topPx);

    });
  })


  // 手势定义

  function touchAddHandle(el, topPx) {
    var initScale = 1;
    new AlloyFinger(el, {
      multipointStart: function() {
        console.log('multipointStart');
        To.stopAll();
        initScale = el.scaleX;
      },
      rotate: function(evt) {
        console.log('rotate')
        el.rotateZ += evt.angle;
      },
      pinch: function(evt) {
        alert('pinch')
        el.scaleX = el.scaleY = initScale * evt.scale;
      },
      multipointEnd: function() {
        console.log('multipointEnd')
        To.stopAll();
        if (el.scaleX < 1) {

          new To(el, "scaleX", 1, 500, ease);
          new To(el, "scaleY", 1, 500, ease);
        }
        if (el.scaleX > 2) {

          new To(el, "scaleX", 2, 500, ease);
          new To(el, "scaleY", 2, 500, ease);
        }
        var rotation = el.rotateZ % 360;

        if (rotation < 0) rotation = 360 + rotation;
        el.rotateZ = rotation;

        if (rotation > 0 && rotation < 45) {
          new To(el, "rotateZ", 0, 500, ease);
        } else if (rotation >= 315) {
          new To(el, "rotateZ", 360, 500, ease);
        } else if (rotation >= 45 && rotation < 135) {
          new To(el, "rotateZ", 90, 500, ease);
        } else if (rotation >= 135 && rotation < 225) {
          new To(el, "rotateZ", 180, 500, ease);
        } else if (rotation >= 225 && rotation < 315) {
          new To(el, "rotateZ", 270, 500, ease);
        }
      },
      pressMove: function(evt) {
        alert('pressMove');
        el.translateX += evt.deltaX;
        el.translateY += evt.deltaY;
      },
      tap: function(evt) {
        console.log(el.scaleX + "_" + el.scaleY + "_" + el.rotateZ + "_" + el.translateX + "_" + el.translateY);
        alert("tap");
      },
      doubleTap: function(evt) {
        alert('doubleTap')
        To.stopAll();
        if (el.scaleX > 1.5) {
          new To(el, "scaleX", 1, 500, ease);
          new To(el, "scaleY", 1, 500, ease);
          new To(el, "translateX", 0, 500, ease);
          new To(el, "translateY", 0, 500, ease);
        } else {
          var box = el.getBoundingClientRect();
          var y = box.height - ((evt.changedTouches[0].pageY - topPx) * 2) - (box.height / 2 - (evt.changedTouches[0].pageY - topPx));

          var x = box.width - ((evt.changedTouches[0].pageX) * 2) - (box.width / 2 - (evt.changedTouches[0].pageX));
          new To(el, "scaleX", 2, 500, ease);
          new To(el, "scaleY", 2, 500, ease);
          new To(el, "translateX", x, 500, ease);
          new To(el, "translateY", y, 500, ease);
        }
        //console.log("doubleTap");
      },
      longTap: function(evt) {
        alert("longTap");

      },
      swipe: function(evt) {
        aler("swipe" + evt.direction);
      }
    });
  }


}(jQuery)
