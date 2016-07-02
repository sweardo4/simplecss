! function($, window) {

  //禁用拖动时屏幕晃动
  function delDrivemove() {
    document.body.addEventListener('touchmove', function(event) {
      event.preventDefault();
    }, false);
  }

  // 兼容性处理

  function getObjectURL(file) {
    var url = null;
    if (window.createObjectURL != undefined) { // basic
      url = window.createObjectURL(file);
    } else if (window.URL != undefined) { // mozilla(firefox)
      url = window.URL.createObjectURL(file);
    } else if (window.webkitURL != undefined) { // webkit or chrome
      url = window.webkitURL.createObjectURL(file);
    }
    return url;
  }

  function html5Reader(file) {
    var fileObj = file.files,
      ulObj = document.createElement('ul');
    if (fileObj) {
      for (var i = 0; i < fileObj.length; i++) {
        var imgObj = document.createElement('img'),
          liObj = document.createElement('li');
        $(imgObj).attr('src', getObjectURL(fileObj[i]));
        $(imgObj).appendTo($(liObj))
        $(liObj).appendTo($(ulObj));
      }
      $(ulObj).appendTo($('.img-group'));
    }
    var ObjChange = {
      'width': function() {
        return '200px'
      },
    }
    $('.picture').velocity({
      'margin-left': '100vw',
    }, {
      "easing": "ease-in-out",
      "duration": 200
    });
    // 添加隐藏
    var winWith = window.document.body.offsetWidth,
      winHeight = window.document.body.offsetHeight,
      withArr = [],
      heightArr = [],
      iconfHeight = 400; //预设图片高度所在位置


    setTimeout(function() {
      $('.picture').css('display', 'none')
      $('.img-group').find('li').each(function() {
        var temp = ($(this).css('width').slice(0, -1) / 100) * winWith

        //不让图片重叠
        if (withArr) {
          var liWith = Math.random() * (winWith - temp);
          for (var i = 0; i < withArr.length; i++) {
            console.log(liWith)
            while (withArr[i] == liWith) {
              liWith = Math.random() * (winWith - temp);
            }
          }
        } else {
          var liWith = Math.random() * (winWith - $(this).css('width') * winWith);
        }
        if (heightArr) {
          var liHeight = Math.random() * iconfHeight;
          for (var i = 0; i < heightArr.length; i++) {
            while (heightArr[i] == liHeight) {
              liHeight = Math.random() * iconfHeight;
            }
          }
        } else {
          var liHeight = Math.random() * iconfHeight;
        }
        //end
        withArr.push(liWith);
        heightArr.push(liHeight);
        console.log(withArr)
        $(this).offset({
          left: liWith,
          top: liHeight
        });
      })
      $('.img-group').show(function() {})
    }, 1000)
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

  delDrivemove();
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
        To.stopAll();
        initScale = el.scaleX;
      },
      rotate: function(evt) {
        el.rotateZ += evt.angle;
      },
      pinch: function(evt) {
        el.scaleX = el.scaleY = initScale * evt.scale;
      },
      multipointEnd: function() {
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
        el.translateX += evt.deltaX;
        el.translateY += evt.deltaY;
      },
      doubleTap: function(evt) {
        $(el).closest('li').velocity({
          padding: 0
        }, {
          "easing": "ease-in-out",
          "duration": 200
        });
      },

      tap: function(evt) {},
      longTap: function(evt) {
        $(el).velocity({
          'padding': '0',
        }, {
          "easing": "ease-in-out",
          "duration": 200
        });
      },
      swipe: function(evt) {}

    });

  }

}(jQuery, window)
