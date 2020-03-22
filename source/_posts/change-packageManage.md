---
title: vue脚手架安装时怎么更改包管理器为yarn还是npm
date: 2020-03-19 23:13:40
tags:
---
## @vue/cli vue脚手架安装时怎么更改包管理器为yarn还是npm

在执行 __* vue create my-project *__ 之后，如果显示的是，

```javascript
cd my-project
npm run serve
```

则表示当前用的npm创建的项目

如果显示的是：

```javascript
cd my-project
yarn run serve
```

则表示当前用的yarn创建的项目

那么问题来了，如何切换包管理器呢？
在[@vue/cli](https://cli.vuejs.org/zh/guide/creating-a-project.html#vue-create)有段描述，

```
~/.vuerc

被保存的 preset 将会存在用户的 home 目录下一个名为 .vuerc 的 JSON 文件里。如果你想要修改被保存的 preset / 选项，可以编辑这个文件。

在项目创建的过程中，你也会被提示选择喜欢的包管理器或使用淘宝 npm 镜像源以更快地安装依赖。这些选择也将会存入 ~/.vuerc。
```

只有第一次创建项目的时候，会询问用npm或yarn,后续如果需要更改的话，则是更改.vuerc文件。
如果是window环境的话，.vuerc文件在 **` C:/user/administrator/ `**
如果是mac环境的话，在terminal终端输入 

``` 
vi ~/.vuerc 
```

（进入到文件看到文件内容后，摁i键进入插入模式，更改想要更改的内容后，摁Esc退出插入模式，然后摁 :wq 即可保存退出文件编辑。）

.vuerc文件里有一项，
 
 ```javascript
{
    "packageManager": "npm"
}
```

这时，只需要手动更改配置内容npm为yarn，即可更改创建项目时的包管理器了（也可删除 .vuerc 文件（rm -rf ~/.vuerc）重新运行 vue create xx 选择配置）

 



