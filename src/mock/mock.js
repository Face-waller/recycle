import Mock from 'mockjs';

// 配置拦截 ajax 的请求时的行为，支持的配置项目有 timeout。
// Mock.setup({
//   timeout: '200 - 400'
// })

// 首页获取页面数据
const getIndexData = function(params) {
  return {
    "code": 2000,
    "statusCode": "Success",
    "message": "操作成功",
    "data": {
      "total": 0,  //总共数量
      "size": 10, //每页数量
      "pages": 0,
      "current": 1,  //当前第几页
      "records": [
        {
          "id": 10,  //主键id
          "activityTitle": "20200404测试添加活动标题",  //活动标题
          "activityContent": "20200404测试添加活动内容", //活动内容
          "activityImages": "http://a0.att.hudong.com/27/10/01300000324235124757108108752.jpg", //图片地址
          "activityTime": "2020-02-18 18:53:00",  //活动时间
          "blogroll": "http://www.baidu.com",  //友情链接
          "userId": 1,  //创建人
          "state": 1,  //活动状态
          "createTime": "2020-04-05 12:36:28",  //创建时间
          "modifyTime": "2020-04-05 12:36:28"  //修改时间

        },
        {
          "id": 10,  //主键id
          "activityTitle": "20200404测试添加活动标题",  //活动标题
          "activityContent": "20200404测试添加活动内容", //活动内容
          "activityImages": "http://a0.att.hudong.com/27/10/01300000324235124757108108752.jpg", //图片地址
          "activityTime": "2020-02-18 18:53:00",  //活动时间
          "blogroll": "http://www.baidu.com",  //友情链接
          "userId": 1,  //创建人
          "state": 1,  //活动状态
          "createTime": "2020-04-05 12:36:28",  //创建时间
          "modifyTime": "2020-04-05 12:36:28"  //修改时间

        },
        {
          "id": 10,  //主键id
          "activityTitle": "20200404测试添加活动标题",  //活动标题
          "activityContent": "20200404测试添加活动内容", //活动内容
          "activityImages": "http://a0.att.hudong.com/27/10/01300000324235124757108108752.jpg", //图片地址
          "activityTime": "2020-02-18 18:53:00",  //活动时间
          "blogroll": "http://www.baidu.com",  //友情链接
          "userId": 1,  //创建人
          "state": 1,  //活动状态
          "createTime": "2020-04-05 12:36:28",  //创建时间
          "modifyTime": "2020-04-05 12:36:28"  //修改时间

        }
      ]
    }
  }
}

// 登录验证请求
const getVerify = function(params) {
  return {
    "code": 2000,
    "statusCode": "Success",
    "message": "操作成功",
    "data": {
      "id": 3, //用户id
      "username": "尚世康",  //用户姓名
      "isSuperuser": 1 // 是否是管理员[0、不是；1、是]
    }
  }
}

