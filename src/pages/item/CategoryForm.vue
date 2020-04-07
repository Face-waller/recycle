<template>
  <v-stepper v-model="step">
    <v-stepper-items>
      <!--1、基本信息-->
      <v-stepper-content step="1">
        <v-flex class="xs10 mx-auto">
          <v-form v-model="valid" ref="basic">
            <v-text-field label="分类名称" v-model="category.name" :counter="200"  hide-details/>
            <v-select
              :items="items"
              label="分类类型"
              v-model="category.type"
            ></v-select>
          </v-form>
        </v-flex>
      </v-stepper-content>
    </v-stepper-items>
  </v-stepper>
</template>

<script>
    export default {
        name: "goods-form",
        props: {
            oldCategory: {
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
                    '积分兑换商品种类',
                    '捐赠商品种类'
                ],
                valid:false,
                category: {
                    id: 0, // 商品分类id
                    name: "", // 标题
                    type: "", // 内容
                },

            };
        },
        methods: {
        },
        mounted() {
        },
        watch: {
            oldCategory: {// 监控oldCategory的变化
                handler(val) {
                    if (val) {
                        this.category.id = val.id;
                        this.category.name = val.productName;
                        this.category.type = val.productKindType;
                    } else {
                        // 为空，初始化brand
                        this.category = {
                            name: "", // 标题
                            type: "", // 内容
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

