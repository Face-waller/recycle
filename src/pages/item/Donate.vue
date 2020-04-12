<template>
  <v-card>
    <v-toolbar class="elevation-0">
      <v-spacer/>
      <v-flex xs3>
        状态：
        <v-btn-toggle mandatory v-model.lazy="filter.saleable">
          <v-btn flat :value="1">
            积分审核中
          </v-btn>
          <v-btn flat :value="3">
            待用户下单
          </v-btn>
          <v-btn flat :value="2">
            积分已发放
          </v-btn>
        </v-btn-toggle>
      </v-flex>
      <v-flex xs3>
        <v-text-field
          append-icon="search"
          label="请输入商品名称"
          single-line
          hide-details
          v-model="filter.search"
        />
      </v-flex>
    </v-toolbar>
    <v-divider/>
    <!--    表格-->
    <el-table
      :data="records"
      border
      style="width: 100%">
      <el-table-column
        fixed
        prop="username"
        label="用户"
        width="200">
      </el-table-column>
      <el-table-column
        prop="productKindName"
        label="商品分类"
        width="200">
      </el-table-column>
      <el-table-column
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
        prop="logisticsStatus"
        :formatter="logisFormatter"
        label="物流状态"
        width="200">
      </el-table-column>
      <el-table-column
        prop="donationCount"
        label="捐赠数量"
        width="200">
      </el-table-column>
      <el-table-column
        prop="acquireScore"
        :formatter="scoreFormatter"
        label="捐赠获得的积分"
        width="200">
      </el-table-column>
      <el-table-column
        prop="goodsImages"
        label="图片"
        width="120">
        <!-- 图片的显示 -->
        <template slot-scope="scope">
          <img :src="'http://192.168.43.38:8001/trash/'+scope.row.goodsImages" min-width="50" height="50"/>
        </template>
      </el-table-column>
      <el-table-column
        prop="remark"
        label="备注"
        width="200">
      </el-table-column>

      <el-table-column
        prop="state"
        :formatter="stateFormatter"
        label="捐赠物品状态"
        width="200">
      </el-table-column>
      <el-table-column
        fixed="right"
        label="操作"
        width="200">
        <template slot-scope="scope">
          <template v-if="scope.row.state === 1">
            <el-button @click="handleClick(scope.row)" type="text" size="small">审核给分</el-button>
          </template>
          <template v-if="scope.row.logisticsStatus === 10">
            <el-button @click="handle2Click(scope.row.logisticsStatus,scope.row.id)" type="text" size="small">已派人员上门</el-button>
          </template>
          <template v-else-if="scope.row.logisticsStatus === 21">
            <el-button @click="handle2Click(scope.row.logisticsStatus,scope.row.id)" type="text" size="small">已入库</el-button>
          </template>
          <template v-else-if="scope.row.logisticsStatus === 30">
            <el-button @click="handle2Click(scope.row.logisticsStatus,scope.row.id)" type="text" size="small">已出库</el-button>
          </template>
          <template v-else-if="scope.row.logisticsStatus === 40">
            <el-button @click="handle2Click(scope.row.logisticsStatus,scope.row.id)" type="text" size="small">已送至被捐人</el-button>
          </template>
        </template>
      </el-table-column>
    </el-table>
    <!--    分页-->
    <div class="block" style="text-align: right">
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
    <!--弹出的对话框-->
    <v-dialog max-width="800" v-model="show" persistent scrollable>
      <v-card>
        <!--对话框的标题-->
        <v-toolbar dense dark color="primary">
          <v-toolbar-title>{{isEdit ? '修改' : '新增'}}捐赠物品</v-toolbar-title>
          <v-spacer/>
          <!--关闭窗口的按钮-->
          <v-btn icon @click="closeWindow">
            <v-icon>close</v-icon>
          </v-btn>
        </v-toolbar>
        <!--对话框的内容，表单-->
        <v-card-text class="px-3" style="height: 600px">
          <DonateForm ref="ch" :oldActivity="oldActivity" :step="step" @close="closeWindow" :is-edit="isEdit"/>
        </v-card-text>
        <!--底部按钮，用来操作步骤线-->
        <v-card-actions class="elevation-10">
          <v-flex class="xs3 mx-auto">
            <v-btn @click="addActivity" color="primary">提交</v-btn>
            <v-btn @click="closeWindow" color="info">取消</v-btn>
          </v-flex>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-card>
</template>

