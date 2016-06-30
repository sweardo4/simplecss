! function($) {

  function html5Reader(file,base64) {
    var fileObj = file;
    // console.log(fileObj)
    // console.log(base64);
    ulObj = document.createElement('ul');
    if (fileObj) {
      for (var i = 0; i < fileObj.length; i++) {
        var imgObj = document.createElement('img'),
        liObj = document.createElement('li');
        $(imgObj).attr('src',base64);
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
    setTimeout(function() {
      $('.picture').css('display', 'none')
      $('.img-group').show(function() {})
      $('img').velocity(ObjChange, 200);
    }, 1000)
    return fileObj;
  }



  // 图片转base64格式

  function renderBase64(files,callback){
    var len = files.length;
    var thatfiles = files;
    var filerender = typeof(FileReader);
    var file = files[0]
    if (!/image\/\w+/.test(file.type)) {
      alert("请确保文件为图像类型");
      return false;
    }
    var reader = new FileReader();
    reader.readAsDataURL(file)
    reader.onload = function() {
      callback(thatfiles,reader.result);

    }
  }


  $('#myFiles').on('change', function(){
    // console.log($(this)[0].files);
    renderBase64($(this)[0].files,function(thatfiles,result){
      // console.log(thatfiles)
      // console.log(result)
      html5Reader(thatfiles,result)

    })
  })
}(jQuery)
