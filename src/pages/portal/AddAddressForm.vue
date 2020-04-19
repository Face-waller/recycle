<template>
  <v-stepper v-model="step">
    <v-stepper-items>
      <!--1、基本信息-->
      <v-stepper-content step="1">
        <v-flex class="xs10 mx-auto">
          <v-form v-model="valid" ref="basic">
            <v-text-field label="姓名" v-model="goods.name" :counter="200" hide-details/>
            <v-text-field label="电话" v-model="goods.phone" :counter="200" hide-details/>
            <v-text-field label="详细地址" v-model="goods.address" :counter="200" hide-details/>
            <v-text-field label="邮编" v-model="goods.postcode" :counter="200" hide-details/>
          </v-form>
        </v-flex>
      </v-stepper-content>
    </v-stepper-items>
  </v-stepper>
</template>

<script>
    export default {
        name: "DoDonateForm",
        props: {
            step: {
                type: Number,
                default: 1
            }
        },
        data() {
            return {
                valid:false,
                goods: {
                    "name": "", //
                    "phone": "", //
                    "address":"", //
                    "postcode": "", //
                },

            };
        },
        methods: {
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

