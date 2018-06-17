## url整理

- /home 访问首页 默认城市:上海 参数：城市
- /loginAndRegister
  - /register 注册界面
  - /login 登录界面
- /schedule?type= 按照类型搜索界面 参数：节目类型 （筛选条件、排序方式在前端做，避免访问后端造成后端压力）
- /searchSchedule?key= 通过节目名称的关键字模糊搜索得到的节目列表 （暂时未实现）
- /detail/[programid] 节目详情的界面 路径参数：节目id
- /orderConfirm 订单生成的界面（未确认订单）
- /pay 支付界面（未实现）
- /center
  - /order?type= 订单查看界面 参数：订单类型（全部，已支付，未支付，已取消）
  - /like 想要看的节目单