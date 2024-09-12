import dubboProviderList          from "@/renderer/views/dubbo/dubbo-provider-list.vue";
import dubboConsumerList          from "@/renderer/views/dubbo/dubbo-consumer-list.vue";
import dubboInvoke                from "@/renderer/views/dubbo/dubbo-invoke.vue";
import dubboProviderConfiguration from "@/renderer/views/dubbo/dubbo-provider-configuration.vue";
import dubboPage                  from '@/renderer/views/dubbo/index.vue';

import settings from '@/renderer/views/settings/index.vue';
import Zookeeper from "@/renderer/views/edit/Zookeeper.vue";
import Nacos from "@/renderer/views/edit/Nacos.vue";
import DubboAdmin from "@/renderer/views/edit/DubboAdmin.vue";

export default (appRenderer) => {

  return {
    install() {
      appRenderer.component('dubboPage', dubboPage);
      appRenderer.component('dubboProviderList', dubboProviderList);
      appRenderer.component('dubboConsumerList', dubboConsumerList);
      appRenderer.component('dubboInvoke', dubboInvoke);
      appRenderer.component('dubboProviderConfiguration', dubboProviderConfiguration);

      appRenderer.registryDataSourceUpdateComponent("zookeeper", Zookeeper, {});
      appRenderer.registryDataSourceUpdateComponent("nacos", Nacos, {});
      appRenderer.registryDataSourceUpdateComponent("dubbo-admin", DubboAdmin, {});
      appRenderer.registrySettingComponent("Dubbo Settings", settings, {});
      
      appRenderer.addMenu('bottom', {
        label: '测试1',
        icon: "el-icon-toilet-paper",
        click: () => {
          console.log('测试1')
        },
      })


      appRenderer.addPluginMenu({
        module: "serviceTree",
        menuInfo: {
          label: "测试一下",
          click: (serviceInfo) => {
            debugger
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
