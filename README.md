# learn
临摹各大网站首页信息
以及在这其中遇到的一些文题


### js code

clientHeight  position
```js
    var newClientHeight  = document.body.clientHeight;
    function addPosition(classArr,pos){
        classArr.forEach(function(e){
             console.log(e);
            $(e).css('position',pos)
     })

    }
```


ajax
```js
$.ajax({
  url:'myurl',//url address
  type:'POST',//GET,PUT,DETETE...
  data:{},// will send  data , maybe this's object
  dataType:'json',//xml text json jsonp html
  async:false,//default false  setting this true 'Synchronize'  ‘同步’and'异步'
  cache:true,//设置为 false 将不会从浏览器缓存中加载请求信息。
  contentType:'',//(默认: "application/x-www-form-urlencoded") 发送信息至服务器时内容编码类型
  timeout:number,//设置请求超时的毫秒值。
  beforeSend:callback,
  complete:callback,//请求完成后回调函数 (请求成功或失败时均调用)
  success:callback,//请求成功后回调函数。这个方法有两个参数：服务器返回数据，返回状态
  error:callback,// 请求失败时将调用此方法。这个方法有三个参数：XMLHttpRequest 对象，错误信息，（可能）捕获的错误对象。
})
```
