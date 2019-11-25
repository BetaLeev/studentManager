// $api.addEvt($api.dom('.aui-icon-left'), 'click',closeCurrentWin());

function closeCurrentWin(name) {
    api.closeWin({
        name: name || api.winName
    });
    return
}

function goNextWin(path) {
    if (path) {
        api.openWin({
            name: path,
            url: path,
            pageParam: {
                name: 'test'
            }
        });
        return
    } else {
        return
    }

}


function showMoreCity() {
    var UICityList = api.require('UICityList');
    UICityList.open({
        rect: {
            x: 0,
            y: 25,
            w: api.frameWidth,
            h: api.frameHeight
        },
        resource: 'widget://json/uicitylist.json',
        styles: {
            searchBar: {
                bgColor: '#696969',
                cancelColor: '#E3E3E3'
            },
            location: {
                color: '#696969',
                size: 12
            },
            sectionTitle: {
                bgColor: '#eee',
                color: '#000',
                size: 12
            },
            item: {
                bgColor: '#fff',
                activeBgColor: '#696969',
                color: '#000',
                size: 14,
                height: 40
            },
            indicator: {
                bgColor: '#fff',
                color: '#696969'
            }
        },
        currentCity: '北京',
        locationWay: 'GPS',
        hotTitle: '热门城市',
        fixedOn: api.frameName,
        placeholder: '输入城市名或首字母查询'
    }, function(ret, err) {
        if (ret.eventType == 'selected') {
            var city = ret.cityInfo.city;
            $api.text($api.byId('currentCity'), city)
            UICityList.close()
        }

    });
}

// 初始化百度地图
function initMap(y) {
    var map = api.require('bMap');
    map.open({
        rect: {
            x: 0,
            y: y,
            w: api.frameWidth,
            h: 210
        },
        center: {
            lon: 116.293468,
            lat: 39.837832
        },
        fixed: false,
        zoomLevel: 14,
        showUserLocation: true,
    })
    map.setMapAttr({
        scrollEnable: false,
    });

    map.addEventListener({
        name: 'click'
    }, function(ret) {
        if (ret.status) {
            api.openFrame({
                name: '抽屉菜单',
                url: './frame/draw_menu.html',
                rect: {
                    x: 0,
                    y: 355,
                    h: 400
                },
            });
        }
    });

}

function cancleDrawMenu() {
    api.closeFrame({
        url: './frame/draw_menu.html',
    });

}

//打开百度地图
function open_bmap(dname, lng, lat) {
    var uri = 'baidumap://map/direction?destination=name:' + dname + '|latlng:' + lat + ',' + lng + '&mode=driving&src=andr.cheyw';
    api.openApp({
        uri: uri,
        iosUrl: uri
    }, function(ret, err) {
        console.log(JSON.stringify(err))
        if (err.msg == "Application not installed" || err.msg == "未找到可执行的应用") {
            alert("请先安装百度地图");
        }
    });
}

//打开高德地图
function open_gdmap(dname, lng, lat) {
    var uri = 'amapuri://route/plan/?dlat=' + lat + '&dlon=' + lng + '&dname=' + dname + '&dev=0&t=0';
    var iosUrl = 'iosamap://path?sourceApplication=cheyw&dlat=' + lat + '&dlon=' + lng + '&dname=' + dname + '&dev=0&t=0';
    api.openApp({
        uri: uri,
        iosUrl: iosUrl
    }, function(ret, err) {
        console.log(JSON.stringify(err))
        if (err.msg == "Application not installed" || err.msg == "未找到可执行的应用") {
            alert("请先安装高德地图");
        }
    });
}

//打开苹果地图
function open_pmap(dname, lng, lat) {
    var uri = 'http://maps.apple.com/?q=' + dname + '&daddr=' + lat + ',' + lng + '';
    api.openApp({
        uri: uri,
        iosUrl: uri
    }, function(ret, err) {
        console.log(JSON.stringify(ret))
        console.log(JSON.stringify(err))
    });
}

// if(api.systemType == "ios") {
//        $("#apple").click(function () {
//             var bd = bd_decrypt(lng, lat);
//            open_pmap(dname, bd.lng, bd.lat);
//        })
//    }else{
//      $("#apple").hide();
//    }

