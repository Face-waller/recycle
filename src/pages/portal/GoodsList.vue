<template>
  <div style="margin-top: 20px">
    <template v-for="(item,i) in records">
        <el-col :span="4" :offset="3">
          <el-card :body-style="{ padding: '0px' }" shadow="hover">
            <img :src="'http://192.168.43.38:8001/trash/'+item.productImages" min-width="250" height="250" class="image">
            <div style="padding: 14px;">
              <span>{{item.productName}}</span>
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
                items: [
                    {
                        src: 'https://cdn.vuetifyjs.com/images/carousel/squirrel.jpg',
                    },
                    {
                        src: 'https://cdn.vuetifyjs.com/images/carousel/sky.jpg',
                    },
                    {
                        src: 'https://cdn.vuetifyjs.com/images/carousel/bird.jpg',
                    },
                    {
                        src: 'https://cdn.vuetifyjs.com/images/carousel/planet.jpg',
                    },
                ],
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
            // 兑换商品
            exchange(id) {
                //
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
        created() {
            this.getDataFromServer();
        }
    }
</script>

<style scoped>

</style>
