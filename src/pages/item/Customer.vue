<template>
  <v-card>
    <v-toolbar class="elevation-0">
      <v-spacer/>
      <v-flex xs3>
      </v-flex>
      <v-flex xs3>
        <v-text-field
          append-icon="search"
          label="请输入用户名"
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
        label="用户名"
        width="200">
      </el-table-column>
      <el-table-column
        prop="isSuperuser"
        :formatter="isSuperFormat"
        label="是否为管理员"
        width="300">
      </el-table-column>
      <el-table-column
        prop="status"
        :formatter="stateFormat"
        label="用户状态"
        width="300">
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
          <el-button @click="handleClick(scope.row)" type="text" size="small">重置密码</el-button>
          <template v-if="scope.row.status === 1">
            <el-button @click="handle2Click(scope.row.userId)" type="text" size="small">禁用</el-button>
          </template>
          <template v-if="scope.row.isSuperuser === 0">
            <el-button @click="handle3Click(scope.row.userId)" type="text" size="small">设为管理员</el-button>
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
                    "userId": "",  //上门回收物品工作人员信息id
                    "username": "",  //姓名
                    "password": "", //电话
                    "isSuperuser": "", //身份证号
                    "email": "", //照片地址
                    "mobile": "",  //状态(0、离职；1、空闲；2、接单中)
                    "salt": "",  //创建时间
                    "status": "",  //修改时间
                    "createTime": "",
                    "modifyTime": ""
                }],
                filter: {
                    search: '', // 搜索过滤字段
                },
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
                this.$http.get(
                    "/trash/user/user/resetPassword",{
                        params:{
                            userId:oldGoods.userId
                        }
                    }
                ).then(res => {
                    if (res.data.code === 2000) {
                        this.reload();
                    }
                  }
                )
            },
            // 某一条离职的点击事件
          handle2Click(id) {
            // 发起请求
            this.$http.get(
              "trash/user/user/forbiddenUser",{
                params:{
                  userId:id
                }
              }
            )
              .then(res => {
                if (res.data.code === 2000) {
                  // 刷新当前页面
                  this.reload();
                }
              })
          },
          // 某一条设为管理员的点击事件
          handle3Click(id) {
            // 发起请求
            this.$http.get(
              "trash/user/user/setSuperUser",{
                params:{
                  userId:id
                }
              }
            )
              .then(res => {
                if (res.data.code === 2000) {
                  // 刷新当前页面
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
                this.$http.get(
                    "/trash/user/user/getAllList",{
                        params:{
                            pageIndex:currentPageIndex,
                            pageSize:pageSize,
                            userName:param
                        }
                    }
                ).then(resp => {
                    this.total = resp.data.data.total;
                    this.pageSize = resp.data.data.size;
                    this.currentPageIndex = resp.data.data.current;
                    this.records = resp.data.data.records;
                })
            },
            stateFormat(row,column) {
                if (row.status === 0){
                    return '禁用'
                }else if (row.status === 1){
                    return '正常'
                }
            },
            isSuperFormat(row,column) {
                if (row.isSuperuser === 0) {
                    return '不是'
                } else if (row.isSuperuser === 1) {
                    return '是'
                }
            }
        },
        components: {

        }
    }
</script>

<style scoped>

</style>