//百度坐标转高德（传入经度、纬度）
function bd_decrypt(bd_lng, bd_lat) {
    var X_PI = Math.PI * 3000.0 / 180.0;
    var x = bd_lng - 0.0065;
    var y = bd_lat - 0.006;
    var z = Math.sqrt(x * x + y * y) - 0.00002 * Math.sin(y * X_PI);
    var theta = Math.atan2(y, x) - 0.000003 * Math.cos(x * X_PI);
    var gg_lng = z * Math.cos(theta);
    var gg_lat = z * Math.sin(theta);
    return {
        lng: gg_lng,
        lat: gg_lat
    }
}
//高德坐标转百度（传入经度、纬度）
function bd_encrypt(gg_lng, gg_lat) {
    var X_PI = Math.PI * 3000.0 / 180.0;
    var x = gg_lng,
        y = gg_lat;
    var z = Math.sqrt(x * x + y * y) + 0.00002 * Math.sin(y * X_PI);
    var theta = Math.atan2(y, x) + 0.000003 * Math.cos(x * X_PI);
    var bd_lng = z * Math.cos(theta) + 0.0065;
    var bd_lat = z * Math.sin(theta) + 0.006;
    return {
        bd_lat: bd_lat,
        bd_lng: bd_lng
    }
}

function setAnnotations() {
    var map = api.require('bMap');
    map.addAnnotations({
        annotations: [{
            id: 1,
            lon: 116.293468,
            lat: 39.837832
        }, {
            id: 2,
            lon: 116.61531558033901,
            lat: 39.892147754799296
        }, {
            id: 3,
            lon: 116.30828249143899,
            lat: 39.837845935836064
        }, {
            id: 4,
            lon: 116.50733270939249,
            lat: 39.811230186220655
        }],
        icon: 'widget://image/blue-star-empty.png',
    }, function(ret) {
        if (ret) {
            alert(ret.id);
        }
    });




    map.popupBubble({
        id: 1,
    });

    map.popupBubble({
        id: 1,
    });

    map.popupBubble({
        id: 1,
    });

    map.popupBubble({
        id: 1,
    });


    map.setBubble({
        id: 1,
        bgImg: 'widget://image/blue-star.png',
        rect: {
            x: 1,
            y: 10,
            w: 35,
            h: 50
        },
        content: {
            title: '时代工场',
            illus: 'http://ico.ooopic.com/ajax/iconpng/?id=145044.png'
        },
        styles: {
            titleColor: '#FF0000',
            titleSize: 6,
            // subTitleColor: '#999',
            // subTitleSize: 12,
            illusAlign: 'left'
        }
    }, function(ret) {
        if (ret) {
            alert(JSON.stringify(ret));
        }
    });

    map.setBubble({
        id: 2,
        bgImg: 'widget://image/blue-star.png',
        rect: {
            x: 1,
            y: 10,
            w: 35,
            h: 50
        },
        content: {
            title: '时代工场',
            illus: 'http://ico.ooopic.com/ajax/iconpng/?id=145044.png'
        },
        styles: {
            titleColor: '#FF0000',
            titleSize: 16,
            // subTitleColor: '#999',
            // subTitleSize: 12,
            illusAlign: 'left'
        }
    }, function(ret) {
        if (ret) {
            alert(JSON.stringify(ret));
        }
    });

    map.setBubble({
        id: 3,
        bgImg: 'widget://image/blue-star.png',
        rect: {
            x: 1,
            y: 10,
            w: 35,
            h: 50
        },
        content: {
            title: '时代工场',
            illus: 'http://ico.ooopic.com/ajax/iconpng/?id=145044.png'
        },
        styles: {
            titleColor: '#FF0000',
            titleSize: 16,
            // subTitleColor: '#999',
            // subTitleSize: 12,
            illusAlign: 'left'
        }
    }, function(ret) {
        if (ret) {
            alert(JSON.stringify(ret));
        }
    });

    map.setBubble({
        id: 4,
        bgImg: 'widget://image/blue-star.png',
        rect: {
            x: 1,
            y: 10,
            w: 35,
            h: 50
        },
        content: {
            title: '时代工场',
            illus: 'http://ico.ooopic.com/ajax/iconpng/?id=145044.png'
        },
        styles: {
            titleColor: '#FF0000',
            titleSize: 16,

            illusAlign: 'left'
        }
    }, function(ret) {
        if (ret) {
            alert(JSON.stringify(ret));
        }
    });
}



