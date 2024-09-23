


class ServiceTreeAction {

    constructor(appRenderer) {
        this.appRenderer = appRenderer;

        appRenderer.addPluginMenu({
            module: "collectList",
            test: (context, collectInfo) => !!collectInfo?.serviceName,
            menuInfo: {
              label: "复制服务名",
              click: (context, serviceInfo) => {
                appRenderer.$writeClipboard(serviceInfo.serviceName)
              } 
            }
        })
        
    }

}

export default ServiceTreeAction