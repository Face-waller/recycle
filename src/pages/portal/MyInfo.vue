<template>
  <v-card>
    <v-toolbar flat color="#EFEEEC">
      <v-toolbar-title>您的积分为: {{records5}}</v-toolbar-title>
      <v-btn color="#778899" @click="setPwd">修改密码</v-btn>
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
                    <img :src="'http://127.0.0.1:8001/trash/'+scope.row.goodsImages" min-width="50" height="50"/>
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
                      <el-button @click="handleClick(1.1,scope.row)" type="text" size="small">下单</el-button>
                    </template>
                    <template v-else="scope.row.state ==== 1 || scope.row.state === 0 scope.row.state === 2">
                      <el-button @click="handleClick(1.2,scope.row)" type="text" size="small">查看物流</el-button>
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
                title="物流"
                :visible.sync="dialogVisible1"
                width="30%">
                <div class="block">
                  <el-timeline>
                    <template v-for="(item,i) in logistics1">
                      <el-timeline-item :timestamp="item.createTime | formatDate('yyyy-MM-dd hh:mm:ss')" placement="top">
                        <el-card>
                          <h4>物流信息标题: {{item.logisticsMsgTitle}}</h4>
                          <p>物流信息内容: {{item.logisticsMsgContent}}</p>
                        </el-card>
                      </el-timeline-item>
                    </template>
                  </el-timeline>
                </div>
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
                  :formatter="state2Formatter"
                  width="200">
                </el-table-column>
                <el-table-column
                  prop="createTime"
                  label="创建时间"
                  width="200">
                </el-table-column>
                <el-table-column
                  label="操作"
                  width="200">
                    <template slot-scope="scope" v-if="scope.row.state === 1">
                      <el-button @click="handle3Click(scope.row.id)" type="text" size="small">取消订单</el-button>
                    </template>
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
                  :formatter="state3Formatter"
                  width="200">
                </el-table-column>
                <el-table-column
                  prop="createTime"
                  label="创建时间"
                  width="200">
                </el-table-column>
                <el-table-column
                  label="操作"
                  width="200">
                  <template slot-scope="scope">
                    <template v-if="scope.row.state === 4">
                      <el-button @click="handleClick(3.1,scope.row)" type="text" size="small">确认收货</el-button>
                    </template>
                    <template v-if="scope.row.state === 1">
                      <el-button @click="handle2Click(scope.row.id)" type="text" size="small">取消订单</el-button>
                    </template>
                  </template>
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
                <v-btn color="#BDBDBD" @click="addActivities">新增地址</v-btn>
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
                  :formatter="addressTypeFormatter"
                  width="120">
                </el-table-column>
                <el-table-column
                  prop="state"
                  label="地址状态"
                  :formatter="state4Formatter"
                  width="120">
                </el-table-column>
                <el-table-column
                  prop="defaultAddressState"
                  label="是否为默认地址"
                  :formatter="defaultAddressFormatter"
                  width="120">
                </el-table-column>
                <el-table-column
                  fixed="right"
                  label="操作"
                  width="200">
                  <template slot-scope="scope">
                      <el-button @click="handleClick(4.1,scope.row)" type="text" size="small">修改地址</el-button>
                  </template>
                </el-table-column>
              </el-table>
              <!--弹出的对话框-->
              <v-dialog max-width="800" v-model="show4" persistent scrollable>
                <v-card>
                  <!--对话框的标题-->
                  <v-toolbar dense color="#BDBDBD">
                    <v-toolbar-title>新增地址</v-toolbar-title>
                    <v-spacer/>
                    <!--关闭窗口的按钮-->
                    <v-btn icon @click="closeWindow(4)">
                      <v-icon>close</v-icon>
                    </v-btn>
                  </v-toolbar>
                  <!--对话框的内容，表单-->
                  <v-card-text class="px-3" style="height: 600px">
                    <AddAddressForm ref="ch" @close="closeWindow(4)"/>
                  </v-card-text>
                  <!--底部按钮，用来操作步骤线-->
                  <v-card-actions class="elevation-10">
                    <v-flex class="xs3 mx-auto">
                      <v-btn @click="addActivity(4)" color="#E0E0E0">新增</v-btn>
                      <v-btn @click="closeWindow(4)" color="#F5F5F5">取消</v-btn>
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
    <!--    修改密码-->
    <el-dialog title="修改密码" :visible.sync="setPwdDialog">
      <el-form :model="form">
        <el-input v-model="inputPwd" placeholder="请输密码"></el-input>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="setPwdDialog = false">取 消</el-button>
        <el-button type="primary" @click="confirmSetPwd">修改</el-button>
      </div>
    </el-dialog>
    <!--修改地址弹出的对话框-->
    <v-dialog max-width="800" v-model="show5" persistent scrollable>
      <v-card>
        <!--对话框的标题-->
        <v-toolbar dense color="#BDBDBD">
          <v-toolbar-title>修改地址</v-toolbar-title>
          <v-spacer/>
          <!--关闭窗口的按钮-->
          <v-btn icon @click="closeWindow(5)">
            <v-icon>close</v-icon>
          </v-btn>
        </v-toolbar>
        <!--对话框的内容，表单-->
        <v-card-text class="px-3" style="height: 600px">
          <EditorAddressForm ref="ch2" :oldActivity="oldActivity" @close="closeWindow(4)"/>
        </v-card-text>
        <!--底部按钮，用来操作步骤线-->
        <v-card-actions class="elevation-10">
          <v-flex class="xs3 mx-auto">
            <v-btn @click="addActivity(5)" color="#E0E0E0">修改</v-btn>
            <v-btn @click="closeWindow(5)" color="#F5F5F5">取消</v-btn>
          </v-flex>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-card>