// 支付部分
// 微信支付
function wxPay(){
  var wxPayPlus = api.require('wxPayPlus');
  wxPayPlus.payOrder({
      apiKey: '',
      orderId: '',
      mchId: '',
      nonceStr: '',
      timeStamp: '',
      package: '',
      sign: ''
  }, function(ret, err) {
      if (ret.status) {
          //支付成功
      } else {
          alert(err.code);
      }
  });
}

// 阿里支付
function aliPay() {
    var aliPayPlus = api.require('aliPayPlus');
    aliPayPlus.payOrder({
        orderInfo: 'app_id=2015052600090779&biz_content=%7B%22timeout_express%22%3A%2230m%22%2C%22seller_id%22%3A%22%22%2C%22product_code%22%3A%22QUICK_MSECURITY_PAY%22%2C%22total_amount%22%3A%220.01%22%2C%22subject%22%3A%221%22%2C%22body%22%3A%22%E6%88%91%E6%98%AF%E6%B5%8B%E8%AF%95%E6%95%B0%E6%8D%AE%22%2C%22out_trade_no%22%3A%22IQJZSRC1YMQB5HU%22%7D&charset=utf-8&format=json&method=alipay.trade.app.pay&notify_url=http%3A%2F%2Fdomain.merchant.com%2Fpayment_notify&sign_type=RSA2&timestamp=2016-08-25%2020%3A26%3A31&version=1.0&sign=cYmuUnKi5QdBsoZEAbMXVMmRWjsuUj%2By48A2DvWAVVBuYkiBj13CFDHu2vZQvmOfkjE0YqCUQE04kqm9Xg3tIX8tPeIGIFtsIyp%2FM45w1ZsDOiduBbduGfRo1XRsvAyVAv2hCrBLLrDI5Vi7uZZ77Lo5J0PpUUWwyQGt0M4cj8g%3D'
    }, function(ret, err) {
        api.alert({
            title: '支付结果',
            msg: ret.code,
            buttons: ['确定']
        });
    });
}




// var loadingLabel = api.require('loadingLabel');
// loadingLabel.open(function(ret, err) {
// if (ret) {
//   alert(JSON.stringify(ret));
// } else {
//   alert(JSON.stringify(err));
// }


function wxShare() {
  var wxPlus = api.require('wxPlus');
  wxPlus.isInstalled(function(ret, err) {
      if (ret.installed) {
          alert("当前设备已安装微信客户端");
      } else {
          alert('当前设备未安装微信客户端');
      }
  });
wxShareText()
}

function wxShareText(){
  var wxPlus = api.require('wxPlus');
wxPlus.shareText({
    apiKey: '',
    scene: 'timeline',
    text: '我分享的文本'
}, function(ret, err) {
    if (ret.status) {
        alert('分享成功');
    } else {
        alert(err.code);
    }
});
}

function wxShareImg(){
  var wxPlus = api.require('wxPlus');
wxPlus.shareImage({
    apiKey: '',
    scene: 'session',
    thumb: 'widget://a.jpg',
    contentUrl: 'widget://b.jpg'
}, function(ret, err) {
    if (ret.status) {
        alert('分享成功');
    } else {
        alert(err.code);
    }
});
}

function wxAuthLogin(){
  var wxPlus = api.require('wxPlus');
wxPlus.auth({
    apiKey: ''
}, function(ret, err) {
    if (ret.status) {
        alert(JSON.stringify(ret));
    } else {
        alert(err.code);
    }
});
}

function getWxToken(){
  var wxPlus = api.require('wxPlus');
wxPlus.getToken({
    apiKey: '',
    apiSecret: '',
    code: "12346857684"
}, function(ret, err) {
    if (ret.status) {
        alert(JSON.stringify(ret));
    } else {
        alert(err.code);
    }
});
}

function wechatLogin(){
  var wxPlus = api.require('wxPlus');
wxPlus.auth({
    apiKey: 'wxf476d7072eeddaae'
}, function(ret, err) {
    if (ret.status) {
        alert(JSON.stringify(ret));
    } else {
        alert(err.code);
    }
});
}
