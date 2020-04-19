<template>
  <v-card>
    <v-toolbar flat color="#EFEEEC">
      <v-toolbar-title>您的积分为: 666</v-toolbar-title>
    </v-toolbar>
    <v-tabs vertical>
      <v-tab>
        <v-icon left>mdi-account</v-icon>
        我的捐赠物品
      </v-tab>
      <v-tab>
        <v-icon left>mdi-lock</v-icon>
        我的捐赠订单
      </v-tab>
      <v-tab>
        <v-icon left>mdi-access-point</v-icon>
        我的积分兑换商品订单
      </v-tab>
      <v-tab>
        <v-icon left>mdi-access-point</v-icon>
        我的地址
      </v-tab>

      <!--      我的捐赠物品-->
      <v-tab-item>
        <v-card flat>
          <v-card-text>
            <v-card>
              <v-toolbar class="elevation-0">
                <v-spacer/>
                <v-flex xs3>
                  状态：
                  <v-btn-toggle mandatory v-model.lazy="filter1.saleable">
                    <v-btn flat :value="1">
                      积分审核中
                    </v-btn>
                    <v-btn flat :value="0">
                      禁用
                    </v-btn>
                    <v-btn flat :value="2">
                      积分已发放
                    </v-btn>
                    <v-btn flat :value="3">
                      待下单
                    </v-btn>
                  </v-btn-toggle>
                </v-flex>
              </v-toolbar>
              <v-divider/>
              <!--    表格-->
              <el-table
                :data="records1"
                border
                style="width: 100%">
                <el-table-column
                  fixed
                  prop="goodsName"
                  label="商品名称"
                  width="200">
                </el-table-column>
                <el-table-column
                  prop="visitTime"
                  label="上门取货时间"
                  width="200">
                </el-table-column>
                <el-table-column
                  prop="donationCount"
                  label="捐赠数量"
                  width="200">
                </el-table-column>
                <el-table-column
                  prop="acquireScore"
                  label="获得的积分"
                  width="200">
                </el-table-column>
                <el-table-column
                  prop="goodsImages"
                  label="物品图片"
                  width="120">
                  <!-- 图片的显示 -->
                  <template slot-scope="scope">
                    <img :src="'http://127.0.0.1:8001/trash/'+scope.row.activityImages" min-width="50" height="50"/>
                  </template>
                </el-table-column>
                <el-table-column
                  prop="logisticsStatus"
                  label="物流状态"
                  :formatter="logis1Formatter"
                  width="200">
                </el-table-column>
                <el-table-column
                  prop="state"
                  label="捐赠物品状态"
                  :formatter="state1Formatter"
                  width="300">
                </el-table-column>
                <el-table-column
                  fixed="right"
                  label="操作"
                  width="200">
                  <template slot-scope="scope">
                    <template v-if="scope.row.state === 3">
                      <el-button @click="handleClick(1.1,scope.row.id)" type="text" size="small">下单</el-button>
                    </template>
                    <template v-else="scope.row.state ==== 1 || scope.row.state === 0 scope.row.state === 2">
                      <el-button @click="handleClick(1.2,scope.row.id)" type="text" size="small">查看物流</el-button>
                    </template>
                  </template>
                </el-table-column>
              </el-table>
              <!--    分页-->
              <div class="block" style="text-align: right">
                <el-pagination
                  @size-change="handleSizeChange1"
                  @current-change="handleCurrentChange1"
                  :current-page.sync="currentPageIndex1"
                  :page-sizes="[5, 10, 15, 20]"
                  :page-size="pageSize1"
                  layout="sizes, prev, pager, next"
                  :total="total1">
                </el-pagination>
              </div>
              <!--弹出的对话框-->
              <el-dialog
                title="提示"
                :visible.sync="dialogVisible1"
                width="30%">
                <span>物流信息标题: {{logisticsMsgTitle}}</span>
                <br>
                <span>物流信息内容: {{logisticsMsgContent}}</span>
                <br>
                <span>时间: {{createTime}}</span>
                <span slot="footer" class="dialog-footer">
                  <el-button type="primary" @click="dialogVisible1 = false">确 定</el-button>
                </span>
              </el-dialog>
            </v-card>
          </v-card-text>
        </v-card>
      </v-tab-item>

      <!--      我的捐赠订单-->
      <v-tab-item>
        <v-card flat>
          <v-card-text>
            <v-card>
              <v-toolbar class="elevation-0">
                <v-spacer/>
                <v-flex xs3>
                  状态：
                  <v-btn-toggle mandatory v-model.lazy="filter2.saleable">
                    <v-btn flat :value="1">
                      正常
                    </v-btn>
                    <v-btn flat :value="0">
                      失效
                    </v-btn>
                    <v-btn flat :value="2">
                      已完成
                    </v-btn>
                  </v-btn-toggle>
                </v-flex>
              </v-toolbar>
              <v-divider/>
              <!--    表格-->
              <el-table
                :data="records2"
                border
                style="width: 100%">
                <el-table-column
                  fixed
                  prop="goodsOrderNumber"
                  label="捐赠物品订单号"
                  width="200">
                </el-table-column>
                <el-table-column
                  prop="goodsCount"
                  label="捐赠商品数量"
                  width="200">
                </el-table-column>
                <el-table-column
                  prop="gainScore"
                  label="获得的积分"
                  width="200">
                </el-table-column>
                <el-table-column
                  prop="state"
                  label="订单状态"
                  width="200">
                </el-table-column>
                <el-table-column
                  prop="createTime"
                  label="创建时间"
                  width="200">
                </el-table-column>
              </el-table>
              <!--    分页-->
              <div class="block" style="text-align: right">
                <el-pagination
                  @size-change="handleSizeChange2"
                  @current-change="handleCurrentChange2"
                  :current-page.sync="currentPageIndex2"
                  :page-sizes="[5, 10, 15, 20]"
                  :page-size="pageSize2"
                  layout="sizes, prev, pager, next"
                  :total="total2">
                </el-pagination>
              </div>
            </v-card>
          </v-card-text>
        </v-card>
      </v-tab-item>

      <!--      我的积分兑换商品订单-->
      <v-tab-item>
        <v-card flat>
          <v-card-text>
            <v-card>
              <v-toolbar class="elevation-0">
                <v-spacer/>
                <v-flex xs3>
                  状态：
                  <v-btn-toggle mandatory v-model.lazy="filter3.saleable">
                    <v-btn flat :value="1">
                      在用
                    </v-btn>
                    <v-btn flat :value="3">
                      已完成
                    </v-btn>
                    <v-btn flat :value="4">
                      已发货
                    </v-btn>
                    <v-btn flat :value="2">
                      无效
                    </v-btn>
                  </v-btn-toggle>
                </v-flex>
              </v-toolbar>
              <v-divider/>
              <!--    表格-->
              <el-table
                :data="records3"
                border
                style="width: 100%">
                <el-table-column
                  fixed
                  prop="orderNumber"
                  label="订单号"
                  width="200">
                </el-table-column>
                <el-table-column
                  prop="productCount"
                  label="商品数量"
                  width="200">
                </el-table-column>
                <el-table-column
                  prop="deliveryTime"
                  label="发货时间"
                  width="200">
                </el-table-column>
                <el-table-column
                  prop="recvingTime"
                  label="收货时间"
                  width="200">
                </el-table-column>
                <el-table-column
                  prop="expendScore"
                  label="消费积分"
                  width="200">
                </el-table-column>
                <el-table-column
                  prop="trackingNumber"
                  label="快递单号"
                  width="200">
                </el-table-column>
                <el-table-column
                  prop="state"
                  label="订单状态"
                  width="200">
                </el-table-column>
                <el-table-column
                  prop="createTime"
                  label="创建时间"
                  width="200">
                </el-table-column>
              </el-table>
              <!--    分页-->
              <div class="block" style="text-align: right">
                <el-pagination
                  @size-change="handleSizeChange3"
                  @current-change="handleCurrentChange3"
                  :current-page.sync="currentPageIndex3"
                  :page-sizes="[5, 10, 15, 20]"
                  :page-size="pageSize3"
                  layout="sizes, prev, pager, next"
                  :total="total3">
                </el-pagination>
              </div>
            </v-card>
          </v-card-text>
        </v-card>
      </v-tab-item>

      <!--      我的地址 不分页-->
      <v-tab-item>
        <v-card flat>
          <v-card-text>
            <v-card>
              <v-toolbar class="elevation-0">
                <v-btn color="primary" @click="addActivities">新增地址</v-btn>
              </v-toolbar>
              <v-divider/>
              <!--    表格-->
              <el-table
                :data="records4"
                border
                style="width: 100%">
                <el-table-column
                  fixed
                  prop="name"
                  label="用户地址"
                  width="200">
                </el-table-column>
                <el-table-column
                  prop="phone"
                  label="手机号"
                  width="200">
                </el-table-column>
                <el-table-column
                  prop="address"
                  label="详细地址"
                  width="200">
                </el-table-column>
                <el-table-column
                  prop="postcode"
                  label="邮编"
                  width="300">
                </el-table-column>
                <el-table-column
                  prop="addressType"
                  label="地址类型"
                  width="120">
                </el-table-column>
                <el-table-column
                  prop="state"
                  label="地址状态"
                  width="120">
                </el-table-column>
                <el-table-column
                  prop="defaultAddressState"
                  label="是否为默认地址"
                  width="120">
                </el-table-column>
              </el-table>
              <!--&lt;!&ndash;    分页&ndash;&gt;
              <div class="block" style="text-align: right">
                <el-pagination
                  @size-change="handleSizeChange4"
                  @current-change="handleCurrentChange4"
                  :current-page.sync="currentPageIndex4"
                  :page-sizes="[5, 10, 15, 20]"
                  :page-size="pageSize4"
                  layout="sizes, prev, pager, next"
                  :total="total4">
                </el-pagination>
              </div>-->
              <!--弹出的对话框-->
              <v-dialog max-width="800" v-model="show4" persistent scrollable>
                <v-card>
                  <!--对话框的标题-->
                  <v-toolbar dense dark color="primary">
                    <v-toolbar-title>新增地址</v-toolbar-title>
                    <v-spacer/>
                    <!--关闭窗口的按钮-->
                    <v-btn icon @click="closeWindow(4)">
                      <v-icon>close</v-icon>
                    </v-btn>
                  </v-toolbar>
                  <!--对话框的内容，表单-->
                  <v-card-text class="px-3" style="height: 600px">
                    <AddressForm ref="ch" @close="closeWindow(4)"/>
                  </v-card-text>
                  <!--底部按钮，用来操作步骤线-->
                  <v-card-actions class="elevation-10">
                    <v-flex class="xs3 mx-auto">
                      <v-btn @click="addActivity(4)" color="primary">新增</v-btn>
                      <v-btn @click="closeWindow(4)" color="info">取消</v-btn>
                    </v-flex>
                  </v-card-actions>
                </v-card>
              </v-dialog>
            </v-card>
          </v-card-text>
        </v-card>
      </v-tab-item>
    </v-tabs>

    <!--    下单捐赠弹窗-->
    <el-dialog title="下单捐赠" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="工作人员:" :label-width="formLabelWidth">
          <v-select
            :items="donatePeopleItems"
            label="请选择工作人员"
            v-model="form.selectedPeopleName"
          ></v-select>
        </el-form-item>
        <el-form-item label="地址:" :label-width="formLabelWidth">
          <v-select
            :items="donateAddressItems"
            label="请选择上门取货地址"
            v-model="form.selectedAddressName"
          ></v-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="confirmExchange">下单捐赠</el-button>
      </div>
    </el-dialog>
  </v-card>
