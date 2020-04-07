<template>
  <v-card>
    <v-toolbar class="elevation-0">
      <v-btn color="primary" @click="addCategories">新增商品分类</v-btn>
      <v-spacer/>
      <v-flex xs3>
        状态：
        <v-btn-toggle mandatory v-model.lazy="filter.saleable">
          <v-btn flat :value="true">
            在用
          </v-btn>
          <v-btn flat :value="false">
            禁用
          </v-btn>
        </v-btn-toggle>
      </v-flex>
      <v-flex xs3>
        <v-text-field
          append-icon="search"
          label="请输入商品分类名称"
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
        prop="productName"
        label="商品分类名称"
        width="200">
      </el-table-column>
      <el-table-column
        prop="productKindType"
        label="商品分类类型"
        :formatter="typeFormat"
        width="200">
      </el-table-column>
      <el-table-column
        prop="state"
        :formatter="stateFormat"
        label="状态"
        width="120">
      </el-table-column>
      <el-table-column
        prop="createTime"
        label="新增时间"
        width="200">
      </el-table-column>
      <el-table-column
        fixed="right"
        label="操作"
        width="200">
        <template slot-scope="scope">
          <el-button @click="handleClick(scope.row)" type="text" size="small">编辑</el-button>
          <template v-if="scope.row.state === 1">
            <el-button @click="handle2Click(scope.row.id)" type="text" size="small">禁用</el-button>
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
          <v-toolbar-title>{{isEdit ? '修改' : '新增'}}商品分类</v-toolbar-title>
          <v-spacer/>
          <!--关闭窗口的按钮-->
          <v-btn icon @click="closeWindow">
            <v-icon>close</v-icon>
          </v-btn>
        </v-toolbar>
        <!--对话框的内容，表单-->
        <v-card-text class="px-3" style="height: 600px">
          <CategoryForm ref="ch" :oldCategory="oldCategory" :step="step" @close="closeWindow" :is-edit="isEdit"/>
        </v-card-text>
        <!--底部按钮，用来操作步骤线-->
        <v-card-actions class="elevation-10">
          <v-flex class="xs3 mx-auto">
            <v-btn @click="addCategory" color="primary">提交</v-btn>
            <v-btn @click="closeWindow" color="info">取消</v-btn>
          </v-flex>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-card>
</template>

<script>
  // 导入自定义的表单组件
  import CategoryForm from './CategoryForm'

  export default {
    inject:['reload'],      // 注入App里的reload方法
    name: "Activity",
    data() {
      return {
          total:1, // 总条数
          pageSize:5, // 每页数量
          currentPageIndex:1, //当前页码
          records: [{
              "id": 0,  //主键id
              "productName": "",  //商品种类名称
              "productKindType": 1,
              "state": 0,  //活动种类状态
              "createTime": "",  //创建时间
              "modifyTime": ""  //修改时间
        }],
        filter: {
          saleable: true, // 在用/禁用
          search: '', // 搜索过滤字段
        },
        loading: true, // 是否在加载中
        show: false,// 控制对话框的显示
        oldCategory: {}, // 即将被编辑的活动信息
        isEdit: false, // 是否是编辑
        step: 1, // 子组件中的步骤线索引，默认为1
      }
    },
    mounted() { // 渲染后执行
      // 查询数据
      this.getDataFromServer();
    },
    watch: {
      /*pagination: { // 监视pagination属性的变化
        deep: true, // deep为true，会监视pagination的属性及属性中的对象属性变化
        handler() {
          // 变化后的回调函数，这里我们再次调用getDataFromServer即可
          this.getDataFromServer();
        }
      },*/
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
            console.log(`每页 ${val} 条`);
            this.pageSize = val;
            this.getDataFromServer()
        },
        // 分页页码改变
        handleCurrentChange(val) {
            console.log(`当前页: ${val}`);
            this.currentPageIndex = val;
            this.getDataFromServer()
        },
        // 某一条编辑的点击事件
        handleClick(oldCategory) {
            console.log(oldCategory);
            // 修改标记
            this.isEdit = true;
            // 控制弹窗可见：
            this.show = true;
            this.oldCategory = oldCategory;
        },
        // 某一条禁用的点击事件
        handle2Click(id) {
            console.log(id);
            // 发起请求
            this.$http.get(
                "/trash/product/productKind/delete?productKindId="+id
            )
            .then(res => {
                alert("禁用成功!")
                // 刷新当前页面
                this.reload();
            })
        },
        addCategory() {
            // 获取表单数据
            let child =this.$refs.ch;
            // 判断是新增还是修改
            if (this.isEdit) {
                // 修改
                // 发请求修改商品分类
                var type = child.category.type === '积分兑换商品种类' ? 1 : child.category.type === '捐赠商品种类' ? 2 : '';
                this.$http.post(
                    "/trash/product/productKind/update",
                    {
                        "productName": child.category.name,
                        "productKindType": type,
                    }
                )
                .then(res => {
                    console.log(res.data);
                    this.closeWindow();
                })
                .catch(error => {
                    if(error.response) {
                        this.errmsg = error.response.data.message;
                    } else if (error.request) {
                        console.log("请求超时");
                    } else {
                        console.log("Error: ", error.message);
                    }
                })
            } else {
                // 新增
                // 发请求新增商品分类
                type = child.category.type === '积分兑换商品种类' ? 1 : child.category.type === '捐赠商品种类' ? 2 : '';
                this.$http.post(
                    "/trash/product/productKind/add",
                    {
                        "productName": child.category.name,
                        "productKindType": type,
                    }
                )
                .then(res => {
                    console.log(res.data);
                    this.closeWindow();
                })
                .catch(error => {
                    if(error.response) {
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
            var param = this.filter.search===null?" ":this.filter.search;
            var state = this.filter.saleable===true?1:0;
            this.$http.get(
                "/trash/product/productKind/list?pageSize="+pageSize
                +"&pageIndex="+currentPageIndex
                +"&param="+param
                +"&state="+ state
            ).then(resp => {
                console.log(resp.data)
                this.total = resp.data.data.total;
                this.pageSize =resp.data.data.size;
                this.currentPageIndex = resp.data.data.current;
                this.records = resp.data.data.records;
            }).catch(error => {
                if(error.response) {
                    this.errmsg = error.response.data.message;
                } else if (error.request) {
                    console.log("请求超时");
                } else {
                    console.log("Error: ", error.message);
                }
            })

        },
        addCategories() {
            // 修改标记
            this.isEdit = false;
            // 控制弹窗可见：
            this.show = true;
            // 把oldBrand变为null
            this.oldCategory= {};
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
        stateFormat(row,column){
            if (row.state === 0){
              return '禁用'
            }else if (row.state === 1){
              return '在用'
            }
        },
        typeFormat(row,column) {
            if (row.productKindType === 1) {
                return '积分兑换商品种类'
            } else if (row.productKindType === 2) {
                return '捐赠商品种类'
            }
        }
    },
    components: {
        CategoryForm
    }
  }
</script>

<style scoped>

</style>
