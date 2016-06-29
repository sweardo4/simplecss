! function($) {
  // 图片转base64格式

  function renderBase64(files,callback){
    var len = files.length;
    var arr = [];
    var filerender = typeof(FileReader);
    if (len > 1 && !(filerender === 'undefined')) {
      $(files).each(function(){
        var file = $(this)[0]
        if (!/image\/\w+/.test(file.type)) {
          alert("请确保文件为图像类型");
          return false;
        }
        var reader = new FileReader();
        reader.readAsDataURL(file)
        reader.onload = function() {
          arr.push(reader.result);
        }
      })
    }
    console.log(arr)
  }
  $('#myFiles').on('change', function(){
    renderBase64($(this)[0].files)
  })
}(jQuery)