//
const getGoodsList = function(params) {
  return {
    "code": 2000,
    "statusCode": "Success",
    "message": "操作成功",
    "data": {
      "total": 0,
      "size": 10,
      "pages": 0,
      "current": 1,
      "records": [
        {
          "id": 1, //商品id
          "productKindId": 1, //商品种类id
          "productKindName":"商品种类名称",
          "productName": "001测试商品名称", //商品名称
          "productImages": "https://www.baidu.com/img/bd_logo1.png", //商品图片地址
          "commodityPrice": 100.00, //商品原价
          "productPrice": 200.00, //商品现价
          "needPoints": 100.00, //兑换所需积分
          "totalNumber": 100, //商品总数
          "stockNumber": 100, //商品库存
          "productPutawayTime": "2020-02-18 19:00:00", //商品上架时间
          "productSoldOutTime": "2020-02-25 19:00:00", //商品下架时间
          "state": 1, //商品状态 【1、在用，0、下架】
          "createTime": 1586185481000, //创建时间
          "modifyTime": 1586185481000 //修改时间
        },
        {
          "id": 1, //商品id
          "productKindId": 1, //商品种类id
          "productKindName":"商品种类名称",
          "productName": "001测试商品名称", //商品名称
          "productImages": "https://www.baidu.com/img/bd_logo1.png", //商品图片地址
          "commodityPrice": 100.00, //商品原价
          "productPrice": 200.00, //商品现价
          "needPoints": 100.00, //兑换所需积分
          "totalNumber": 100, //商品总数
          "stockNumber": 100, //商品库存
          "productPutawayTime": "2020-02-18 19:00:00", //商品上架时间
          "productSoldOutTime": "2020-02-25 19:00:00", //商品下架时间
          "state": 1, //商品状态 【1、在用，0、下架】
          "createTime": 1586185481000, //创建时间
          "modifyTime": 1586185481000 //修改时间
        },
        {
          "id": 1, //商品id
          "productKindId": 1, //商品种类id
          "productKindName":"商品种类名称",
          "productName": "001测试商品名称", //商品名称
          "productImages": "https://www.baidu.com/img/bd_logo1.png", //商品图片地址
          "commodityPrice": 100.00, //商品原价
          "productPrice": 200.00, //商品现价
          "needPoints": 100.00, //兑换所需积分
          "totalNumber": 100, //商品总数
          "stockNumber": 100, //商品库存
          "productPutawayTime": "2020-02-18 19:00:00", //商品上架时间
          "productSoldOutTime": "2020-02-25 19:00:00", //商品下架时间
          "state": 1, //商品状态 【1、在用，0、下架】
          "createTime": 1586185481000, //创建时间
          "modifyTime": 1586185481000 //修改时间
        },
        {
          "id": 1, //商品id
          "productKindId": 1, //商品种类id
          "productKindName":"商品种类名称",
          "productName": "001测试商品名称", //商品名称
          "productImages": "https://www.baidu.com/img/bd_logo1.png", //商品图片地址
          "commodityPrice": 100.00, //商品原价
          "productPrice": 200.00, //商品现价
          "needPoints": 100.00, //兑换所需积分
          "totalNumber": 100, //商品总数
          "stockNumber": 100, //商品库存
          "productPutawayTime": "2020-02-18 19:00:00", //商品上架时间
          "productSoldOutTime": "2020-02-25 19:00:00", //商品下架时间
          "state": 1, //商品状态 【1、在用，0、下架】
          "createTime": 1586185481000, //创建时间
          "modifyTime": 1586185481000 //修改时间
        }
      ]
    }
  }
}

const getAddress = function(params) {
  return {
    "code": 2000,
    "statusCode": "Success",
    "message": "操作成功",
    "data": [
      {
        "id": 1, //地址id

        "name": "用户地址",//收货/发货姓名

        "phone": "1324536524",//手机号

        "address": "河南省郑州市金水区",//详细地址

        "postcode": "400509",//邮编

        "userId": 1,//用户id

        "addressType": 1,//地址类型【1、收获地址，2、发货地址】

        "state": 1,//地址状态【1、在用，0、归档】

        "defaultAddressState": 0,//是否为默认地址【1、是，0不是】

        "createTime": 1587203164000,//创建时间

        "modifyTime": 1587203164000//修改时间

      }
    ]
  }
}

const confirmExchange = function(params) {
    return {
      "code": 2000,
      "statusCode": "Success",
      "message": "操作成功"
    }
}

const getAllGoodsType = function(params) {
  return {
    "code": 2000,
    "statusCode": "Success",
    "message": "操作成功",
    "data": [
      {
        "id": 2,  //商品种类id
        "productName": "尚世康"  //商品种类名称
      },
      {
        "id": 3,
        "productName": "王英杰"
      },
      {
        "id": 4,
        "productName": "大师"
      }
    ]
  }
}

const doDonate = function(params) {
    return {
      "code": 2000,
      "statusCode": "Success",
      "message": "操作成功"
    }
}

