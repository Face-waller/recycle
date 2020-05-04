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
<!--    左侧-->
    <img class="joinUs" @click="joinUs" src="../../assets/joinUs.jpg" width="200" height="100" style="border:1px solid dodgerblue ;cursor:pointer;" alt="加入我们" />
<!--    右侧-->
    <div class="rightDiv">
      <template v-for="(item,i) in joinItems">
        <el-col :span="18" :offset="2">
          <el-card :body-style="{ padding: '0px' }" shadow="hover">
            <span>No.{{i+1}}</span>
            <img :src="'http://127.0.0.1:8001/trash/'+item.images" min-width="100" height="100" class="image">
            <div style="padding: 14px;">
              <span>老板姓名：{{item.bossName}}</span>
              <br>
              <span>商户电话：{{item.phone}}</span>
              <br>
              <span>商户地址: {{item.address}}</span>
              <br>
              <span>回收物品介绍: {{item.shopIntroduce}}</span>
            </div>
          </el-card>
        </el-col>
      </template>
    </div>
    <!--弹出的对话框-->
    <v-dialog max-width="800" v-model="showJoin" persistent scrollable>
      <v-card
        :elevation="1"
      >
        <!--对话框的标题-->
        <v-toolbar dense color="#BDBDBD">
          <v-toolbar-title>商户加盟</v-toolbar-title>
          <v-spacer/>
          <!--关闭窗口的按钮-->
          <v-btn icon @click="closeWindow">
            <v-icon>close</v-icon>
          </v-btn>
        </v-toolbar>
        <!--对话框的内容，表单-->
        <v-card-text class="px-3" style="height: 600px">
          <JoinUsForm ref="ch" @close="closeWindow"/>
        </v-card-text>
        <!--底部按钮，用来操作步骤线-->
        <v-card-actions class="elevation-10">
          <v-flex class="xs3 mx-auto">
            <v-btn @click="addActivity" color="#E0E0E0">确认</v-btn>
            <v-btn @click="closeWindow" color="#F5F5F5">取消</v-btn>
          </v-flex>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
    import JoinUsForm from "./JoinUsForm";

    export default {
        name: "Index",
        data () {
            return {
                showJoin: false,
                joinItems:[
                    {
                        "id": 0, // 商户id
                        "name": "", // 商户名称
                        "bossName": "", // 商户老板姓名
                        "phone": "", // 商户电话
                        "address": "", // 商户地址
                        "shopIntroduce": "", // 回收物品类型介绍
                        "images": "", // 商户图片
                        "reputationScore": "", // 信誉积分
                        "createTime": "", // 创建时间
                        "modifyTime": "" // 修改时间
                    }
                ],
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
            async getData() {
                var pageSize = this.pageSize;
                var currentPageIndex = this.currentPageIndex;
                this.$http.get(
                    "/trash/activity/activityMsg/list?pageSize=" + 3
                    + "&pageIndex=" + 1
                    + "&param=" + " "
                    + "&state=" + 1
                ).then(res => {
                    this.records = res.data.data.records;
                })
            },
            async getData2() {
                this.$http.get(
                    "/trash/commercial/commercialTenant/getListByScore"
                ).then(res => {
                    this.joinItems = res.data.data
                })
            },
            joinUs() {
                // 弹窗
                this.showJoin = true;

            },
            closeWindow() {
                // 关闭窗口
                this.showJoin = false;
            },
            addActivity() {
                let child =this.$refs.ch;
                // 发起请求
                this.$http.post(
                    "/trash/commercial/commercialTenant/add",
                    {
                        name:child.name,
                        bossName:child.bossName,
                        phone:child.phone,
                        address:child.address,
                        shopIntroduce:child.shopIntroduce,
                        images:child.images
                    }
                ).then(res => {
                    if(res.data.code === 2000) {
                        this.closeWindow();
                    }
                })
            }
        },
        created() {
            this.getData();
            this.getData2();
        },
        components:{
            JoinUsForm
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
  /* 加入 */
  .joinUs {
    position: fixed;
    left: 30px;
    top:250px;
  }
  .rightDiv {
    width: 300px;
    float: right;
    position: fixed;
    top:50px;
    right: 0;
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
