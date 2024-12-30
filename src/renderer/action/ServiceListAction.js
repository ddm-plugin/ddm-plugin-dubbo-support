


class ServiceTreeAction {

    constructor(appRenderer) {
        this.appRenderer = appRenderer;

        appRenderer.addPluginMenu({
            module: "serviceTree",
            test: (context, serviceInfo) => !!serviceInfo?.serviceName,
            menuInfo: {
              label: "复制服务名",
              click: (context, serviceInfo) => {
                appRenderer.$writeClipboard(serviceInfo.serviceName)
              } 
            }
        })


        appRenderer.addPluginMenu({
            module: "serviceTree",
            menuInfo: {
              label: "测试一下",
              click: (context, serviceInfo) => {
    
                context.tab.addTab( {
                  title: "百度",
                  src: "http://www.baidu.com",
                  multiInstance: true,
                  params: {
                  },
                })
                console.log(serviceInfo);
              } 
            }
        })


        
    }

}

export default ServiceTreeAction