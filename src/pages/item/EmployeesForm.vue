<template>
  <v-stepper v-model="step">
    <v-stepper-items>
      <!--1、基本信息-->
      <v-stepper-content step="1">
        <v-flex class="xs10 mx-auto">
          <v-form v-model="valid" ref="basic">
            <v-text-field label="姓名" v-model="goods.name" :counter="200"  hide-details/>
            <v-text-field label="电话" v-model="goods.phoneNumber" :counter="200"  hide-details/>
            <v-text-field label="身份证号" v-model="goods.idCard" :counter="200"  hide-details/>
            <v-flex xs3>
              <span style="font-size: 16px; color: #444">头像：</span>
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
        name: "EmployeesForm",
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
                    "id": 0,  //上门回收物品工作人员信息id
                    "name": "",  //姓名
                    "phoneNumber": "", //电话
                    "idCard": 0, //身份证号
                    "images": "", //照片地址
                    "state": 0,  //状态(0、离职；1、空闲；2、接单中)
                    "createTime": "",  //创建时间
                    "modifyTime": ""  //修改时间
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
                        this.goods.images = res.data.data;
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
            oldGoods: {// 监控oldGoods的变化
                handler(val) {
                    if (val) {
                        this.goods.id = val.id;
                        this.goods.name = val.name;
                        this.goods.phoneNumber = val.phoneNumber;
                        this.goods.idCard = val.idCard;
                        this.goods.images = val.images;
                        this.goods.state = val.state;
                        this.goods.createTime = val.createTime;
                        this.goods.modifyTime = val.modifyTime;
                    } else {
                        // 为空，初始化goods
                        this.goods = {
                            id: 0,
                            name: 0, // 商品分类id
                            phoneNumber: '',
                            idCard: "", // 商品名称
                            images: "", // 商品图片
                            state: '', // 商品原价
                            createTime:'', // 商品现价
                            modifyTime:'', // 积分
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

