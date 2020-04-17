<template>
  <div>
    <el-row :gutter="20">
      <el-col :span="16" :offset="4">
        <v-carousel>
          <v-carousel-item
            v-for="(item,i) in items"
            :key="i"
            :src="item.src"
            reverse-transition="fade-transition"
            transition="fade-transition"
          ></v-carousel-item>
        </v-carousel>

      </el-col>
    </el-row>
    <el-row style="margin-top: 20px;text-align: center">
      <template v-for="(item,i) in activities">
        <el-col :span="4" :offset="3">
          <el-card shadow="hover" body-style="">
            鼠标悬浮时显示<br>
            鼠标悬浮时显示<br>
            鼠标悬浮时显示<br>
            鼠标悬浮时显示<br>
            鼠标悬浮时显示<br>
            鼠标悬浮时显示<br>
            鼠标悬浮时显示<br>
            鼠标悬浮时显示<br>
            鼠标悬浮时显示<br>
            <el-button type="text" class="button">操作按钮</el-button>
          </el-card>
        </el-col>
      </template>
    </el-row>
  </div>
</template>

<script>
    export default {
        name: "Index",
        data () {
            return {
                activities:[{
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
                },
                    {
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
                    },
                    {
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
    }
</script>

<style scoped>

</style>
