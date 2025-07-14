import dubboPage                  from '@/renderer/views/dubbo/index.vue';
import dubboInvoke                from "@/renderer/views/dubbo/dubbo-invoke.vue";

import settings                   from '@/renderer/views/settings/index.vue';
import Zookeeper                  from "@/renderer/views/edit/Zookeeper.vue";
import Nacos                      from "@/renderer/views/edit/Nacos.vue";
import DubboAdmin                 from "@/renderer/views/edit/DubboAdmin.vue";


import ServiceTreeAction          from './action/ServiceListAction';
import CollectListAction          from './action/CollectListAction';
import HistoryListAction          from './action/HistoryListAction';

import hello from './hello.vue';

/**
 * @param {import('@/renderer/types').AppRenderer} appRenderer
 */
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
        label: "测试",
        icon: "el-icon-toilet-paper",
        src: "https://json4u.com/editor",
        // click: () => {
        //   console.log('测试1')
        // },
      })


      new ServiceTreeAction(appRenderer);
      new CollectListAction(appRenderer);
      new HistoryListAction(appRenderer);

      appRenderer.openDialog({
        title: "密密麻麻的百度",
        component: hello,
        params: {
          name: "王老八"
        }
      });
    },

    uninstall() {}
  }
};