const getDonateGoodsList = function(params) {
  return {
    "code": 2000,
    "statusCode": "Success",
    "message": "操作成功",
    "data": {
      "total": 0,
      "size": 10,
      "pages": 0,
      "current": 1,
      "records": [
        {
          "id": 1, // 捐赠物品信息id
          "userId": 1, // 用户id
          "productKindId": 1, // 商品种类id
          "donationLogisticsId": null, // 捐赠物品物流信息id
          "goodsName": "捐赠商品名称", // 商品名称
          "visitTime": "2020-04-07 22:25:30", // 上门取货时间
          "donationCount": 10, // 捐赠数量
          "acquireScore": 10.00, // 捐赠物品获得的积分
          "goodsImages": "/trash/images/98e9d0fa115f4f9ba0f0763b3e2b73b22020-02-14.jpg", // 捐赠物品图片
          "remark": "这是一个备注", // 备注
          /*     "logisticsStatus": 40, // 捐赠物品物流状态【
           * 0、商品已添加
               * 10、等待工作人员上门回收；
           * 20、工作人员已上门；
           * 21、已派送工作人员按照约定时间上门；
           * 30、捐赠物品已入库；
           * 40、捐赠物品已出库；
           * 50、捐赠物品已送至需要的人群】*/
          "state": 2, // 捐赠物品状态【1、积分审核中，0、禁用；2、积分已发放给用户;3、捐赠物品信息已添加，待下单】
          "createTime": "2020-04-07 22:30:34", // 创建时间
          "modifyTime": "2020-04-11 21:26:30" // 修改时间
        },
        {
          "id": 1, // 捐赠物品信息id
          "userId": 1, // 用户id
          "productKindId": 1, // 商品种类id
          "donationLogisticsId": null, // 捐赠物品物流信息id
          "goodsName": "捐赠商品名称", // 商品名称
          "visitTime": "2020-04-07 22:25:30", // 上门取货时间
          "donationCount": 10, // 捐赠数量
          "acquireScore": 10.00, // 捐赠物品获得的积分
          "goodsImages": "/trash/images/98e9d0fa115f4f9ba0f0763b3e2b73b22020-02-14.jpg", // 捐赠物品图片
          "remark": "这是一个备注", // 备注
          "logisticsStatus": 40, /* 捐赠物品物流状态【
           * 0、商品已添加
               * 10、等待工作人员上门回收；
           * 20、工作人员已上门；
           * 21、已派送工作人员按照约定时间上门；
           * 30、捐赠物品已入库；
           * 40、捐赠物品已出库；
           * 50、捐赠物品已送至需要的人群】*/
          "state": 2, // 捐赠物品状态【1、积分审核中，0、禁用；2、积分已发放给用户;3、捐赠物品信息已添加，待下单】
          "createTime": "2020-04-07 22:30:34", // 创建时间
          "modifyTime": "2020-04-11 21:26:30" // 修改时间
        },
      ]
    }
  }
}

// Mock.mock( url, post/get , 返回的数据)；
Mock.mock(RegExp('http://127.0.0.1:8001/trash/activity/activityMsg/list' + '.*'), 'get', getIndexData);  // index
Mock.mock('http://127.0.0.1:8001/trash/user/user/verify','get', getVerify);  // portallayout
Mock.mock(RegExp('http://127.0.0.1:8001/trash/product/product/productList' + '.*'), 'get', getGoodsList);  // goodslist
Mock.mock(RegExp('http://127.0.0.1:8001/trash/address/userAddress/selectByUser'),'get', getAddress); // goodslist
Mock.mock(RegExp('http://127.0.0.1:8001/trash/score/productOrder/addOrder'),'post', confirmExchange); // goodslist
Mock.mock(RegExp('http://127.0.0.1:8001/trash/product/productKind/selectAll' + '.*'),'get', getAllGoodsType); // dodonateform
Mock.mock(RegExp('127.0.0.1:8001/trash/product/donationGoods/add'),'post',doDonate); // portallayout
Mock.mock(RegExp('127.0.0.1:8001/trash/product/donationGoods/getListByUser' + '.*'),'get',getDonateGoodsList); //myinfo
