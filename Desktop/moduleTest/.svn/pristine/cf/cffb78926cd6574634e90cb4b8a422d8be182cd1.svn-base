/*
 * verifyphone  for  erawork
 * Copyright Benson2019
 */
(function(window){
    var smsObj;
    var selNaFun = function(){selNational();};
    var AreaCodeJson = [];
    var cooldowntime = 0;
    var verifyPhoneDone = false;
    var _phone = "";
    var _areacode = "86";

//这个是配置手机区号的，一般添加在输入手机号的前面，这个模块有需要可以研究下，功能是正常的，开启就行了。   不考虑国家的话，可以不管这个
function InitAreaCode(){
    var params = {};
    //中国
    params['text'] = '中国 （86）';
    params['areacode'] = '+86';
    params['cssicon'] = 'icon-China';
    params['icon'] = 'widget://res/icon/national_flags/china.png';
    AreaCodeJson.push(params);
    //美国
    params = {};
    
    params['text'] = '美国 （01）';
    params['areacode'] = '+01';
    params['cssicon'] = 'icon-American';
    params['icon'] = 'widget://res/icon/national_flags/American.png';
    AreaCodeJson.push(params);
    
    //日本
    params = {};
    params['text'] = '日本 （81）';
    params['areacode'] = '+81';
    params['cssicon'] = 'icon-Japan';
    params['icon'] = 'widget://res/icon/national_flags/Japan.png';
    AreaCodeJson.push(params);
    
    //韩国
    params = {};
    params['text'] = '韩国 （82）';
    params['areacode'] = '+82';
    params['cssicon'] = 'icon-Korea';
    params['icon'] = 'widget://res/icon/national_flags/Korea.png';
    AreaCodeJson.push(params);
    
    setAreaCode(0);
}

//这个是区号选择后设置显示的 不考虑国家的话，可以不管这个
function setAreaCode(index){
    if(AreaCodeJson.length < (index+1))
        return; 
    var nationalObj = $api.byId('selnational');
    if(!IsValid(nationalObj))
        return;
    //背景图标
    //for(var i =0; i < AreaCodeJson.length; i++)
        //$api.removeCls(nationalObj, AreaCodeJson[i].cssicon); 
    //$api.addCls(nationalObj, AreaCodeJson[index].cssicon);
    $api.html(nationalObj, AreaCodeJson[index].areacode);   
}

//点击获取验证码后的倒数计时
function Cooldown(){
    var obj = $api.byId("verifytext");
    //if((obj==null) || (obj==undefined) || (obj.firstChild==undefined) || (obj.firstChild==undefined))
    if(!IsValid(obj))
        return;
    $api.html(obj, cooldowntime+'s后重发');
    if(cooldowntime<=0)
    {
        if(!$api.hasCls(obj, "active"))
            $api.addCls(obj, "active");
        $api.html(obj, "获取验证码");
    }else
    {
        cooldowntime = cooldowntime-1;
        window.setTimeout('Cooldown()', 1000);
    }
}


//初始化要调用这个注册
function registSMS(){
    !function(){
        registerSMS(function(status, Obj, err){if(status) smsObj = Obj;});
    }();
}


//验证手机号
function verifyPhoneFat(phone)
{
    if(!IsValid(phone) || (phone==""))
    {
        notification("请输入手机号!", 2000);
        return false;
    }
    if(!IsNum(phone))
    {
        notification("手机号格式不正常!", 2000);
        return false;
    }
    return true;
}

//这里是点击获取验证码后的操作 
function getSmsVerifyCode(obj){
    if(!IsValid(obj))
        return;
    if(!IsValid(smsObj))
        return;
    if(!GetPhone())
        return;
    
    if($api.hasCls(obj, "active"))
    {
        $api.removeCls(obj, "active");
        cooldowntime = 60;
        Cooldown();
    }else
        return;
    
    //这个是作为测试的时候打开的，直接获取就是验证成功，完后来完成后期的逻辑
    /*  
    alert('phone='+parseInt(_phone)+', code='+parseInt(_areacode));
    cooldowntime = 0;
    verifyPhoneDone = true;
    InitEle(true);
    return;
    */
    !function(smsObj, phoneNumber, countryId){
        sendSMS(smsObj, phoneNumber, countryId, function(status, smart, err){
            if(status)
            {
                if(smart)
                {
                    notification("验证码验证成功!", 3000);
                    if(!verifyPhoneDone)
                    {
                        cooldowntime = 0;
                        verifyPhoneDone = true;
                        InitEle(true);
                    }
                    else
                        Done();
                }   
                else
                    notification("验证码已发送，请注意查收!", 3000);
            }else
                notification("发送失败!错误码:"+err.code+", 错误信息:"+err.msg, 3000);
        });
    }(smsObj, parseInt(_phone), parseInt(_areacode));
}

//这个是添加验证码后，点击登录来验证验证码是否正确的。
function verifyCode(){
    var code = $api.byId("verifycode").value;
    if(!IsValid(smsObj))
        return;
    if(code.length==0)
    {
        notification("请输入验证码!", 2000);
        return;
    }
    if(!(/^[0-9]*$/.test(code)))
    {
        notification("您输入的验证码格式错误!", 2000);
        return;
    }
    
    if(!GetPhone())
        return;
    
    //alert('phone='+parseInt(_phone)+', _areacode='+parseInt(_areacode)+', code = '+code);
    //Done();
    //return;
    
    !function(smsObj, phoneNumber, countryId, code){
        verifySMS(smsObj, phoneNumber, countryId, code, function(status, err){
            if(status)
            {
                //验证成功
                if(!verifyPhoneDone){
                    verifyPhoneDone = true;
                    cooldowntime = 0;
                    InitEle(true);
                }
                else
                    Done();
            }else
            {
                notification("验证失败!, "+err.msg, 2000);
            }
            });
        }(smsObj, parseInt(_phone), parseInt(_areacode), code);
}


//打开国家选择的  不考虑国家的话，可以不管这个
function selNational(){
    var dialogBox = api.require('dialogBox');
    dialogBox.scene ({
        tapClose : true,
        rect: {                            
            w: 200,                            
            h: 250                             
        },
        texts: {
            title: '国家选择'
        },
        styles: {
            bg:'#fff',
            title:{     
                bg: '#57c6cf',     
                h: 44,            
                size: 14,        
                color: '#000'    
            },
            cell: {      
                bg: '#fff',                    
                h: 48,                         
                text: {                        
                    color: '#636363',          
                    size: 20                 
                },
                icon: {                       
                    marginL: 15,              
                    marginT: 8,                
                    w: 30,                     
                    h: 30,                     
                    corner: 0                
                }
            }
        },
        optionDatas: [
            {           
                icon : AreaCodeJson[0].icon,
                text : AreaCodeJson[0].text,
            },
            {
                    icon : AreaCodeJson[1].icon,
                text : AreaCodeJson[1].text,
            }
        ]
    }, function(ret, err){
        if( ret ){
            if(ret.eventType == 'cell')
                    setAreaCode(ret.index);
            dialogBox.close ({
                dialogName: 'scene'
            });
        }
    });
}

//注册
function registerSMS(callback) {
    var smsVerify = api.require('smsVerify');
    smsVerify.register(function(ret, err) {
        callback.call(this, ret.status, smsVerify, err);
    });
}
//发送短信
function sendSMS(smsObj, phoneNumber, countryId, callback) {
    smsObj.sms({
        phone : phoneNumber,
        country : countryId
    }, function(ret, err) {
        callback.call(this, ret.status, ret.smart, err);
        /*
         if (ret.status)
         {
         if (ret.smart == true) {// 安卓版特有功能 智能验证
         alert('智能验证成功：开发者可以在这里直接执行手机号验证成功之后的相关操作');
         } else {
         alert('短信发送成功');
         }
         } else {
         alert(err.code + ', ' + err.msg);
         }
         */
    });
}
//发送语音
function sendVoiceSMS(phoneNumber, countryId) {
    //var smsVerify = api.require('smsVerify');
    smsVerify.voice({
        phone : phoneNumber,
        country : countryId
    }, function(ret, err) {
        if (ret.status) {
            alert({
                msg : '语音发送成功'
            });
        } else {
            alert({
                msg : err.code + ' ' + err.msg
            });
        }
    });
}
//验证短信
function verifySMS(smsObj, phoneNumber, countryId, code, callback) {
    smsObj.verify({
        phone : phoneNumber,
        country : countryId,
        code : code
    }, function(ret, err) {
        callback.call(this, ret.status, err);
    });
}

    window.$api = u;

})(window);


