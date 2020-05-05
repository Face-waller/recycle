<template>
  <v-stepper v-model="step">
    <v-stepper-items>
      <!--1、基本信息-->
      <v-stepper-content step="1">
        <v-flex class="xs10 mx-auto">
          <v-form v-model="valid" ref="basic">
            <v-text-field label="快递单号" v-model="goods.name" :counter="200"  hide-details/>
            <div class="block">
              <span class="demonstration">选择发货时间</span>
              <el-date-picker
                v-model="goods.date"
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
                    "date": "",
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

