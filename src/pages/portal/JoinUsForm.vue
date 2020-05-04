<template>
  <v-stepper v-model="step">
    <v-stepper-items>
      <!--1、基本信息-->
      <v-stepper-content step="1">
        <v-flex class="xs10 mx-auto">
          <v-form v-model="valid" ref="basic">
            <v-text-field label="商户名称" v-model="goods.name" :counter="200"  hide-details/>
            <v-text-field label="姓名" v-model="goods.bossName" :counter="200"  hide-details/>
            <v-text-field label="电话" v-model="goods.phone" :counter="200"  hide-details/>
            <v-text-field label="地址" v-model="goods.address" :counter="200"  hide-details/>
            <v-text-field label="回收物品类型" v-model="goods.shopIntroduce" :counter="200"  hide-details/>
            <v-flex xs3>
              <span style="font-size: 16px; color: #444">商户图片：</span>
            </v-flex>
            <input type="file" v-on:change="pictureModel($event)" accept="*" id="crowd_file">
          </v-form>
        </v-flex>
      </v-stepper-content>
    </v-stepper-items>
  </v-stepper>
</template>

<script>
    export default {
        name: "JoinUsForm",
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
                valid:false,
                goods: {
                    "name": "", // 商品id
                    "bossName": "", // 商品分类id
                    "phone":"", // 商品分类名称
                    "address": "", // 商品名称
                    "shopIntroduce" : '', //工作人员上门取货时间
                    "images" : "", // 捐赠数量
                },

            };
        },
        methods: {
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

