// index.ts
// 获取应用实例
Page({

  /**
   * 页面的初始数据
   */
  data: {
    region:['福建省','福州市','闽侯县'],
    now:{
      temp:0,
      text:'未知',
      icon:'999',
      hunidity:0,
      pressure:0,
      vis:0,
      windDir:'未知',
      windSpeed:0,
      windScale:0
    }
  },

  changeRegion:function(e){
    this.setData({
      region:e.detail.value
    })
    this.getWeather();//更新天气，调用函数
  },


 getWeather:function(){
    var that = this;/*定义一个变量 var定义局部变量 let是块级的 
    this不能直接在vxAPI函数内部使用*/

    wx.request({
      url:'https://geoapi.qweather.com/v2/city/lookup',
      data:{
        location:that.data.region[1],
        adm:that.data.region[1],
        key:'e9091c0643e3496fb317f9269bdbabf9'
      },
      success:function(res){
        console.log(res.data);
        that.getinfo(res.data.location[0].id);
      }
    })
  },

  getinfo:function(id){
    var that = this;

    wx.request({
      url: 'https://devapi.qweather.com/v7/weather/now',
      data:{
        location:id,
        key:'e9091c0643e3496fb317f9269bdbabf9'
      },

      success:function(res){
        console.log(res.data);//控制台输出
        that.setData({now:res.data.now});//更新now的值
      },
    })
  },


  
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getWeather();
  }

  
})