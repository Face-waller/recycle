<template>
  <v-app :dark="dark">
    <header>
      <nav id="nav">
        <ul class="left" v-if="username === ''">
          <li><a><router-link :to="{ name:'Login' }" target="_blank">登录</router-link></a></li>
          <li><a><router-link :to="{ name:'Register' }" target="_blank">注册</router-link></a></li>
        </ul>
        <ul class="left" v-else-if="isSuperuser === 0">
          <li>欢迎您，<i style="color: indianred">{{username}}</i> !</li>
          <li><i @click="loginOut" style="color: indianred;cursor:pointer" >&nbsp;&nbsp;&nbsp;退出登录</i></li>
        </ul>
        <ul class="left" v-else>
          <li>欢迎您，<i style="color: indianred">{{username}}</i> !</li>
          <li><i @click="loginOut" style="color: indianred;cursor:pointer" >&nbsp;&nbsp;&nbsp;退出登录</i></li>
          <li><a><router-link style="color: dodgerblue" :to="{ name:'Admin'}">进入后台管理界面</router-link></a></li>
        </ul>
        <ul class="right">
          <li><a><router-link :to="{ name:'MyInfo' }">我的</router-link></a></li>
          <li><a href="#" style="cursor:pointer;" @click="doDonate">去捐赠</a></li>
          <li><a><router-link :to="{ name:'GoodsList' }">商品列表</router-link></a></li>
          <li><a><router-link :to="{ name:'Index' }">首页</router-link></a></li>
        </ul>
      </nav>
    </header>

    <div style="margin-top: 10px">
      <!--定义一个路由锚点，Layout的子组件内容将在这里展示-->
      <router-view/>
    </div>

    <footer>
      <div class="Copyright">
        <p>©2020 个人作品 product by xxx</p>
      </div>
    </footer>
    <!-- 对话框-->
    <v-dialog max-width="800" v-model="show" persistent scrollable>
      <v-card
        :elevation="1"
      >
        <!--对话框的标题-->
        <v-toolbar dense color="#BDBDBD">
          <v-toolbar-title>保存捐赠信息</v-toolbar-title>
          <v-spacer/>
          <!--关闭窗口的按钮-->
          <v-btn icon @click="closeWindow">
            <v-icon>close</v-icon>
          </v-btn>
        </v-toolbar>
        <!--对话框的内容，表单-->
        <v-card-text class="px-3" style="height: 600px">
          <DoDonateForm ref="ch" @close="closeWindow"/>
        </v-card-text>
        <!--底部按钮，用来操作步骤线-->
        <v-card-actions class="elevation-10">
          <v-flex class="xs3 mx-auto">
            <v-btn @click="addActivity" color="#E0E0E0">保存</v-btn>
            <v-btn @click="closeWindow" color="#F5F5F5">取消</v-btn>
          </v-flex>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-app>
</template>

<script>
  import DoDonateForm from "./portal/DoDonateForm";

  export default {
    inject:['reload'],      // 注入App里的reload方法
    data() {
      return {
        id: Object, // 用户id
        username: '', // 用户名
        isSuperuser: Object, // 管理员
        show: false,
        dark: false,// 是否暗黑主题
        drawer: true,// 左侧导航是否隐藏
        miniVariant: false,// 左侧导航是否收起
        title: '垃圾回收后台管理系统',// 顶部导航条名称,
        menuMap: {}
      }
    },
    computed: {
    },
    name: 'App',
    watch: {},
    created() {
        this.verifyLogin();
        this.getDataFromServer();
    },
    methods: {
        // 登出
        loginOut() {
            this.clearAllCookie();
            this.reload();
        },
        clearAllCookie() {
            var keys = document.cookie.match(/[^ =;]+(?=\=)/g);
            if (keys) {
                for (var i = keys.length; i--;){
                    document.cookie = keys[i] + '=0;path=/;domain=127.0.0.1;expires=' + new Date(0).toUTCString();//清除一级域名下的或指定的
                }
            }
        },
        // 去捐赠按钮点击事件
        doDonate() {
            // 判断是否登录
            if(this.username === '') {
                alert("未登录，请登录后操作!");
                return;
            }
            // 弹出窗口
            // 控制弹窗可见：
            this.show = true;

        },
        // 验证是否登录
        verifyLogin() {
            this.$http.get("/trash/user/user/verify")
                .then(res => {
                    this.id = res.data.data.id;
                    this.username = res.data.data.username;
                    this.isSuperuser = res.data.data.isSuperuser;
                })
                .catch(error => {
                    console.log("未登录!")
                })
        },
        // 加载数据
        getDataFromServer() {
            // 请求活动信息

        },
        addActivity() {
            // 获取提交的数据
            let child = this.$refs.ch;
            //1.捐赠商品种类id
            var id;
            child.typeData.forEach( t => {
                if (t.productName === child.goods.productKindName) {
                    id = t.id;
                }
            });
            // 捐赠物品
            this.$http.post(
                "/trash/product/donationGoods/add",
                {
                    productKindId: id,
                    goodsName: child.goods.goodsName,
                    visitTime: child.goods.visitTime,
                    donationCount: child.goods.donationCount,
                    goodsImages: child.goods.goodsImages,
                    remark:child.goods.remark
                }
            ).then(res => {
                this.show = false;
            }).catch(error => {
            })

        },
        closeWindow() {
            // 重新加载数据
            this.getDataFromServer();
            // 关闭窗口
            this.show = false;
        },
    },
    components: {
        DoDonateForm,
    }
  }
</script>

<style scoped>
  /* CSS Document */
  * { margin: 0; padding: 0 }
  body { background: #DDD6CC; font: 12px "����", "Arial Narrow", HELVETICA; color: #3F3E3C; line-height: 1.5; }
  img { border: 0; vertical-align: middle }
  p { display: block; }
  ul { list-style: none; }
  a { color: #a6a6a6; text-decoration: none; transition: All 0.5s ease; -webkit-transition: All 0.5s ease; -moz-transition: All 0.5s ease; -o-transition: All 0.5s ease; }
  a:hover { color: #000; }
  .blank { height: 5px; overflow: hidden; width: 100%; margin: auto; clear: both }
  /* nav */
  header {
    width: 100%;
    height: 43px;
    background: -webkit-gradient(linear, 78% 100%, 78% 41%, from(#EFEEEC), to(#fff));
    box-shadow: #D0C9C0 2px 2px 3px;

  }
  header nav { margin: 0 auto; width: 1400px; text-align: center }

  header nav ul.left li { line-height: 43px; display: block; float: left; }
  header nav ul.right li { line-height: 43px; display: block; float: right;}
  header nav ul li a { color: #484848; padding: 0 20px; margin-right: 2px; }
  header nav ul li a:hover, #nav_current { color: #fff; background: #F16E50; transform: skew(-20deg); -webkit-transform: skew(-20deg); -moz-transform: skew(-20deg); -o-transform: skew(-20deg); }

  /* footer */
  footer {
    /*border-top: 8px solid #f16e50;*/
    background: #EFEEEC;
    width: 100%;
    position: fixed;
    bottom: 0;
    margin-top: 29px;
  }
  .Copyright { text-align: center; color: #000; margin: 5px 0 0 }
  .box {
    width: 90%;
  }
</style>
