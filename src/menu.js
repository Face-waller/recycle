var menus = [
  {
    action: "home",
    title: "首页",
    path:"/",
    items: [{ title: "统计", path: "admin" }]
  },
  {
    action: "apps",
    title: "活动资讯管理",
    path:"/item",
    items: [
      { title: "活动资讯列表", path: "/Activity" },
    ]
  },
  {
    action: "apps",
    title: "商品管理",
    path:"/item",
    items: [
      { title: "分类管理", path: "/Category" },
      { title: "商品列表", path: "/List" },
    ]
  },
  {
    action: "apps",
    title: "捐赠物品管理",
    path:"/item",
    items: [
      { title: "捐赠物品列表", path: "/Donate" },
    ]
  },
  {
    action: "people",
    title: "工作人员管理",
    path:"/user",
    items: [
      { title: "工作人员", path: "/Employees" },
    ]
  },
  /*{
    action: "attach_money",
    title: "销售管理",
    path:"/trade",
    items: [
      { title: "交易统计", path: "/statistics" },
      { title: "订单管理", path: "/order" },
      { title: "物流管理", path: "/logistics" },
      { title: "促销管理", path: "/promotion" }
    ]
  },*/
  {
    action: "settings",
    title: "权限管理",
    path:"/authority",
    items: [
      { title: "权限管理", path: "/list" },
      { title: "角色管理", path: "/role" },
      { title: "人员管理", path: "/member" }
    ]
  }
]

export default menus;
