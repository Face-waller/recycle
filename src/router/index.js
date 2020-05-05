import Vue from 'vue'
import Router from 'vue-router'


Vue.use(Router)

function route (path, file, name, children) {
  return {
    exact: true,
    path,
    name,
    children,
    component: () => import('../pages' + file)
  }
}

export default new Router({
  routes: [
    route("/login",'/Login',"Login"),// /login路径，路由到登录组件
    route("/register","/Register","Register"),
    {
      path:"/", // 根路径
      component: () => import('../pages/PortalLayout'),
      redirect:"/index",
      name:"Index",
      children:[
        route("/index","/portal/Index","Index"),
        route("/goodsList","/portal/GoodsList","GoodsList"),
        route("/doDonate","/portal/MyInfo","MyInfo")
      ]
    },
    {
      path:"/admin", // 管理员，路由到 Layout组件
      component: () => import('../pages/AdminLayout'),
      redirect:"/admin",
      name:"Admin",
      children:[ // 其它所有组件都是 Layout的子组件
        route("/admin","/Dashboard","Dashboard"),
        route("/item/category",'/item/Category',"Category"),
        route("/item/List",'/item/Goods',"Goods"),
        route("/item/Activity",'/item/Activity',"Activity"),
        route("/item/Donate",'/item/Donate',"Donate"),
        route("/user/Employees",'/item/Employees',"Employees"),
        route("/user/Customer",'/item/Customer',"Customer"),
        route("/item/Dealer",'/item/Dealer',"Dealer"),
        route("/item/DonationOrder",'/item/DonationOrder',"DonationOrder"),
        route("/item/GoodsOrder",'/item/GoodsOrder',"GoodsOrder"),
      ]
    }
  ]
})
