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
    title: "人员管理",
    path:"/user",
    items: [
      { title: "工作人员", path: "/Employees" },
      { title: "用户", path: "/Customer" },
    ]
  },
  {
    action: "settings",
    title: "商户管理",
    path:"/item",
    items: [
      { title: "商户", path: "/Dealer" },
    ]
  },
  {
    action: "phone",
    title: "捐赠订单管理",
    path:"/item",
    items: [
      { title: "捐赠物品订单", path: "/DonationOrder" },
    ]
  },
  {
    action: "phone",
    title: "积分兑换订单管理",
    path:"/item",
    items: [
      { title: "积分兑换订单", path: "/GoodsOrder" },
    ]
  },
  {
    action: "phone",
    title: "系统配置管理",
    path:"/item",
    items: [
      { title: "系统配置", path: "/SystemConfig" },
    ]
  },
]

export default menus;
