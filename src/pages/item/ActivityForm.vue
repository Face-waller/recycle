<template>
  <v-stepper v-model="step">
    <v-stepper-items>
      <!--1、基本信息-->
      <v-stepper-content step="1">
        <v-flex class="xs10 mx-auto">
          <v-form v-model="valid" ref="basic">
            <v-text-field label="标题" v-model="activity.title" :counter="200"  hide-details/>
            <v-text-field label="内容" v-model="activity.content" :counter="200" hide-details/>
            <v-flex xs3>
              <span style="font-size: 16px; color: #444">图片：</span>
            </v-flex>
           <!-- <v-flex>
              <v-upload url="/trash/activity/activityMsg/uploadImg" :multiple="false"
              />
            </v-flex>-->
            <input type="file" v-on:change="pictureModel($event)" accept="*" id="crowd_file">
            <br><br>
            <div class="block">
              <span class="demonstration">默认</span>
              <el-date-picker
                v-model="activity.date"
                type="datetime"
                value-format="yyyy-MM-dd HH:mm:ss"
                placeholder="选择日期时间">
              </el-date-picker>
            </div>
            <v-text-field label="友情链接" v-model="activity.link" :counter="200" hide-details/>
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
                    id: 0, // 活动id
                    title: "", // 标题
                    content: "", // 内容
                    image: '', //图片
                    date:'', //时间
                    link:'', //链接

                },

            };
        },
        methods: {
            pictureModel(e) {
                // 获取图片
                var file = e.target.files[0];
                console.log(file);
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
                        this.activity.id = val.id
                        this.activity.title = val.activityTitle;
                        this.activity.content = val.activityContent;
                        this.activity.image = val.activityImages;
                        this.activity.date = val.activityTime;
                        this.activity.link = val.blogroll;
                    } else {
                        // 为空，初始化brand
                        this.activity = {
                            title: "", // 标题
                            content: "", // 内容
                            image: '', //图片
                            date:'', //时间
                            link:'', //链接
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

