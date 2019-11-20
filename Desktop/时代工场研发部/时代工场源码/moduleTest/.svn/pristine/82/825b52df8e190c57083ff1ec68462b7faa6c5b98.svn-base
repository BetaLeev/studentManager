var isAndroid = (/android/gi).test(navigator.appVersion);

var statusBarHeight = 0;
window.onload = function(){
	var el = $('header');
	if(!el){
		return;
	}
	if(!isAndroid){//ios沉浸式
		statusBarHeight = 20;
		el.style.paddingTop = '20px';
		return;
	}
	var u = navigator.userAgent;
	var ver = parseFloat(u.substr(u.indexOf('Android') + 8, 3));
    if(ver >= 4.4){//android沉浸式
    	statusBarHeight = 25;
        el.style.paddingTop = '25px';
    }
    if(window.domReady){
		domReady();
	}
}

function $(id){
	return document.getElementById(id);
}
/**打开window
	url：打开window将加载的url
	name：window的名称
	ott：api.openWin中支持的其他参数
**/
function GotoWin(_url, name, ott){
	if(!_url){
		return;
	}
	if(!name){
		name = _url;
	}
	var args = {
		name:name, 
		url:_url,
		pageParam:{
			key:'value',
			key1:'value1'
		}
	}
	if(ott){
		for(var i in ott){
			args[i] = ott[i];
		}
	}
	api.openWin(args);
}
//window + frame窗口结构中，打开content区域所在的frame
function openContent(_url, fname, frect){
	if(!_url){
		return;
	}
	var fn = fname ? fname : 'content_frm';
	var fr = {};//frame所在的rect区域
	if(frect){
		fr = frect;
	}else{
		var headerH = 44;//header高度为api.css样式中声明的44px
		var footerH = 30;//footer高度为api.css样式中声明的30px
		fr.marginTop = headerH + statusBarHeight
		fr.marginBottom = footerH;
	}
    api.openFrame({
        name: fn,
        url: _url,
        bounces: false,
        rect: fr,
        overScrollMode:'scrolls'
    });
}
//当前系统时间戳，毫秒
function curtime(){
	return new Date().getTime();
}

function apialert(_msg, callback){
	api.alert({
	    title: '提示',
	    msg: _msg,
	}, function(ret, err) {
		if(callback){
			callback();
		}
	});
}

function toast(_msg){
	api.toast({
	    msg: _msg,
	    global: true
	});
}

function radioValue(ename){
	var radios = document.getElementsByName(ename);
	if(radios){
		for(var r in radios){
			if(radios[r].checked){
				return radios[r].value;
			}
		}
	}
}

function selectValue(eid){
	return $(eid).value;
}