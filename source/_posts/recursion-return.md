---
title: 递归中注意return返回值
date: 2019-12-27 11:02:52
tags: 递归
categories: 
- web前端
---
## 递归中注意return返回值

群里一个小伙伴问及递归如果有返回值的话，该怎么写，我想了下，好像之前写递归没有写过返回值呢，于是查了下资料，遂写下这篇博客。

```javascript
var obj = [{
    name:'1',
    children: [{
        name: '11',
        age: 13,
        children: [{name: '111'}]
    }]
}]
function test(data){
    // 此处for循环才可以跳出循环，如果用map或者forEach都不可以，因为他们的参数是一个回调函数，不能跳出循环
    for(var i=0;i<data.length;i++){
        if(data[i].name === '11'){
            return 123;
        }else if(data[i].children){
            // 这里需要将函数return出来，每一次return都是把最新的函数调用返回给外层的函数调用。
            // （这里test(data[i].children)拿到的是执行时的返回值，需要将此返回值return出去）
            return test(data[i].children)
        }
    }
}
```

写的如果有有问题的地方，烦请指出。

