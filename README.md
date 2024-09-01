
<h1 align="center">
  <img src="https://cdn.jsdelivr.net/npm/ddm-plugin-dubbo-support/logo.png" alt="Dubbo-Zookeeper-Support" width="200">
  <br>Dubbo-Support<br>
</h1>

## 一、功能简介
支持Dubbo框架，
- 支持多注册中心（ zookeeper、nacos、dubbo-admin或dubbo-admin相同协议的服务）
- 支持服务提供者和消费者展示、 服务启用、禁用、配置编辑
- 支持服务调用（目前已支持 dubbo、http 等协议）、快捷生成 `invoke` 命令、支持方法填充（历史参数、默认参数）
- 支持 Telnet 直接连接到提供者
- 支持 Telnet 和 Java两种调用方式

## 二、功能截图
### 2.1、新建连接页面
![alt text](https://cdn.jsdelivr.net/npm/ddm-plugin-dubbo-support/docs/images/image.png)
![alt text](https://cdn.jsdelivr.net/npm/ddm-plugin-dubbo-support/docs/images/image-1.png)
![alt text](https://cdn.jsdelivr.net/npm/ddm-plugin-dubbo-support/docs/images/image-2.png)


### 2.2、服务管理页面
![alt text](https://cdn.jsdelivr.net/npm/ddm-plugin-dubbo-support/docs/images/image-4.png)

### 2.3、Telnet 
![alt text](https://cdn.jsdelivr.net/npm/ddm-plugin-dubbo-support/docs/images/image-3.png)

### 2.4、调用接口方法
![alt text](https://cdn.jsdelivr.net/npm/ddm-plugin-dubbo-support/docs/images/image-5.png)

### 2.5、启用/禁用服务提供者
![alt text](https://cdn.jsdelivr.net/npm/ddm-plugin-dubbo-support/docs/images/image-6.png)

### 2.6、编辑服务动态配置
![alt text](https://cdn.jsdelivr.net/npm/ddm-plugin-dubbo-support/docs/images/image-7.png)


# 三、常见问题
### 3.1、如何连接到dubbo-admin?
1. 打开dubbo-admin并且打开F12
2. 从控制台中虽然找到一个发往后台的请求地址，拿到它的前缀
![alt text](https://cdn.jsdelivr.net/npm/ddm-plugin-dubbo-support/docs/images/image-12.png)
3. 新建连接，选择dubbo-admin
![alt text](https://cdn.jsdelivr.net/npm/ddm-plugin-dubbo-support/docs/images/image-11.png)

### 3.2、为什么出现找不到元数据？
1. dubbo2.7以后才有元数据，如果你是2.7之前的版本，那是没办法进行参数填充的，需要自行补齐参数类型
2. 如果是2.7之后的版本，那么检查一下是否配置了上报元数据
3. 如果上面都没问题，可能是元数据未上报....
