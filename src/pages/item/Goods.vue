<template>
  <v-card>
    <v-toolbar class="elevation-0">
      <v-btn color="primary" @click="addActivities">新增商品</v-btn>
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
        prop="productKindName"
        label="分类名称"
        width="200">
      </el-table-column>
      <el-table-column
        prop="goodsName"
        label="名称"
        width="200">
      </el-table-column>
      <el-table-column
        prop="goodsImage"
        label="图片"
        width="120">
        <!-- 图片的显示 -->
        <template slot-scope="scope">
          <img :src="'http://127.0.0.1:8001/trash/'+scope.row.goodsImage" min-width="50" height="50"/>
        </template>
      </el-table-column>
      <el-table-column
        prop="goodsOriPrice"
        label="原价"
        width="200">
      </el-table-column>
      <el-table-column
        prop="goodsCurPrice"
        label="现价"
        width="200">
      </el-table-column>
      <el-table-column
        prop="integral"
        label="兑换所需积分"
        width="200">
      </el-table-column>
      <el-table-column
        prop="goodsTotal"
        label="商品总数"
        width="300">
      </el-table-column>
      <el-table-column
        prop="goodsStock"
        label="商品库存"
        width="200">
      </el-table-column>
      <el-table-column
        prop="putAwayTime"
        label="上架时间"
        width="200">
      </el-table-column>
      <el-table-column
        prop="soldOutTime"
        label="下架时间"
        width="200">
      </el-table-column>
      <el-table-column
        prop="state"
        :formatter="stateFormat"
        label="状态"
        width="120">
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
          <v-toolbar-title>{{isEdit ? '修改' : '新增'}}商品</v-toolbar-title>
          <v-spacer/>
          <!--关闭窗口的按钮-->
          <v-btn icon @click="closeWindow">
            <v-icon>close</v-icon>
          </v-btn>
        </v-toolbar>
        <!--对话框的内容，表单-->
        <v-card-text class="px-3" style="height: 600px">
          <GoodsForm ref="ch" :oldGoods="oldGoods" :step="step" @close="closeWindow" :is-edit="isEdit"/>
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
    import GoodsForm from './GoodsForm'

    export default {
        inject: ['reload'],      // 注入App里的reload方法
        name: "Goods",
        data() {
            return {
                fatherGoodsTypeItems: [ // 所有商品分类信息
                    {
                        id : 0,
                        productName : ''
                    }
                ],
                total: 1, // 总条数
                pageSize: 5, // 每页数量
                currentPageIndex: 1, //当前页码
                records: [{
                    "id": 0, // 商品id
                    "typeId": 0, // 商品分类id
                    "productKindName":0, // 商品分类名称
                    "goodsName": "", // 商品名称
                    "goodsImage": "", // 商品图片
                    "goodsOriPrice": '', // 商品原价
                    "goodsCurPrice":'', // 商品现价
                    "integral":'', // 积分
                    "goodsTotal":0, // 总数
                    "goodsStock":0, // 库存
                    "putAwayTime":'', // 上架时间
                    "soldOutTime":'',  // 下架时间
                    "state":0 , // 状态-在用/下架
                    "createTime":'',
                    "modifyTime":'',
                }],
                filter: {
                    saleable: true, // 在用/禁用
                    search: '', // 搜索过滤字段
                },
                loading: true, // 是否在加载中
                show: false,// 控制对话框的显示
                oldGoods: {}, // 即将被编辑的商品信息
                isEdit: false, // 是否是编辑
                step: 1, // 子组件中的步骤线索引，默认为1
            }
        },
        mounted() { // 渲染后执行
            // 查询数据
            this.getDataFromServer();
            // 查询所有分类信息
            this.getAllGoodsTypeInfo();
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
                // 修改标记
                this.isEdit = true;
                // 控制弹窗可见：
                this.show = true;
                this.oldGoods = oldGoods;
            },
            // 某一条禁用的点击事件
            handle2Click(id) {
                // 发起请求
                this.$http.get(
                    "/trash/product/product/deleteProduct?productId" + id
                )
                    .then(res => {
                        alert("禁用成功!");
                        // 刷新当前页面
                        this.reload();
                    })
            },
            getAllGoodsTypeInfo() {
                // 发起请求
                this.$http.get(
                    "/trash/product/productKind/selectAll?productKindType=1"
                ).then(res => {
                    res.data.data.forEach(g => this.fatherGoodsTypeItems.push(g))
                });
                this.$http.get(
                    "/trash/product/productKind/selectAll?productKindType=2"
                ).then(res => {
                    res.data.data.forEach(g => this.fatherGoodsTypeItems.push(g))
                })
            },
            addActivity() {
                // 获取表单数据
                let child = this.$refs.ch;
                // 判断是新增还是修改
                if (this.isEdit) {
                    // 修改
                    // 发请求修改商品
                    // 获取商品分类值
                    var typeNameId;
                    this.fatherGoodsTypeItems.forEach(f => function () {
                        if (f.productName === child.typeIdName) {
                            typeNameId = f.id;
                            return null;
                        }
                    });
                    this.$http.post(
                        "/trash/product/product/update",
                        {
                            "id": child.goods.id,
                            "productKindId": typeNameId,
                            "productName": child.goods.goodsName,
                            "productImages": child.goods.goodsImage,
                            "commodityPrice": child.goods.goodsOriPrice,
                            "productPrice": child.goods.goodsCurPrice,
                            "needPoints": child.goods.integral,
                            "totalNumber": child.goods.goodsTotal,
                            "stockNumber": child.goods.goodsStock,
                            "productPutawayTime": child.goods.putAwayTime,
                            "productSoldOutTime": child.goods.soldOutTime,
                        }
                    )
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

                } else {
                    // 新增
                    // 发请求新增商品
                    // 获取商品分类值
                    var typeNameId;
                    this.fatherGoodsTypeItems.forEach(f => function () {
                        if (f.productName === child.typeIdName) {
                            typeNameId = f.id;
                        }
                    });
                    this.$http.post(
                        "/trash/product/product/addProduct",
                        {
                            "productKindId": typeNameId,
                            "productName": child.goods.goodsName,
                            "productImages": child.goods.goodsImage,
                            "commodityPrice": child.goods.goodsOriPrice,
                            "productPrice": child.goods.goodsCurPrice,
                            "needPoints": child.goods.integral,
                            "totalNumber": child.goods.goodsTotal,
                            "stockNumber": child.goods.goodsStock,
                            "productPutawayTime": child.goods.putAwayTime,
                            "productSoldOutTime": child.goods.soldOutTime,
                        }
                    )
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
                var state = this.filter.saleable === true ? 1 : 0;
                this.$http.get(
                    "/trash/product/product/productList?pageIndex=" + currentPageIndex
                    + "&pageSize=" + pageSize
                    + "&param=" + param
                    + "&state=" + state
                    + "&productKindId="

                ).then(resp => {
                    this.total = resp.data.data.total;
                    this.pageSize = resp.data.data.size;
                    this.currentPageIndex = resp.data.data.current;
                    // 接收到的json键名和data里的定义的不同
                    for(var itemIndex in resp.data.data.records) {
                        this.records[itemIndex] = resp.data.data.records[itemIndex];
                    }
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
                // 把oldGoods变为null
                this.oldGoods = {};
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
                    return '下架'
                }else if (row.state === 1){
                    return '在用'
                }
            },
        },
        components: {
            GoodsForm
        }
    }
</script>

<style scoped>

</style>
