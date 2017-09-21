// var request = require('request');
var crypto = require('crypto');


/**
 * 小鱼api签名url
 *用法
 * let xyapi = new XYAPI({
 *     SERVICE:"", //小鱼服务器地址
 *     TOKEN:"", //小鱼token
 *     ENTERPRISEID:"" //小鱼企业id
 *     //BASE_PATH ="/api/rest/external/v1/"; //可选暂时为固定值，如果小鱼修改了接口版本，签名方法不变这个就可以手动填写
 * })
 * let apiPath = "meetingroom/910058486449/vods"; //接口v1之后的内容
 * let apiParams =    {
 *      startTime:0,           //接口参数，企业id暂时版本都带的，所以自动填充不需要输入
 *		endTime:1470452561000
 *  }
 * var url = xyapi.getApiUrl(apiPath, apiParams)
 *
 * 
 */



class XYAPI {
    constructor(options) {
		options = options || {};
		this._options = {};
		this._options.SERVICE = options.SERVICE;
		this._options.BASE_PATH = options.BASE_PATH || "/api/rest/external/v1/";
        this._options.TOKEN = options.TOKEN;
        this._options.ENTERPRISEID = options.ENTERPRISEID;
	}
    getApiUrl (apiPath,apiParams,httpMethod,entity){
        var baseXiaoyuUrl = this._options.SERVICE+this._options.BASE_PATH+apiPath;
        console.log(apiParams)
        // apiParams.enterprise_id = apiParams.enterprise_id || this._options.ENTERPRISEID;
        var param = apiParams;
        var sortedParm = (Object.keys(apiParams)).sort();
        var paramStrArr = [];
        var tmpStr = '';
        var paramStr = '';
        httpMethod = httpMethod || 'GET'
        for(var i =0;i<sortedParm.length;i++){
            tmpStr = sortedParm[i]+'='+param[sortedParm[i]];
            paramStrArr.push(tmpStr);
        }
        paramStr = paramStrArr.join('&');
        paramStr = encodeURI(paramStr);
        var hash = crypto.createHash('sha256');
        let buf ='';
        // var enStr = JSON.stringify(entity)
        // var bufferSS = Buffer.from(enStr)
        // if
        // 
        if(entity && entity.length >100) {
            buf = Buffer.alloc(100, entity, 'utf-8');
        } else if(entity && entity.length <100) {
            buf = Buffer.alloc(entity.length, entity, 'utf-8');
        }
        
        // console.log(buf)
        // console.log(buf.length)

        // console.log(enStr.length)
        // var en100 = enStr.substr(0,100)
        // console.log(en100)
        // console.log(en100.length)


        hash.update(buf);
        var hashedStr = hash.digest('base64')
        console.log(hashedStr)
        var tobeSignStr = httpMethod+'\n'+apiPath+'\n'+paramStr+'\n'+hashedStr
        var token = this._options.TOKEN ;
        var hmac = crypto.createHmac('sha256', token);
        hmac.update(tobeSignStr);
        var signature = hmac.digest('base64');
        var urlP = paramStr+'&signature='+encodeURIComponent(signature);
        var url = baseXiaoyuUrl+'?'+urlP;
        return url
    }
}

// var a = new XYAPI({
//     SERVICE:"https://www.ainemo.com",
//     TOKEN:"e86d742dab336561c3bc01f12c8fef7a2322b2cf5db4323decd7d452ddb927f8",
//     ENTERPRISEID:"a94a8fe5ccb19ba61c4c0873d391e987982fbbd3"
// })
// var b = a.getApiUrl(
//     "conferenceControl/nemo/584051/invitation",
//    {
//         // confPwd:603918,
//         enterpriseId:"a94a8fe5ccb19ba61c4c0873d391e987982fbbd3"
//     },
//     'PUT',
// "fasdjfiadjf发多少积分卡爱的色放敬爱的接发就发电视剧看风景阿萨德来缴费卡电视剧发生的几率放假啊束带结发23423413241234123412史蒂夫机器二级发觉是的覅寂静岭上搭建分集剧情了交付id是街坊邻居了文件覅偶记or"
// )
// console.log(b)
// BASE_PATH ="/api/rest/external/v1/";
module.exports = XYAPI;