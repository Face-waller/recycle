<template>
  <v-card>
    <v-toolbar class="elevation-0">
      <v-spacer/>
      <v-flex xs3>
      </v-flex>
      <v-flex xs3>
        <v-text-field
          append-icon="search"
          label="请输入商户名称"
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
        prop="name"
        label="商户名称"
        width="200">
      </el-table-column>
      <el-table-column
        fixed
        prop="bossName"
        label="老板姓名"
        width="200">
      </el-table-column>
      <el-table-column
        fixed
        prop="phone"
        label="商户电话"
        width="200">
      </el-table-column>
      <el-table-column
        fixed
        prop="address"
        label="商户地址"
        width="200">
      </el-table-column>
      <el-table-column
        fixed
        prop="shopIntroduce"
        label="回收物品介绍"
        width="200">
      </el-table-column>
      <el-table-column
        prop="images"
        label="商户图片"
        width="300">
        <!-- 图片的显示 -->
        <template slot-scope="scope">
          <img :src="'http://127.0.0.1:8001/trash/'+scope.row.images" min-width="50" height="50"/>
        </template>
      </el-table-column>
      <el-table-column
        fixed
        prop="reputationScore"
        label="信誉积分"
        width="200">
      </el-table-column>
      <el-table-column
        prop="createTime"
        label="创建时间"
        width="200">
      </el-table-column>
      <el-table-column
        fixed="right"
        label="操作"
        width="300">
        <template slot-scope="scope">
          <el-button @click="handleClick(scope.row)" type="text" size="small">编辑信誉分</el-button>
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
    <el-dialog title="编辑信誉分" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <v-text-field label="信誉分" v-model="form.donationCount" :counter="200" hide-details/>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="doSetScore">确认</el-button>
      </div>
    </el-dialog>
  </v-card>
</template>

<script>
    // 导入自定义的表单组件

    export default {
        inject: ['reload'],      // 注入App里的reload方法
        name: "Employees",
        data() {
            return {
                total: 1, // 总条数
                pageSize: 5, // 每页数量
                currentPageIndex: 1, //当前页码
                records: [{
                    "id": "",  //上门回收物品工作人员信息id
                    "name": "",  //姓名
                    "bossName": "", //电话
                    "phone": "", //身份证号
                    "address": "", //照片地址
                    "shopIntroduce": "",  //状态(0、离职；1、空闲；2、接单中)
                    "images": "",  //创建时间
                    "reputationScore": "",  //修改时间
                    "createTime": "",
                    "modifyTime": ""
                }],
                filter: {
                    search: '', // 搜索过滤字段
                },
                form:{
                    donationCount:"", // 信誉分
                },
                ID:"", // 要编辑的商户id
                dialogFormVisible:false,
                loading: true, // 是否在加载中
                show: false,// 控制对话框的显示
                oldGoods: {}, // 即将被编辑的活动信息
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
            handleClick(oldGoods) {
                this.ID = oldGoods.id;
                this.dialogFormVisible = true
            },
            doSetScore() {
                this.$http.post(
                    "/trash/commercial/commercialTenant/setScore",
                    {
                        id: this.ID,
                        reputationScore: this.form.donationCount
                    }
                ).then(res => {
                        if (res.data.code === 2000) {
                            this.dialogFormVisible = false;
                            this.reload();
                        }
                    }
                )
            },
            getDataFromServer() {
                // 请求页面数据
                // 获取数据
                var pageSize = this.pageSize;
                var currentPageIndex = this.currentPageIndex;
                var param = this.filter.search === null ? " " : this.filter.search;
                this.$http.get(
                    "/trash/commercial/commercialTenant/getList",{
                        params:{
                            pageIndex:currentPageIndex,
                            pageSize:pageSize,
                            name:param
                        }
                    }
                ).then(resp => {
                    this.total = resp.data.data.total;
                    this.pageSize = resp.data.data.size;
                    this.currentPageIndex = resp.data.data.current;
                    this.records = resp.data.data.records;
                })
            },
        },
        components: {

        }
    }
</script>

<style scoped>

</style>
