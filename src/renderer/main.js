import dubboPage                  from '@/renderer/views/dubbo/index.vue';
import dubboInvoke                from "@/renderer/views/dubbo/dubbo-invoke.vue";

import settings                   from '@/renderer/views/settings/index.vue';
import Zookeeper                  from "@/renderer/views/edit/Zookeeper.vue";
import Nacos                      from "@/renderer/views/edit/Nacos.vue";
import DubboAdmin                 from "@/renderer/views/edit/DubboAdmin.vue";

export default (appRenderer) => {

  return {
    install() {
      appRenderer.registryServicePageComponent('dubbo', dubboPage);
      appRenderer.registryServicInvokeComponent('dubbo', dubboInvoke);
            
      appRenderer.registryDataSourceUpdateComponent("zookeeper", Zookeeper, { label: "Zookeeper" });
      appRenderer.registryDataSourceUpdateComponent("nacos", Nacos, { label: "Nacos" });
      appRenderer.registryDataSourceUpdateComponent("dubbo-admin", DubboAdmin, { label: "Dubbo-Admin" });
      appRenderer.registrySettingComponent("Dubbo Settings", settings, {});
      
      appRenderer.addMenu('bottom', {
        label: '测试1',
        icon: "el-icon-toilet-paper",
        src: "https://json4u.com/editor",
        // click: () => {
        //   console.log('测试1')
        // },
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
      appRenderer.addPluginMenu({
        module: "serviceTree",
        test: (node) => node.nodeType !== 'package',
        menuInfo: {
          label: "新增一个接口",
          click: async (serviceInfo) => {
          console.log('新增了一个接口');
          } 
        }
      })

    },

    uninstall() {}
  }
};
