<template>
  <v-stepper v-model="step">
    <v-stepper-items>
      <!--1、基本信息-->
      <v-stepper-content step="1">
        <v-flex class="xs10 mx-auto">
          <v-form v-model="valid" ref="basic">
            <v-text-field label="姓名" v-model="activity.name" :counter="200"  hide-details/>
            <v-text-field label="电话" v-model="activity.phone" :counter="200" hide-details/>
            <v-text-field label="详细地址" v-model="activity.address" :counter="200" hide-details/>
            <v-text-field label="邮编" v-model="activity.postcode" :counter="200" hide-details/>
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
                    "id": null, //地址id
                    "name": null,//收货/发货姓名
                    "phone": null,//手机号
                    "address": null,//详细地址
                    "postcode": null,//邮编
                    "userId": null,//用户id
                    "addressType": null,//地址类型【1、收获地址，2、发货地址】
                    "state": null,//地址状态【1、在用，0、归档】
                    "defaultAddressState": null,//是否为默认地址【1、是，0不是】
                    "createTime": null,//创建时间
                    "modifyTime": null//修改时间
                },

            };
        },
        methods: {
        },
        mounted() {
        },
        watch: {
            oldActivity: {// 监控oldActivity的变化
                handler(val) {
                    if (val) {
                        this.activity.id = val.id;
                        this.activity.name = val.name;
                        this.activity.phone = val.phone;
                        this.activity.address = val.address;
                        this.activity.postcode = val.postcode;
                    } else {
                        // 为空，初始化brand
                        this.activity = {
                            "id": null, //地址id
                            "name": null,//收货/发货姓名
                            "phone": null,//手机号
                            "address": null,//详细地址
                            "postcode": null,//邮编
                            "userId": null,//用户id
                            "addressType": null,//地址类型【1、收获地址，2、发货地址】
                            "state": null,//地址状态【1、在用，0、归档】
                            "defaultAddressState": null,//是否为默认地址【1、是，0不是】
                            "createTime": null,//创建时间
                            "modifyTime": null//修改时间
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

