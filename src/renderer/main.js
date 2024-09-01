import dubboProviderList          from "@/renderer/views/dubbo/dubbo-provider-list.vue";
import dubboConsumerList          from "@/renderer/views/dubbo/dubbo-consumer-list.vue";
import dubboInvoke                from "@/renderer/views/dubbo/dubbo-invoke.vue";
import dubboProviderConfiguration from "@/renderer/views/dubbo/dubbo-provider-configuration.vue";
import dubboPage                  from '@/renderer/views/dubbo/index.vue';

import messages                   from '@/i18n/';
import confetti                   from "canvas-confetti";

import Test from './Test.vue';
import settings from '@/renderer/views/settings/index.vue';


/* istanbul ignore next */
Test.install = function(appRenderer) {
  
  appRenderer.component(Test.name, Test);
  appRenderer.component('dubboPage', dubboPage);
  appRenderer.component('dubboProviderList', dubboProviderList);
  appRenderer.component('dubboConsumerList', dubboConsumerList);
  appRenderer.component('dubboInvoke', dubboInvoke);
  appRenderer.component('dubboProviderConfiguration', dubboProviderConfiguration);
  appRenderer.component('dubbo-settings', settings);

  appRenderer.addPluginSettingComponent({
    name: "Dubbo Settings",
    componentName: 'dubbo-settings',
  });
  
  appRenderer.addMenu('bottom', {
    label: '测试1',
    icon: "el-icon-toilet-paper",
    click: () => {
      console.log('测试1')
    },
  })
  appRenderer.addMenu('bottom', {
    label: '测试',
    icon: "el-icon-goods",
    componentName: "Test",
  })

  for(let key in messages) {
    appRenderer.registryPluginLocal(key, messages[key]);
  }

  appRenderer.addPluginMenu({
    module: "serviceTree",
    menuInfo: {
      label: "测试一下",
      click: async (serviceInfo) => {
       debugger
       console.log(serviceInfo);
      } 
    }
  })
  appRenderer.addPluginMenu({
    module: "serviceTree",
    test: (node) => {
      return node.nodeType !== 'package'
    },
    menuInfo: {
      label: "新增一个接口",
      click: async (serviceInfo) => {
       console.log('新增了一个接口');
      } 
    }
  })

  appRenderer.on('invokeMethodAfter', async (data) => {
    if(!(await appRenderer.getPluginProperty('invokeAfter_fireworks') ?? true)) {
      return;
    }

    console.log(data);
    const count = 200;
    const defaults = {
        origin: { y: 0.7 },
    };

    function fire(particleRatio, opts) {
        confetti({
            ...defaults,
            ...opts,
            particleCount: Math.floor(count * particleRatio),
        });
    }

    fire(0.25, {
        spread: 26,
        startVelocity: 55,
    });
    fire(0.2, {
        spread: 60,
    });
    fire(0.35, {
        spread: 100,
        decay: 0.91,
        scalar: 0.8,
    });
    fire(0.1, {
        spread: 120,
        startVelocity: 25,
        decay: 0.92,
        scalar: 1.2,
    });
    fire(0.1, {
        spread: 120,
        startVelocity: 45,
    });
  })

};

export default Test;