</template>

<script>
  import AddressForm from "./AddressForm";

    export default {
        name: "MyInfo",
        data() {
            return {
                /*我的捐赠物品*/
                formLabelWidth: '120px',
                Addresses:[
                    {
                        "id": Number, //地址id

                        "name": "",//收货/发货姓名

                        "phone": "",//手机号

                        "address": "",//详细地址

                        "postcode": "",//邮编

                        "userId": Number,//用户id

                        "addressType": Number,//地址类型【1、收获地址，2、发货地址】

                        "state": 1,//地址状态【1、在用，0、归档】

                        "defaultAddressState": 0,//是否为默认地址【1、是，0不是】

                        "createTime": '',//创建时间

                        "modifyTime": ''//修改时间
                    }
                ],
                Peoples:[

                ],
                logisticsMsgTitle: '',
                logisticsMsgContent: '',
                createTime: '',
                donatePeopleItems:[ // 工作人员名称列表

                ],
                donateAddressItems:[ // 地址名称列表

                ],
                form: {
                    selectedPeopleName : '',
                    selectedAddressName : '',
                },
                dialogFormVisible: false, // 下单弹窗
                dialogVisible1:false, // 查看物流信息弹窗
                total1: 1, // 总条数
                pageSize1: 5, // 每页数量
                currentPageIndex1: 1, //当前页码
                records1: [{
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
                    "logisticsStatus": 40, /*捐赠物品物流状态【
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
                }],
                filter1: {
                    saleable: 1, //捐赠物品状态【1、积分审核中，0、禁用；2、积分已发放给用户;3、捐赠物品信息已添加，待下单】；必填
                },

                /*我的捐赠订单*/
                total2: 1, // 总条数
                pageSize2: 5, // 每页数量
                currentPageIndex2: 1, //当前页码
                records2: [{
                    "id": 5, // 捐赠物品订单id
                    "donationGoodsId": 1, // 捐赠物品id
                    "userId": 1, // 用户id
                    "donationLogisticsId": null, // 捐赠物品物流信息id
                    "workerMessageId": 1, // 上门工作人员id
                    "userAddressId": 1, // 用户地址id
                    "goodsOrderNumber": "20200418180613470", // 捐赠物品订单号
                    "goodsCount": 10, // 捐赠商品数量
                    "gainScore": null, // 捐赠商品后获得的积分
                    "gainScoreTime": null, // 获得积分的时间
                    "state": 1, // 订单状态【0、失效；1、正常；2、已完成】
                    "createTime": "2020-04-18 18:06:13", // 创建时间
                    "modifyTime": "2020-04-18 18:06:13" // 修改时间
                }],
                filter2: {
                    saleable: 1, //订单状态【0、失效；1、正常；2、已完成】必填
                },

                /* 我的积分兑换商品订单 */
                total3: 1, // 总条数
                pageSize3: 5, // 每页数量
                currentPageIndex3: 1, //当前页码
                records3: [{
                    "id": 1, // 兑换订单主键id
                    "orderNumber": "20200418172234319216", // 订单号
                    "productId": 1, // 商品id
                    "userId": 1, // 用户id
                    "userAddressId": 1, // 用户地址id
                    "productCount": 1, // 商品数量
                    "deliveryTime": null, // 发货时间
                    "recvingTime": null, // 收货时间
                    "expendScore": 100, // 消费积分
                    "trackingNumber": null, // 快递单号
                    "state": 1, // 订单状态【1、在用，2、无效，3、已完成,4、已发货】
                    "createTime": 1587201755000, // 创建时间
                    "modifyTime": 1587201755000 // 修改时间
                }],
                filter3: {
                    saleable: 1, //订单状态【1、在用，2、无效，3、已完成,4、已发货】
                },

                /* 我的地址*/
                show4: false,
                records4: [{
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
                }],

                loading4: true, // 是否在加载中
                oldActivity4: {}, // 即将被编辑的活动信息
                isEdit4: false, // 是否是编辑
            }
        },
        methods: {
            addActivities() {
                this.show4 = true;
            },
            // 下单请求
            confirmExchange() {
                // 获取捐赠物品id
                // 获取工作人员id
                // 获取地址id
                // 获取捐赠数量
                this.$http.post(
                    "/trash/score/donationGoodsOrder/placeOrder",
                    {
                        "donationGoodsId":r, //捐赠物品id
                        "workerMessageId":1, //工作人员id
                        "userAddressId":1, //用户地址id
                        "goodsCount":10 //捐赠数量
                    }
                ).then(res => {

                }).catch(error => {

                })
            },
            handleClick(i,r) {
                // 判断操作按钮点击类型
                if (i === 1.1) {
                    // 弹窗
                    this.dialogFormVisible = true;
                    // 获取工作人员列表
                    this.$http.get(
                        "/trash/product/workerMessage/list"
                    ).then(res => {

                    }).catch(error => {
                        alert("获取工作人员列表失败!");
                        this.dialogFormVisible =false;
                    });
                    // 获取地址列表
                    this.$http.get(
                        "/trash/address/userAddress/selectByUser"
                    ).then(res => {
                        this.Addresses = res.data.data;
                        res.data.data.forEach( a => {
                            this.donateAddressItems.push(a.address);
                        })
                    }).catch(error => {
                        alert("获取地址列表失败!");
                        this.dialogFormVisible = false
                    })

                } else if (i === 1.2) {
                    // 弹窗
                    this.dialogVisible1 = true;
                    // 请求和显示物流信息
                    this.$http.get(
                        "/trash/product/donationGoods/getLogistics",{
                            params:{
                                donationsGoodsId:r
                            }
                        }
                    ).then(res => {
                        this.logisticsMsgTitle = res.data.data.logisticsMsgTitle;
                        this. logisticsMsgContent = res.data.data.logisticsMsgContent;
                        this.createTime = res.data.data.createTime;
                    }).catch(error => {
                        alert("物流信息获取失败!");
                        this.dialogVisible1 = false
                    })
                }
            },
            handleSizeChange1(val) {
                this.pageSize1 = val;
                this.getData(1);
            },
            handleCurrentChange1(val) {
                this.currentPageIndex1 = val;
                this.getData(1);
            },
            handleSizeChange2(val) {
                this.pagesize2 = val;
                this.getData(2);
            },
            handleCurrentChange2(val) {
                this.currentPageIndex2 = val;
                this.getData(2);
            },
            handleSizeChange3(val) {
                this.pageSize3 = val;
                this.getData(3);
            },
            handleCurrentChange3(val) {
                this.currentPageIndex3 = val;
                this.getData(3);
            },
            closeWindow(i) {
                // 判断是哪个弹窗要关闭
                if (i === 4) {
                    this.show4 = false;
                }
            },
            addActivity(i) {
                // 判断是哪个弹窗的提交请求
                if (i === 2) {

                } else if (i === 4) {

                }
            },
            getData(val) {
                // 判断是哪个tab初始页面请求
                if (val === 1) {
                    var state = this.filter1.saleable;
                    this.$http.get(
                        "/trash/product/donationGoods/getListByUser",{
                            params:{
                                pageIndex:this.currentPageIndex1,
                                pageSize:this.pageSize1,
                                state:state //捐赠物品状态【1、积分审核中，0、禁用；2、积分已发放给用户;3、捐赠物品信息已添加，待下单】；必填
                            }
                        }
                    ).then(res => {
                        this.records1 =res.data.data.records;
                    }).catch(error => {
                        alert("页面数据加载失败!");
                    })
                } else if(val === 2) {


                } else if(val === 3) {

                } else if(val === 4) {

                } else if(val === 5) {

                }
            },
            logis1Formatter(row,column) {
                if (row.logisticsStatus === 0) {
                    return "商品已添加";
                } else if(row.logisticsStatus === 10) {
                    return "等待工作人员上门回收";
                } else if(row.logisticsStatus === 20) {
                    return "工作人员已上门";
                } else if(row.logisticsStatus === 21) {
                    return "已派送工作人员按照约定时间上门";
                } else if(row.logisticsStatus === 30) {
                    return "捐赠物品已入库";
                } else if(row.logisticsStatus === 40) {
                    return "捐赠物品已出库";
                } else if(row.logisticsStatus === 50) {
                    return "捐赠物品已送至需要的人群";
                }
            },
            state1Formatter(row,column) {
                if (row.state === 1) {
                    return "积分审核中";
                } else if(row.state === 0) {
                    return "禁用";
                } else if(row.state === 2) {
                    return "积分已发放给用户";
                } else if(row.state === 3) {
                    return "捐赠物品信息已添加,待下单";
                }
            }

        },
        components: {
            AddressForm
        },
        watch:{
            // 下单捐赠弹窗关闭
            dialogFormVisible(val) {
                if (val === false) {
                    this.form.selectedAddressName = "";
                    this.form.selectedPeopleName = "";
                    this.donateAddressItems = [];
                    this.donatePeopleItems = [];
                }
            },
            filter1: {// 监视搜索字段
                handler() {
                    this.getData(1);
                },
                deep: true
            }
        }
    }
</script>

<style scoped>

</style>