</template>

<script>
  import AddressForm from "./AddressForm";
  import AddAddressForm from "./AddAddressForm"
  import EditorAddressForm from "./EditorAddressForm"
  import { formatDate } from "../../common"

    export default {
        name: "MyInfo",
        data() {
            return {
                show5: false,
                setPwdDialog:false,
                inputPwd: "", // 修改密码
                /*我的捐赠物品*/
                productId: null,  // 下单捐赠物品id
                productNum: null, // 下单捐赠物品数量
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
                Peoples:[{
                    "id": null, // 上门回收物品工作人员信息id
                    "name": "", // 工作人员姓名
                    "createTime": '',
                    "modifyTime": ''
                }],
                // 物流信息数组
                logistics1:[
                    {
                        "id": null, //捐赠物品i物流信息d
                        "donationGoodsOrderId": null, // 冗余字段不用管
                        "donateGoodsId": null, // 捐赠物品id
                        "workerMessageId": null, // 冗余字段，暂不用管
                        "logisticsMsgTitle": '', // "商品已出库",物流信息标题

                        "logisticsMsgContent": "", // 物流信息内容

                        "createTime": '', // 创建时间

                        "modifyTime": '' // 修改时间
                    },
                ],
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
                total1: null, // 总条数
                pageSize1: 5, // 每页数量
                currentPageIndex1: 1, //当前页码
                records1: [{
                    "id": Number, // 捐赠物品信息id
                    "userId": Number, // 用户id
                    "productKindId": Number, // 商品种类id
                    "donationLogisticsId": null, // 捐赠物品物流信息id
                    "goodsName": "", // 商品名称
                    "visitTime": "", // 上门取货时间
                    "donationCount": null, // 捐赠数量
                    "acquireScore": null, // 捐赠物品获得的积分
                    "goodsImages": "", // 捐赠物品图片
                    "remark": "", // 备注
                    "logisticsStatus": Number, /*捐赠物品物流状态【
                                            * 0、商品已添加
                                                * 10、等待工作人员上门回收；
                                            * 20、工作人员已上门；
                                            * 21、已派送工作人员按照约定时间上门；
                                            * 30、捐赠物品已入库；
                                            * 40、捐赠物品已出库；
                                            * 50、捐赠物品已送至需要的人群】*/
                    "state": Number, // 捐赠物品状态【1、积分审核中，0、禁用；2、积分已发放给用户;3、捐赠物品信息已添加，待下单】
                    "createTime": "", // 创建时间
                    "modifyTime": "" // 修改时间
                }],
                filter1: {
                    saleable: 1, //捐赠物品状态【1、积分审核中，0、禁用；2、积分已发放给用户;3、捐赠物品信息已添加，待下单】；必填
                },

                /*我的捐赠订单*/
                total2: null, // 总条数
                pageSize2: 5, // 每页数量
                currentPageIndex2: 1, //当前页码
                records2: [{
                    "id": null, // 捐赠物品订单id
                    "donationGoodsId": null, // 捐赠物品id
                    "userId": null, // 用户id
                    "donationLogisticsId": null, // 捐赠物品物流信息id
                    "workerMessageId": null, // 上门工作人员id
                    "userAddressId": null, // 用户地址id
                    "goodsOrderNumber": "", // 捐赠物品订单号
                    "goodsCount": null, // 捐赠商品数量
                    "gainScore": null, // 捐赠商品后获得的积分
                    "gainScoreTime": null, // 获得积分的时间
                    "state": null, // 订单状态【0、失效；1、正常；2、已完成】
                    "createTime": "", // 创建时间
                    "modifyTime": "" // 修改时间
                }],
                filter2: {
                    saleable: 1, //订单状态【0、失效；1、正常；2、已完成】必填
                },

                /* 我的积分兑换商品订单 */
                total3: 1, // 总条数
                pageSize3: 5, // 每页数量
                currentPageIndex3: 1, //当前页码
                records3: [{
                    "id": null, // 兑换订单主键id
                    "orderNumber": null, // 订单号
                    "productId": null, // 商品id
                    "userId": null, // 用户id
                    "userAddressId": null, // 用户地址id
                    "productCount": null, // 商品数量
                    "deliveryTime": null, // 发货时间
                    "recvingTime": null, // 收货时间
                    "expendScore": null, // 消费积分
                    "trackingNumber": null, // 快递单号
                    "state": null, // 订单状态【1、在用，2、无效，3、已完成,4、已发货】
                    "createTime": null, // 创建时间
                    "modifyTime": null // 修改时间
                }],
                filter3: {
                    saleable: 1, //订单状态【1、在用，2、无效，3、已完成,4、已发货】
                },

                /* 我的地址*/
                show4: false,
                records4: [{
                    "id": null, //地址id
                    "name": null,//收货/发货姓名
                    "phone": null,//手机号
                    "address": null,//详细地址
                    "postcode": null,//邮编
                    "userId": null,//用户id
                    "addressType": null,//地址类型【1、收获地址，2、发货地址】
                    "state": null,//地址状态【1、在用，0、归档】
                    "defaultAddressState": null,//是否为默认地址【1、是，0不是】
                    "createTime": null,//创建时间
                    "modifyTime": null//修改时间
                }],
                loading4: true, // 是否在加载中
                oldActivity: {}, // 即将被编辑的活动信息
                isEdit4: false, // 是否是编辑

                /* 积分 */
                records5: 0
            }
        },
        methods: {
            open(title,msg,type) {
                this.$notify({
                    title: title,
                    message: msg,
                    type: type
                });
            },
            // 验证是否登录
            confirmLogin() {
                if (this.verifyLogin() === false) {
                    this.open("提示","您未登录，请登录","warning");
                    this.$router.push('/index')
                }
            },
            verifyLogin() {
                this.$http.get("/trash/user/user/verify")
                    .then(res => {
                        return res.data.code === 2000
                    }).catch(error => {
                        return false;
                })
            },
            // 修改密码
            confirmSetPwd() {
                this.$http.post(
                    "/trash/user/user/updatePassword",
                    {
                        password: this.inputPwd
                    }
                ).then(res => {
                    if(res.data.code === 2000) {
                        this.setPwdDialog = false
                    }
                })
            },
            setPwd() {
                this.setPwdDialog = true;
            },
            addActivities() {
                this.show4 = true;
            },
            // 下单请求
            confirmExchange() {
                // 获取工作人员id
                var peopleId;
                this.Peoples.forEach( p => {
                    if(this.form.selectedPeopleName === p.name) {
                        peopleId = p.id
                    }
                });
                // 获取地址id
                var addId;
                this.Addresses.forEach( a => {
                    if (this.form.selectedAddressName === a.address){
                        addId = a.id;
                    }
                });
                this.$http.post(
                    "/trash/score/donationGoodsOrder/placeOrder",
                    {
                        "donationGoodsId":this.productId, //捐赠物品id
                        "workerMessageId":peopleId, //工作人员id
                        "userAddressId":addId, //用户地址id
                        "goodsCount":this.productNum //捐赠数量
                    }
                ).then(res => {
                    this.dialogFormVisible = false;
                }).catch(error => {
                })
            },
            handleClick(i,row) {
                // 判断操作按钮点击类型
                if (i === 1.1) {
                    // 下单
                    // 弹窗
                    this.dialogFormVisible = true;
                    // 存储商品id和捐赠数量
                    this.productId = row.id;
                    this.productNum = row.donationCount;
                    // 获取工作人员列表
                    this.$http.get(
                        "/trash/product/workerMessage/selectWorkerMessage"
                    ).then(res => {
                        this.Peoples = res.data.data;
                        res.data.data.forEach( p => {
                            this.donatePeopleItems.push(p.name);
                        })
                    }).catch(error => {
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
                        this.dialogFormVisible = false
                    })

                } else if (i === 1.2) {
                    // 显示物流
                    // 弹窗
                    this.dialogVisible1 = true;
                    // 请求和显示物流信息
                    this.$http.get(
                        "/trash/product/donationGoods/getLogistics",{
                            params:{
                                donationsGoodsId:row.id
                            }
                        }
                    ).then(res => {
                        this.logistics1 = res.data.data;
                    }).catch(error => {
                        this.dialogVisible1 = false
                    })
                } else if (i === 3.1) {
                    // 确认收货请求
                    this.$http.post(
                        "/trash/score/productOrder/gainGoods",
                        {
                            "id":row.id, //兑换订单主键id
                        }
                    ).then(res => {
                    })
                } else if (i === 4.1) {
                    // 修改地址弹窗
                    this.show5 = true;
                    this.oldActivity = row;
                }
            },
          // 某一条禁用的点击事件
          handle2Click(id) {
            // 发起请求
            this.$http.get(
              "/trash/score/productOrder/cancelOrder?id=" + id
            )
              .then(res => {
                alert("取消订单成功!");
                // 刷新当前页面
                this.reload();
              })
          },
          // 某一条禁用的点击事件
          handle3Click(id) {
            // 发起请求
            this.$http.get(
              "/trash/score/donationGoodsOrder/cancelOrder?id=" + id
            )
              .then(res => {
                alert("取消订单成功!");
                // 刷新当前页面
                this.reload();
              })
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
                } else if (i === 5) {
                    this.show5 = false;
                }
            },
            addActivity(i) {
                // 判断是哪个弹窗的提交请求
                if (i === 4) {
                    // 获取数据
                    let child = this.$refs.ch;
                    this.$http.post(
                        "/trash/address/userAddress/addAddress",
                        {
                            "name":child.goods.name, //收货人姓名
                            "phone":child.goods.phone, //电话
                            "address":child.goods.address, //详细地址
                            "postcode":child.goods.postcode, //邮编
                        }
                    ).then(res => {
                        this.show4 = false
                    }).catch(error => {
                    })
                } else if (i === 5) {
                    // 获取数据
                    let child2 = this.$refs.ch2;
                    this.$http.post(
                        "/trash/address/userAddress/update",
                        {
                            id: child2.activity.id,
                            name: child2.activity.name,
                            phone: child2.activity.phone,
                            address: child2.activity.address,
                            postcode: child2.activity.postcode
                        }
                    ).then(res => {
                        if (res.data.data === 2000){
                            this.show5 = false
                        }
                    })
                }
            },
            // 加载数据
            async getData(val) {
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
                        this.total1 = res.data.data.total;
                        this.pageSize1 = res.data.data.size;
                        this.currentPageIndex1 = res.data.data.current;
                        this.records1 = res.data.data.records;
                    }).catch(error => {
                    })
                } else if(val === 2) {
                    var state = this.filter2.saleable;
                    this.$http.get(
                        "/trash/score/donationGoodsOrder/getListByUser",{
                            params:{
                                pageIndex:this.currentPageIndex2,
                                pageSize:this.pageSize2,
                                state:state, //订单状态【0、失效；1、正常；2、已完成】必填
                            }
                        }
                    ).then(res => {
                        this.total2 = res.data.data.total;
                        this.pageSize2 = res.data.data.size;
                        this.currentPageIndex2 = res.data.data.current;
                        this.records2 = res.data.data.records;
                    }).catch(error => {
                    })

                } else if(val === 3) {
                    var state = this.filter3.saleable;
                    this.$http.get(
                        "/trash/score/productOrder/getOrderListByUser",{
                            params:{
                                pageIndex:this.currentPageIndex3,
                                pageSize:this.pageSize3,
                                state:state,//订单状态【1、在用，2、无效，3、已完成,4、已发货】
                            }
                        }
                    ).then(res => {
                        this.total3 = res.data.data.total;
                        this.pageSize3 = res.data.data.size;
                        this.currentPageIndex3 = res.data.data.current;
                        this.records3 = res.data.data.records;
                    }).catch(error => {
                    })

                } else if(val === 4) {
                    this.$http.get(
                        "/trash/address/userAddress/selectByUser"
                    ).then(res => {
                        this.records4 = res.data.data;
                    }).catch(error => {
                    })

                } else if(val === 5) {
                    this.$http.get(
                        "/trash/score/scoreUser/selectUserScore"
                    ).then(res => {
                        this.records5 = res.data.data.residuceScore;
                    }).catch(error => {
                    })
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
            },
            state2Formatter(row,column) {
                if(row.state === 0) {
                    return "失效";
                } else if(row.state === 1){
                    return "正常";
                } else if(row.state === 2) {
                    return "已完成";
                }
            },
            state3Formatter(row,column) {
                if(row.state === 1) {
                    return "在用";
                } else if(row.state === 2) {
                    return "无效";
                } else if(row.state === 3) {
                    return "已完成";
                } else  if(row.state === 4) {
                    return "已发货"
                }
            },
            defaultAddressFormatter(row,column) {
                if(row.defaultAddressState === 1) {
                    return "是";
                } else if(row.defaultAddressState === 0) {
                    return "否";
                }
            },
            addressTypeFormatter(row,column) {
                if(row.addressType === 1) {
                    return "收货地址";
                } else if(row.addressType === 2) {
                    return "发货地址";
                }
            },
            state4Formatter(row,column) {
                if(row.state === 1) {
                    return "在用";
                } else if(row.state === 0) {
                    return "归档";
                }
            }
        },
        components: {
            AddressForm,
            AddAddressForm,
            EditorAddressForm
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
            },
            filter2: {
                handler() {
                    this.getData(2);
                },
                deep: true
            },
            filter3: {
                handler() {
                    this.getData(3);
                },
                deep: true
            }
        },
        created() {
            this.confirmLogin();
            this.getData(1);
            this.getData(2);
            this.getData(3);
            this.getData(4);
            this.getData(5);

        },
        mounted() {
        },
        filters: {
            // 时间格式化过滤器
            formatDate(time,fm) {
                var date = new Date(time);
                return formatDate(date, fm);
            }
        },
    }
</script>

<style scoped>

</style>
