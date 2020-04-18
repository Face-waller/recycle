<template>
  <div>
    <el-row :gutter="20">
      <el-col :span="16" :offset="4">
        <v-carousel>
          <v-carousel-item
            v-for="(item,i) in records"
            :key="i"
            :src="item.activityImages"
            reverse-transition="fade-transition"
            transition="fade-transition"
          ></v-carousel-item>
        </v-carousel>

      </el-col>
    </el-row>
    <el-row style="margin-top: 20px;text-align: center">
      <template v-for="(item,i) in records">
        <el-col :span="4" :offset="3">
          <el-card shadow="hover" body-style="">
            <p>{{item.activityTitle}}</p>
            <p>{{item.activityTime}}</p>
            <p>{{item.activityContent}}</p>
          </el-card>
        </el-col>
      </template>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="24">
        <template v-for="(item,i) in records">
          <el-col :span="8">
            <div class="roll">
              <a :href="item.blogroll">{{item.activityTitle}}</a>
            </div>
          </el-col>
        </template>
      </el-col>
    </el-row>
  </div>
</template>

<script>
    export default {
        name: "Index",
        data () {
            return {
                records:[{
                    "id": 0,  //主键id
                    "activityTitle": "",  //活动标题
                    "activityContent": "", //活动内容
                    "activityImages": "", //图片地址
                    "activityTime": "2020-02-18 18:53:00",  //活动时间
                    "blogroll": "http://www.baidu.com",  //友情链接
                    "userId": 0,  //创建人
                    "state": 0,  //活动状态
                    "createTime": "",  //创建时间
                    "modifyTime": ""  //修改时间
                }],
                items: [
                    {
                        src: 'https://cdn.vuetifyjs.com/images/carousel/squirrel.jpg',
                    },
                    {
                        src: 'https://cdn.vuetifyjs.com/images/carousel/sky.jpg',
                    },
                    {
                        src: 'https://cdn.vuetifyjs.com/images/carousel/bird.jpg',
                    },
                    {
                        src: 'https://cdn.vuetifyjs.com/images/carousel/planet.jpg',
                    },
                ],
            }
        },
        methods:{
            //获取页面数据
            getData() {
                this.$http.get(
                    "/trash/activity/activityMsg/list?pageSize=" + 3
                    + "&pageIndex=" + 1
                    + "&param=" + " "
                    + "&state=" + 1
                ).then(resp => {
                    this.records = resp.data.data.records;
                }).catch(error => {
                    if (error.response) {
                        this.errmsg = error.response.data.message;
                    } else if (error.request) {
                        console.log("请求超时");
                    } else {
                        console.log("Error: ", error.message);
                    }
                })
            }

        },
        created() {
            this.getData();
        }

    }
</script>

<style scoped>
.roll {

}
</style>
