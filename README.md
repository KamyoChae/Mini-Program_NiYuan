# Mini-Program_NiYuan
微信小程序_霓远音舍

## 记录一下做这个小程序的过程中遇到的一些问题（持续更新）

### 1. 利用swiper组件实现顶部英文经典句子幻灯片

swiper是微信小程序的一个十分简单的组件，按照官方文档就能直接拿过来实现轮播图的效果。包括以前我也是这么干的。

但是做这个微信小程序的时候，一开始构思的UI是整个小程序都进行了滑屏，初步思路是徒手写一个轮播图组件。当正准备动手写的时候，突发奇想能不能利用swiper组件直接重构一下实现，接着发现如果把整屏都做成轮播图，那么如果我们需要在界面上做一些左右滑动的操作，那还得处理一下事件冒泡。
于是就决定把轮播图独立出来放到顶部了。
然后就有了这个微信小程序顶部的现在这个样子。

做这个值得注意的地方时定位问题，其实只要记住一点就可以了，即：绝对定位是基于最近的父级定位而定位的。换一个说法就是，根据最近的定位而定位。

感觉还是挺不错的

### 2. 减少http请求，缓存页面数据

api接口是一次返回20条信息到一个对象里面，如果我们只是通过这个对象，切换索引来一个一条条信息渲染到新页面，那将会是十分缓慢的加载速度。在源码里面我们是将这个对象的数组抽取出来，放到了一个数组里面。

（突然想到一个优化的办法，将20个页面全部渲染出来，只显示当前索引页面，当点击下一个页面的时候，就进行左右平移，这个操作相当于“异步”缓存数据了<并不是真的异步>。）

开学了~~~停更一段时间
