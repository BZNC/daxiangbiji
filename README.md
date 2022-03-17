# 项目简介

大象笔记是一个使用Vue开发的笔记应用。可以方便地在网页上记录自己的私人笔记，支持联网查看。

使用了Vue-Router、Vuex、vue-cli、Element-ui等协助开发。

# 项目地址

[点我访问](https://bznc.github.io/everynotePages/)

# 使用方法

1. 先注册账号，请牢记账号密码，暂不支持找回功能。

![创建账号](http://cloud.hunger-valley.com/18-1-10/88104731.jpg-middle)

2. 点击左侧导航栏，点击笔记本功能，查看所有笔记本列表。选取其中一个笔记本，可以跳转到这一笔记本的详情页。
3. 点击导航栏笔记页，可以查看当前笔记本中的笔记。
4. 点击退出图标，可以退出账号。

# 项目开发特色

前后端分离，这个项目中做的是前端相关的代码。

使用Vue构建单页面应用程序，简洁流畅。

less开发样式，

并引入ElementUI美化页面。

支持注册新用户登录等功能，可以在网页上联网查看个人笔记，非本地版。

组件化开发项目，

左侧sidebar组件可以导航到笔记、笔记本、回收站等组件，

使用Vue的Router功能实现跳转，

头像组件会取用户名第一个字符进行显示。

封装了常用的方法，

这些方法会作为API，实现代码的复用并减少冗余。

使用Vuex管理数据。



# 已知BUG

~~1.笔记本列表页无法正常显示笔记本创建时间。~~

​	已解决，解决办法：

​	列表页缺少处理事件方法，添加即可。

2.element-ui的message图标不能正常显示

3.回收站页面的恢复和删除功能报错 Uncaught TypeError: Cannot read properties of null (reading 'match')

# 关键词

Vue.js , ElementUI , ES6语法 , axios , promise , Vue-router , 编程式导航