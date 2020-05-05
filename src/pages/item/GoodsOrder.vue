<template>
  <v-card>
    <v-toolbar class="elevation-0">
      <v-spacer/>
      <v-flex xs3>
        状态：
        <v-btn-toggle mandatory v-model.lazy="filter.saleable">
          <v-btn flat :value="true">
            在用
          </v-btn>
          <v-btn flat :value="false">
            已完成
          </v-btn>
        </v-btn-toggle>
      </v-flex>
      <v-flex xs3>
        <v-text-field
          append-icon="search"
          label="请输入商品名称或下单用户名称"
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
        prop="orderNumber"
        label="订单号"
        width="200">
      </el-table-column>
      <el-table-column
        prop="productName"
        label="商品名称"
        width="200">
      </el-table-column>
      <el-table-column
        prop="productCount"
        label="下单商品数量"
        width="200">
      </el-table-column>
      <el-table-column
        prop="deliveryTime"
        label="发货时间"
        width="300">
      </el-table-column>
      <el-table-column
        prop="recvingTime"
        label="收货时间"
        width="300">
      </el-table-column>
      <el-table-column
        prop="expendScore"
        label="消费积分"
        width="300">
      </el-table-column>
      <el-table-column
        prop="trackingNumber"
        label="快递单号"
        width="300">
      </el-table-column>
      <el-table-column
        prop="state"
        :formatter="stateFormat"
        label="状态"
        width="120">
      </el-table-column>
      <el-table-column
        prop="createTime"
        label="订单创建时间"
        width="300">
      </el-table-column>
      <el-table-column
        prop="userName"
        label="下单用户名称"
        width="300">
      </el-table-column>
      <el-table-column
        fixed="right"
        label="操作"
        width="200">
        <template slot-scope="scope">
          <el-button @click="handleClick(scope.row.id)" type="text" size="small">填写快递单号</el-button>
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
          <v-toolbar-title>请填写</v-toolbar-title>
          <v-spacer/>
          <!--关闭窗口的按钮-->
          <v-btn icon @click="closeWindow">
            <v-icon>close</v-icon>
          </v-btn>
        </v-toolbar>
        <!--对话框的内容，表单-->
        <v-card-text class="px-3" style="height: 600px">
          <GoodsOrderForm ref="ch" @close="closeWindow"/>
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
  import GoodsOrderForm from './GoodsOrderForm'

  export default {
    inject: ['reload'],      // 注入App里的reload方法
    name: "GoodsOrder",
    data() {
      return {
        ID:"", // 被弹窗的订单id
        total: 1, // 总条数
        pageSize: 5, // 每页数量
        currentPageIndex: 1, //当前页码
        records: [{
          "id": "",  //兑换订单主键id
          "orderNumber": "",  //订单号
          "productId":"", //商品id
          "productCount": "", //商品数量
          "deliveryTime": "",  //发货时间
          "recvingTime": "",  //收货时间
          "expendScore": "",  //消费积分
          "trackingNumber": "",  //快递单号
          "state": "",  //活动状态
          "createTime": "",  //创建时间
          "productName": "",  //商品名称
          "userName": "",  //下单用户名称
          "modifyTime": ""  //修改时间
        }],
        filter: {
          saleable: true, // 在用/禁用
          search: '', // 搜索过滤字段
        },
        loading: true, // 是否在加载中
        show: false,// 控制对话框的显示
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
        // 控制弹窗可见：
        this.show = true;
        this.ID = oldActivity
      },
      // 某一条禁用的点击事件
      handle2Click(id) {
        // 发起请求
        this.$http.get(
          "/trash/activity/activityMsg/delete?activityId=" + id
        )
          .then(res => {
            alert("禁用成功!");
            // 刷新当前页面
            this.reload();
          })
      },
      addActivity() {
        // 获取表单数据
        let child = this.$refs.ch;
        this.$http.post(
            "/trash/score/productOrder/updateTime",
            {
                id:this.ID,
                deliveryTime:child.goods.date,
                trackingNumber:child.goods.name,
            }
        ).then(res => {
            if (res.data.code === 2000) {
                this.reload();
            }
        })

      },
      getDataFromServer() {
        // 请求页面数据
        // 获取数据
        var pageSize = this.pageSize;
        var currentPageIndex = this.currentPageIndex;
        var param = this.filter.search === null ? " " : this.filter.search;
        var state = this.filter.saleable === true ? 1 : 2;
        this.$http.get(
          "/trash/score/productOrder/list?pageSize=" + pageSize
          + "&pageIndex=" + currentPageIndex
          + "&param=" + param
          + "&state=" + state
        ).then(resp => {
          this.total = resp.data.data.total;
          this.pageSize = resp.data.data.size;
          this.currentPageIndex = resp.data.data.current;
          this.records = resp.data.data.records;
        })

      },
      addActivities() {
        // 修改标记
        // 控制弹窗可见：
        this.show = true;
      },
      closeWindow() {
        // 重新加载数据
        this.getDataFromServer();
        // 关闭窗口
        this.show = false;
      },
      stateFormat(row,column){
        if (row.state === 2){
          return '已完成'
        }else if (row.state === 1){
          return '在用'
        }
      }
    },
    components: {
        GoodsOrderForm
    }
  }
</script>

<style scoped>

</style>
