# node-shgbit-xy-api

获取小鱼云api，签名后完整url

[小鱼云api文档](https://opensdk.xylink.com/xiaoyu-sdk/sdk/wikis/cloud-api)

### 安装

```
npm install node-shgbit-xy-api --save
```

### 使用

```javascript
  let xyapi = new XYAPI({
      SERVICE:"", //小鱼服务器地址
      TOKEN:"", //小鱼token
      ENTERPRISEID:"" //小鱼企业id
      // BASE_PATH ="/api/rest/external/v1/"; //可选 暂时为固定值，如果小鱼修改了接口版本，签名方法不变这个就可以手动填写
  })
  let apiPath = "meetingroom/910058486449/vods"; //接口v1之后的内容
  let apiParams =    {
       startTime:0,           //接口参数，
 		endTime:1470452561000,
    enterprise_id:""  //企业id因为可能有两种格式 所以取消了内部自带，
   }
   let httpMethod = "GET"
   <!-- entity post put时候的实体 -->
  var url = xyapi.getApiUrl(apiPath, apiParams,httpMethod[,entity])
  //然后可以使用request 等库直接请求url
```

