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

// Mock.mock( url, post/get , 返回的数据)；
Mock.mock(RegExp('http://127.0.0.1:8001/trash/activity/activityMsg/list'+'.*'), 'get', getIndexData);  // index
Mock.mock('http://127.0.0.1:8001/trash/user/user/verify','get', getVerify);  // portallayout
Mock.mock(RegExp('http://127.0.0.1:8001/trash/product/product/productList'+'.*'), 'get', getGoodsList);  // goodslist
