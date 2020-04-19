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
            <v-text-field label="名称" v-model="goods.goodsName" :counter="200"  hide-details/>
            <v-flex xs3>
              <span style="font-size: 16px; color: #444">图片：</span>
            </v-flex>
            <input type="file" v-on:change="pictureModel($event)" accept="*" id="crowd_file">
            <v-text-field label="捐赠数量" v-model="goods.donationCount" :counter="200" hide-details/>
            <div class="block">
              <span class="demonstration">工作人员上门取货时间</span>
              <el-date-picker
                v-model="goods.visitTime"
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
        name: "AddressForm",
        props: {
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
                typeData:[
                    {
                        "id": 0,  //商品种类id
                        "productName": ""  //商品种类名称
                    }
                ],
                valid:false,
                goods: {
                    "id": 0, // 商品id
                    "productKindId": 0, // 商品分类id
                    "productKindName":"", // 商品分类名称
                    "goodsName": "", // 商品名称
                    "visitTime" : '', //工作人员上门取货时间
                    "donationCount" : 0, // 捐赠数量
                    "goodsImages" : '',
                    "remark" : '',
                },

            };
        },
        methods: {
            // 加载商品分类
            loadGoodsType() {
                // 发起请求
                this.$http.get(
                    "/trash/product/productKind/selectAll?productKindType=2"
                ).then(res => {
                    this.typeData = res.data.data;
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
                        this.goods.goodsImages = res.data.data;
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

