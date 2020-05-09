<template>
  <v-stepper v-model="step">
    <v-stepper-items>
      <!--1、基本信息-->
      <v-stepper-content step="1">
        <v-flex class="xs10 mx-auto">
          <v-form v-model="valid" ref="basic">
            <v-text-field label="商户名称" v-model="activity.name" :counter="200"  hide-details/>
            <v-text-field label="老板姓名" v-model="activity.bossName" :counter="200" hide-details/>
            <v-text-field label="电话" v-model="activity.phone" :counter="200" hide-details/>
            <v-text-field label="地址" v-model="activity.address" :counter="200" hide-details/>
            <v-text-field label="回收物品类型" v-model="activity.shopIntroduce" :counter="200" hide-details/>

            <<v-flex xs3>
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
        name: "DealerForm",
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
                        this.activity.images = res.data.data;
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
                        this.activity.name = val.name;
                        this.activity.bossName = val.bossName;
                        this.activity.phone = val.phone;
                        this.activity.address = val.address;
                        this.activity.shopIntroduce = val.shopIntroduce;
                        this.activity.images = val.images;
                        this.activity.reputationScore = val.reputationScore;
                        this.activity.createTime = val.createTime;
                        this.activity.modifyTime = val.modifyTime;
                    } else {
                        // 为空，初始化brand
                        this.activity = {
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

