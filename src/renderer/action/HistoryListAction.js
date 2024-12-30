


class ServiceTreeAction {

    constructor(appRenderer) {
        this.appRenderer = appRenderer;

        appRenderer.addPluginMenu({
            module: "historyList",
            test: (context, invokeHistry) => !!invokeHistry?.serviceName,
            menuInfo: {
              label: "复制服务名",
              click: (context, invokeHistry) => {
                appRenderer.$writeClipboard(invokeHistry.serviceName)
              } 
            }
        })


        
    }

}

export default ServiceTreeAction