<template>
  <div>
    <el-row :gutter="20">
      <el-col :span="16" :offset="4">
        <v-carousel>
          <v-carousel-item
            v-for="(item,i) in records"
            :key="i"
            :src="'http://127.0.0.1:8001/trash/'+item.activityImages"
            reverse-transition="fade-transition"
            transition="fade-transition"
          ></v-carousel-item>
        </v-carousel>

      </el-col>
    </el-row>
    <el-row style="margin-top: 60px;text-align: center">
      <template v-for="(item,i) in records">
        <el-col :span="4" :offset="3">
          <el-card shadow="hover" body-style="">
            <p style="color: crimson;font-size: 30px">{{item.activityTitle}}</p>
            <p>时间：{{item.activityTime}}</p>
            <p>内容：{{item.activityContent}}</p>
          </el-card>
        </el-col>
      </template>
    </el-row>
      <div class="roll">
        <template v-for="(item,i) in records">
            <a target="_blank" :class="'roll'+i" :href="item.blogroll">{{item.blogroll}}</a>
        </template>
      </div>
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
                    "activityImages": "http://127.0.0.1:8001/trash/"+"", //图片地址
                    "activityTime": "",  //活动时间
                    "blogroll": "",  //友情链接
                    "userId": 0,  //创建人
                    "state": 0,  //活动状态
                    "createTime": "",  //创建时间
                    "modifyTime": ""  //修改时间
                }],
            }
        },
        methods:{
            //获取页面数据
            getData() {
                var pageSize = this.pageSize;
                var currentPageIndex = this.currentPageIndex;
                this.$http.get(
                    "/trash/activity/activityMsg/list?pageSize=" + 3
                    + "&pageIndex=" + 1
                    + "&param=" + " "
                    + "&state=" + 1
                ).then(resp => {
                    console.log(resp);
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
  @keyframes go {
    0%{
      left:0;
    }
    100%{
      left:100%;
    }
  }
  .roll0 {
    width: 200px;
    height: 30px;
    display:block;
    overflow:hidden;
    text-overflow:ellipsis; /** 超出宽度显示为......**/
    white-space:nowrap;/* 不换行 */
    text-decoration:none;
    animation: go 12s linear 8s infinite normal; /* 引用动画  */
    /* animation : 动画名称 动画时间 运动曲线 何时开始 播放次数 是否反方向; */
    position: fixed;
    bottom: 30px;
    left: -200px

  }
  .roll1 {
    width: 200px;
    height: 30px;
    display:block;
    overflow:hidden;
    text-overflow:ellipsis; /** 超出宽度显示为......**/
    white-space:nowrap;/* 不换行 */
    text-decoration:none;
    animation: go 12s linear 4s infinite normal;
    position: fixed;
    bottom: 30px;
    left: -200px

  }

  .roll2 {
    width: 200px;
    height: 30px;
    display:block;
    overflow:hidden;
    text-overflow:ellipsis; /** 超出宽度显示为......**/
    white-space:nowrap;/* 不换行 */
    text-decoration:none;
    animation: go 12s linear 0s infinite normal;
    position: fixed;
    bottom: 30px;
    left: -200px

  }
  /* @keyframes 动画名称 {} 定义动画 */
  @keyframes go {
    0%{
      left:100%;
    }
    100%{
      left:0;
    }
  }
</style>