<script>
    // 导入自定义的表单组件
    import DonateForm from './DonateForm'

    export default {
        inject: ['reload'],      // 注入App里的reload方法
        name: "Activity",
        data() {
            return {
                total: 1, // 总条数
                pageSize: 5, // 每页数量
                currentPageIndex: 1, //当前页码
                records: [{
                    "id": 0,  //捐赠物品信息id
                    "userId": "",  //用户id
                    "productKindId": "", //商品种类id
                    "donationLogisticsId": "", //捐赠物品物流信息id
                    "goodsName": "",  //商品名称
                    "visitTime": "",  //上门取货时间
                    "donationCount": 0,  //捐赠数量
                    "acquireScore": 0,  //捐赠物品获得的积分
                    "goodsImages": "",  //捐赠物品图片
                    "remark": "",  //备注
                    "logisticsStatus":0, //捐赠物品物流状态
                    "state":0,  // 捐赠物品状态
                    "createTime":"",
                    "modifyTime":"",
                    "productKindName":"", // 商品种类名称
                    "username":"", // 用户姓名
                }],
                filter: {
                    saleable: 1, // 在用/禁用
                    search: '', // 搜索过滤字段
                },
                loading: true, // 是否在加载中
                show: false,// 控制对话框的显示
                oldActivity: {}, // 即将被编辑的活动信息
                isEdit: false, // 是否是编辑
                step: 1, // 子组件中的步骤线索引，默认为1
            }
        },
        mounted() { // 渲染后执行
            // 查询数据
            this.getDataFromServer();
        },
        watch: {
            filter: {// 监视搜索字段
                handler() {
                    this.getDataFromServer();
                },
                deep: true
            }
        },
        methods: {
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
            // 某一条编辑的点击事件
            handleClick(oldActivity) {
                // 修改标记
                this.isEdit = true;
                // 控制弹窗可见：
                this.show = true;
                this.oldActivity = oldActivity;
            },
            // 某一条操作的点击事件
            handle2Click(logisticsStatus,id) {
                // 判断请求类型
                switch (logisticsStatus) {
                    case 10:
                      this.$http.post(
                          "/trash/product/donationGoods/arrangeWorrker",
                          {
                              "id":id
                          }
                      ).then(res => {
                          alert("操作成功!");
                          // 刷新当前页面
                          this.reload();
                      });
                      break;
                    case 21:
                        this.$http.post(
                            "/trash/product/donationGoods/putInStorage",
                            {
                                "id":id
                            }
                        ).then(res => {
                            alert("操作成功!");
                            // 刷新当前页面
                            this.reload();
                        });
                        break;
                    case 30:
                        this.$http.post(
                            "/trash/product/donationGoods/stockRemove",
                            {
                                "id":id,
                                "logisticsStatus":40,
                                "remark":"商品已入库"
                            }
                        ).then(res => {
                            alert("操作成功!");
                            // 刷新当前页面
                            this.reload();
                        });
                        break;
                    case 40:
                        this.$http.post(
                            "/trash/product/donationGoods/stockRemove",
                            {
                                "id":id,
                                "logisticsStatus":50,
                                "remark":"商品已送至被捐人"
                            }
                        ).then(res => {
                            alert("操作成功!");
                            // 刷新当前页面
                            this.reload();
                        });
                        break;
                    default:
                        alert("操作失败!");
                        this.reload();
                }
            },
            addActivity() {
                // 获取表单数据
                let child = this.$refs.ch;
                // 判断是新增还是修改
                if (this.isEdit) {
                    // 修改
                    // 发请求修改活动资讯
                    this.$http.post(
                        "/trash/activity/activityMsg/update",
                    {
                            "id": child.activity.id,
                            "userId": child.activity.userId,
                            "acquireScore": child.activity.acquireScore,
                    })
                    .then(res => {
                        this.closeWindow();
                    })
                    .catch(error => {
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
            getDataFromServer() {
                // 请求页面数据
                // 获取数据
                var pageSize = this.pageSize;
                var currentPageIndex = this.currentPageIndex;
                var param = this.filter.search === null ? " " : this.filter.search;
                var state = this.filter.saleable;
                this.$http.get(
                    "/trash/product/donationGoods/getDonationGoodsList?goodsName=" + param
                    + "&state=" + state
                    + "&pageIndex="+ currentPageIndex
                    + "&pageSize="+ pageSize
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

            },
            addActivities() {
                // 修改标记
                this.isEdit = false;
                // 控制弹窗可见：
                this.show = true;
                // 把oldBrand变为null
                this.oldActivity = {};
            },
            closeWindow() {
                this.isEdit = false;
                // 重新加载数据
                this.getDataFromServer();
                // 关闭窗口
                this.show = false;
                // 将步骤调整到1
                this.step = 1;
            },
            scoreFormatter(row,column){
                if (row.acquireScore === null){
                    return 'NULL';
                }else {
                    return row.acquireScore;
                }
            },
            stateFormatter(row,column){
                if (row.state === 1){
                    return "积分审核中";
                }else if(row.state === 0){
                    return "禁用";
                }else if(row.state === 2){
                    return "积分已发放";
                }else if(row.state === 3){
                    return "待用户下单";
                }else{
                    return "<未识别状态>";
                }
            },
            logisFormatter(row,column) {
                if(row.logisticsStatus === 0){
                    return "商品已添加";
                }else if(row.logisticsStatus === 10){
                    return "等待上门回收";
                }else if(row.logisticsStatus === 21){
                    return "已派人员上门";
                }else if(row.logisticsStatus === 30){
                    return "已入库";
                }else if(row.logisticsStatus === 40){
                    return "已出库"
                }else if(row.logisticsStatus === 50){
                    return "已送至被捐人";
                }else {
                    return "<未识别物流状态>";
                }
            }
        },
        components: {
            DonateForm
        }
    }
</script>

<style scoped>

</style>
