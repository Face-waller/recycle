<template>
  <v-stepper v-model="step">
    <v-stepper-items>
      <!--1、基本信息-->
      <v-stepper-content step="1">
        <v-flex class="xs10 mx-auto">
          <v-form v-model="valid" ref="basic">
            <v-select
              :items="items"
              label="请选择商品分类"
              v-model="goods.productKindName"
            ></v-select>
            <v-text-field label="名称" v-model="goods.productName" :counter="200"  hide-details/>
            <v-flex xs3>
              <span style="font-size: 16px; color: #444">图片：</span>
            </v-flex>
            <input type="file" v-on:change="pictureModel($event)" accept="*" id="crowd_file">
            <v-text-field label="商品原价" v-model="goods.commodityPrice" :counter="200" hide-details/>
            <v-text-field label="商品现价" v-model="goods.productPrice" :counter="200" hide-details/>
            <v-text-field label="兑换所需积分" v-model="goods.needPoints" :counter="200" hide-details/>
            <v-text-field label="商品总数" v-model="goods.totalNumber" :counter="200" hide-details/>
            <v-text-field label="商品库存" v-model="goods.stockNumber" :counter="200" hide-details/>
            <div class="block">
              <span class="demonstration">上架时间</span>
              <el-date-picker
                v-model="goods.productPutawayTime"
                type="datetime"
                value-format="yyyy-MM-dd HH:mm:ss"
                placeholder="">
              </el-date-picker>
            </div>
            <div class="block">
              <span class="demonstration">下架时间</span>
              <el-date-picker
                v-model="goods.productSoldOutTime"
                type="datetime"
                value-format="yyyy-MM-dd HH:mm:ss"
                placeholder="">
              </el-date-picker>
            </div>
          </v-form>
        </v-flex>
      </v-stepper-content>
    </v-stepper-items>
  </v-stepper>
</template>

<script>
    export default {
        name: "GoodsForm",
        props: {
            oldGoods: {
                type: Object
            },
            isEdit: {
                type: Boolean,
                default: false
            },
            step: {
                type: Number,
                default: 1
            }
        },
        data() {
            return {
                items:[

                ], // 商品分类的名称选项
                valid:false,
                goods: {
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
                },

            };
        },
        methods: {
            // 加载商品分类
            loadGoodsType() {
                // 发起请求
                this.$http.get(
                    "/trash/product/productKind/selectAll?productKindType=1"
                ).then(res => {
                    res.data.data.forEach(n => this.items.push(n.productName))
                });
            },
            pictureModel(e) {
                // 获取图片
                var file = e.target.files[0];
                // console.log(file);
                let data = new FormData();
                data.append("file",file);
                // 发起请求存图片
                this.$http.post(
                    "/trash/activity/activityMsg/uploadImg",
                    data
                )
                    .then(res => {
                        this.goods.productImages = res.data.data;
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
        mounted() {
            this.loadGoodsType();
        },
        watch: {
            oldGoods: {// 监控oldGoods的变化
                handler(val) {
                    if (val) {
                        this.goods.id = val.id;
                        this.goods.productKindId = val.productKindId;
                        this.goods.productKindName = val.productKindName;
                        this.goods.productName = val.productName;
                        this.goods.productImages = val.productImages;
                        this.goods.commodityPrice = val.commodityPrice;
                        this.goods.productPrice = val.productPrice;
                        this.goods.needPoints = val.needPoints;
                        this.goods.totalNumber = val.totalNumber;
                        this.goods.stockNumber = val.stockNumber;
                        this.goods.productPutawayTime = val.productPutawayTime;
                        this.goods.productSoldOutTime = val.productSoldOutTime;
                    } else {
                        // 为空，初始化goods
                        this.goods = {
                            id: 0,
                            productKindId: 0, // 商品分类id
                            productKindName: '',
                            productName: "", // 商品名称
                            productImages: "", // 商品图片
                            commodityPrice: '', // 商品原价
                            productPrice:'', // 商品现价
                            needPoints:'', // 积分
                            totalNumber:0, // 总数
                            stockNumber:0, // 库存
                            productPutawayTime:'', // 上架时间
                            productSoldOutTime:''  // 下架时间
                        }
                    }
                },
                deep: true
            }
        },
        computed: {
        }
    };
</script>


<style>
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>

