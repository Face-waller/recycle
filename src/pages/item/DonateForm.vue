<template>
  <v-stepper v-model="step">
    <v-stepper-items>
      <!--1、基本信息-->
      <v-stepper-content step="1">
        <v-flex class="xs10 mx-auto">
          <v-form v-model="valid" ref="basic">
            <v-text-field label="捐赠获得的积分" v-model="activity.acquireScore" :counter="200" hide-details/>
          </v-form>
        </v-flex>
      </v-stepper-content>
    </v-stepper-items>
  </v-stepper>
</template>

<script>
    export default {
        name: "ActivityForm",
        props: {
            oldActivity: {
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
                valid:false,
                activity: {
                    "id": 0,  //捐赠物品信息id
                    "userId": "",  //用户id
                    "productKindId": "", //商品种类id
                    "donationLogisticsId": "", //捐赠物品物流信息id
                    "goodsName": "",  //商品名称
                    "visitTime": "",  //上门取货时间
                    "donationCount": 0,  //捐赠数量
                    "acquireScore": 0,  //捐赠物品获得的积分
                    "goodsImages": "",  //捐赠物品图片
                    "remark": "",  //备注
                    "logisticsStatus":0, //捐赠物品物流状态
                    "state":0,  // 捐赠物品状态
                    "createTime":"",
                    "modifyTime":"",
                    "productKindName":"", // 商品种类名称
                    "username":"", // 用户姓名

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
                        this.activity.image = res.data.data;
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
            oldActivity: {// 监控oldActivity的变化
                handler(val) {
                    if (val) {
                        this.activity.id = val.id;
                        this.activity.userId = val.userId;
                        this.activity.productKindId = val.productKindId;
                        this.activity.donationLogisticsId = val.donationLogisticsId;
                        this.activity.goodsName = val.goodsName;
                        this.activity.visitTime = val.visitTime;
                        this.activity.donationCount = val.donationCount;
                        this.activity.acquireScore = val.acquireScore;
                        this.activity.goodsImages = val.goodsImages;
                        this.activity.remark = val.remark;
                        this.activity.logisticsStatus = val.logisticsStatus;
                        this.activity.state = val.state;
                        this.activity.createTime = val.createTime;
                        this.activity.modifyTime = val.modifyTime;
                        this.activity.productKindName = val.productKindName;
                        this.activity.username = val.username;

                    } else {
                        // 为空，初始化brand
                        this.activity = {
                            "id": 0,  //捐赠物品信息id
                            "userId": "",  //用户id
                            "productKindId": "", //商品种类id
                            "donationLogisticsId": "", //捐赠物品物流信息id
                            "goodsName": "",  //商品名称
                            "visitTime": "",  //上门取货时间
                            "donationCount": 0,  //捐赠数量
                            "acquireScore": 0,  //捐赠物品获得的积分
                            "goodsImages": "",  //捐赠物品图片
                            "remark": "",  //备注
                            "logisticsStatus":0, //捐赠物品物流状态
                            "state":0,  // 捐赠物品状态
                            "createTime":"",
                            "modifyTime":"",
                            "productKindName":"", // 商品种类名称
                            "username":"", // 用户姓名
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

