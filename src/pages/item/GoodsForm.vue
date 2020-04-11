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
              v-model="typeIdName"
            ></v-select>
            <v-text-field label="名称" v-model="goods.goodsName" :counter="200"  hide-details/>
            <v-flex xs3>
              <span style="font-size: 16px; color: #444">图片：</span>
            </v-flex>
            <input type="file" v-on:change="pictureModel($event)" accept="*" id="crowd_file">
            <v-text-field label="商品原价" v-model="goods.goodsOriPrice" :counter="200" hide-details/>
            <v-text-field label="商品现价" v-model="goods.goodsCurPrice" :counter="200" hide-details/>
            <v-text-field label="兑换所需积分" v-model="goods.integral" :counter="200" hide-details/>
            <v-text-field label="商品总数" v-model="goods.goodsTotal" :counter="200" hide-details/>
            <v-text-field label="商品库存" v-model="goods.goodsStock" :counter="200" hide-details/>
            <div class="block">
              <span class="demonstration">上架时间</span>
              <el-date-picker
                v-model="goods.putAwayTime"
                type="datetime"
                value-format="yyyy-MM-dd HH:mm:ss"
                placeholder="">
              </el-date-picker>
            </div>
            <div class="block">
              <span class="demonstration">下架时间</span>
              <el-date-picker
                v-model="goods.soldOutTime"
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
                items:[], // 商品分类的名称选项
                goodsTypeItems: [  // 商品分类id和名称对应列表,以便父组件将分类名称转化为分类id
                    {
                        id : 0,
                        productName : ''
                    }
                ],
                valid:false,
                goods: {
                    id: 0, // 商品id
                    typeId: 0, // 商品分类id
                    goodsName: "", // 商品名称
                    goodsImage: "", // 商品图片
                    goodsOriPrice: '', // 商品原价
                    goodsCurPrice:'', // 商品现价
                    integral:'', // 积分
                    goodsTotal:0, // 总数
                    goodsStock:0, // 库存
                    putAwayTime:'', // 上架时间
                    soldOutTime:''  // 下架时间
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
                    res.data.data.forEach(n => this.items.push(n.productName));
                    res.data.data.forEach(g => this.goodsTypeItems.push(g))
                });
                this.$http.get(
                    "/trash/product/productKind/selectAll?productKindType=2"
                ).then(res => {
                    res.data.data.forEach(n => this.items.push(n.productName));
                    res.data.data.forEach(g => this.goodsTypeItems.push(g))
                })

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
                        this.goods.image = res.data.data;
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
                        this.goods.typeId = val.typeId;
                        this.goods.goodsName = val.goodsName;
                        this.goods.goodsImage = val.goodsImage;
                        this.goods.goodsOriPrice = val.goodsOriPrice;
                        this.goods.goodsCurPrice = val.goodsCurPrice;
                        this.goods.integral = val.integral;
                        this.goods.goodsTotal = val.goodsTotal;
                        this.goods.goodsStock = val.goodsStock;
                        this.goods.putAwayTime = val.putAwayTime;
                        this.goods.soldOutTime = val.soldOutTime;
                    } else {
                        // 为空，初始化goods
                        this.goods = {
                            id: 0,
                            typeId: 0, // 商品分类id
                            goodsName: "", // 商品名称
                            goodsImage: "", // 商品图片
                            goodsOriPrice: '', // 商品原价
                            goodsCurPrice:'', // 商品现价
                            integral:'', // 积分
                            goodsTotal:0, // 总数
                            goodsStock:0, // 库存
                            putAwayTime:'', // 上架时间
                            soldOutTime:''  // 下架时间
                        }
                    }
                },
                deep: true
            }
        },
        computed: {
            // 商品分类名称和id直接的转化
            typeIdName: function () {
                this.goodsTypeItems.forEach(t => function () {
                    if (t.id === this.goods.typeId) {
                        return t.productName;
                    }
                });
                return "<未识别的分类>";
            }
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

