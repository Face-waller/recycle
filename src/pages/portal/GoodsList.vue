<template>
  <div style="margin-top: 20px">
    <template v-for="(item,i) in records">
        <el-col :span="4" :offset="3">
          <el-card :body-style="{ padding: '0px' }" shadow="hover">
            <img :src="'http://127.0.0.1:8001/trash/'+item.productImages" min-width="250" height="250" class="image">
            <div style="padding: 14px;">
              <span>{{item.productName}}</span>
              <br>
              <span>所需积分: {{item.needPoints}}</span>
              <div class="bottom clearfix">
                <el-button type="text" class="button" @click="exchange(item.id)">兑换</el-button>
              </div>
            </div>
          </el-card>
        </el-col>
    </template>
    <!--    分页-->
    <el-col :span="6" :offset="18">
      <div class="block" style="text-align: right; position:fixed; bottom:100px">

          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page.sync="currentPageIndex"
            :page-sizes="[5, 10, 15, 20]"
            :page-size="pageSize"
            layout="sizes, prev, pager, next"
            :total="total">
          </el-pagination>
      </div>
    </el-col>
    <el-dialog title="下单兑换" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="收货地址:" :label-width="formLabelWidth">
          <v-select
            :items="shipAddressItems"
            label="请选择收货地址"
            v-model="form.selectedAddressName"
          ></v-select>
        </el-form-item>
        <el-form-item label="数量:" :label-width="formLabelWidth">
          <el-input-number v-model="form.num" @change="handleChange" :min="1" label="描述文字"></el-input-number>
        </el-form-item>
        <span>共需积分: {{ isNaN(form.num*currentGoodsIntegral) ? 0 : (form.num*currentGoodsIntegral)}}</span>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="confirmExchange">确认兑换</el-button>
      </div>
    </el-dialog>
  </div>

</template>

<script>
    export default {
        name: "GoodsList",
        data() {
            return {
                total: 1, // 总条数
                pageSize: 5, // 每页数量
                currentPageIndex: 1, //当前页码
                records: [{
                    "id": 0, // 商品id
                    "productKindId": 0, // 商品分类id
                    "productKindName":"", // 商品分类名称
                    "productName": "", // 商品名称
                    "productImages": "", // 商品图片
                    "commodityPrice": '', // 商品原价
                    "productPrice":'', // 商品现价
                    "needPoints":'', // 积分
                    "totalNumber":0, // 总数
                    "stockNumber":0, // 库存
                    "productPutawayTime":'', // 上架时间
                    "productSoldOutTime":'',  // 下架时间
                    "state":0 , // 状态-在用/下架
                    "createTime":'',
                    "modifyTime":'',
                }],
                addresses: [
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
                shipAddressItems: [ // 地址名称列表

                ],
                dialogFormVisible: false,
                currentGoodsId: Number, // 当前所选商品id
                currentGoodsStock: Number, // 当前所选商品库存
                currentGoodsIntegral: Number, // 当前所选商品单价积分
                formLabelWidth: '120px',
                form : {
                    selectedAddressName: String, // 选择的地址名称
                    num : 1
                }
            }
        },
        methods: {
            // 计数器数值改变
            handleChange(value) {
                if (value > this.currentGoodsStock) {
                    this.form.num = this.currentGoodsStock;
                    alert("库存不足，选择数量需要低于库存数")
                }
            },
            // 分页条数改变
            handleSizeChange(val) {
                // console.log(`每页 ${val} 条`);
                this.pageSize = val;
                this.getDataFromServer()
            },
            // 分页页码改变
            handleCurrentChange(val) {
                // console.log(`当前页: ${val}`);
                this.currentPageIndex = val;
                this.getDataFromServer()
            },
            // 兑换商品弹窗
            exchange(id) {
                this.shipAddressItems = [];
                this.currentGoodsId = id;
                this.records.forEach( r => {
                    if (r.id === id) {
                        this.currentGoodsIntegral = r.needPoints;
                        this.currentGoodsStock = r.stockNumber;
                    }
                });
                this.dialogFormVisible = true;
                // 获取收货地址
                this.$http.get(
                    "/trash/address/userAddress/selectByUser"
                ).then(res => {
                    this.addresses = res.data.data;
                    this.addresses.forEach( a => {
                        if (a.addressType === 1) {
                            this.shipAddressItems.push(a.address)
                        }
                    });
                }).catch(error => {
                    if (this.shipAddressItems.length <= 0) {
                        alert("获取收货地址失败!");
                        this.dialogFormVisible = false
                    }
                });
            },

            // 兑换请求
            confirmExchange() {
                // 获取用户选择的地址id
                var id;
                this.addresses.forEach( a => {
                    if (a.address === this.form.selectedAddressName) {
                        id = a.id;
                    }
                });
                if (id === null) {
                    alert("用户所选地址不正确!");
                    return;
                }
                if (this.form.num === Number || this.form.num <= 0) {
                    alert("数量不能小于1!");
                    return;
                }
                this.$http.post(
                    "/trash/score/productOrder/addOrder",
                    {
                        "productId":this.currentGoodsId,
                        "userAddressId":id,
                        "productCount":this.form.num,
                    }
                ).then(res => {
                    alert("兑换成功!");
                    this.dialogFormVisible = false;
                }).catch(error => {
                    alert("兑换失败!");
                })
            },
            getDataFromServer() {
                // 请求页面数据
                // 获取数据
                var pageSize = this.pageSize;
                var currentPageIndex = this.currentPageIndex;
                // 显示的肯定是在用而非禁用的商品,所以state = 1
                this.$http.get(
                    "/trash/product/product/productList?pageIndex=" + currentPageIndex
                    + "&pageSize=" + pageSize
                    + "&param=" + " "
                    + "&state=" + 1
                    + "&productKindId="

                ).then(resp => {
                    this.total = resp.data.data.total;
                    this.pageSize = resp.data.data.size;
                    this.currentPageIndex = resp.data.data.current;
                    this.records = resp.data.data.records;
                }).catch(error => {
                    if (error.response) {
                        this.errmsg = error.response.data.message;
                    } else if (error.request) {
                        console.log("请求超时");
                    } else {
                        console.log("Error: ", error.message);
                    }
                })
            }
        },
        watch: {
            // 弹窗关闭
            dialogFormVisible(val) {
                if (val === false) {
                    this.currentGoodsStock = Number;
                    this.currentGoodsIntegral = Number;
                    this.currentGoodsId = Number;
                    this.form.selectedAddressName = String;
                    this.form.num = 1;
                }
            }
        },
        created() {
            this.getDataFromServer();
        }
    }
</script>

<style scoped>

</style>
