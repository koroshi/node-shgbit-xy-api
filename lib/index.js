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
    getApiUrl (apiPath,apiParams){
        var baseXiaoyuUrl = this._options.SERVICE+this._options.BASE_PATH+apiPath;
        console.log(apiParams)
        apiParams.enterprise_id = apiParams.enterprise_id || this._options.ENTERPRISEID;
        var param = apiParams;
        var sortedParm = (Object.keys(apiParams)).sort();
        var paramStrArr = [];
        var tmpStr = '';
        var paramStr = '';
        for(var i =0;i<sortedParm.length;i++){
            tmpStr = sortedParm[i]+'='+param[sortedParm[i]];
            paramStrArr.push(tmpStr);
        }
        paramStr = paramStrArr.join('&');
        paramStr = encodeURI(paramStr);
        var hash = crypto.createHash('sha256');
        hash.update('');
        var hashedStr = hash.digest('base64')

        var tobeSignStr = 'GET'+'\n'+apiPath+'\n'+paramStr+'\n'+hashedStr
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
//     SERVICE:"http://121.196.210.153",
//     TOKEN:"426739735a32d27eb7d5e38cac4b808f3817c2fbc106a9bde695395553510e6a",
//     ENTERPRISEID:"fb49d7230a2511e79e5600163e0037ed"
// })
// var b = a.getApiUrl(
//     "meetingroom/910058486449/vods",
//    {
//         startTime:0,
// 		endTime:1470452561000
//     }
// )
// console.log(b)
// BASE_PATH ="/api/rest/external/v1/";
module.exports = XYAPI;