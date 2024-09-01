
import TelnetInvoker                    from "@/main/invoker/TelnetInvoker.js";
import JavaInvoker                      from "@/main/invoker/JavaInvoker.js";
import InvokerAdapter                   from "@/main/invoker/InvokerAdapter";
import ZookeeperDataSource              from "./datasource/ZookeeperDataSource";
import NacosDataSource                  from "./datasource/NacosDataSource";
import DubboAdminDataSource             from "./datasource/DubboAdminDataSource";
import messages                         from '../i18n';
import appProxy                         from '@/common/AppProxy.js';

export default (app) => {
    Map.prototype.computeIfAbsent = async function (key, fun) {
        if(!this.has(key)){
            this.set(key, await fun(key));
        }
        return this.get(key);
    }

    return {
        register() {
            for(let key in messages) {
                app.registryPluginLocal(key, messages[key]);
            }
            appProxy.setApp(app);
                        
            const invoker = new InvokerAdapter(new JavaInvoker(app), new TelnetInvoker());
            app.registerDataSource('dubbo-admin', new DubboAdminDataSource(app));
            app.registerDataSource('nacos', new NacosDataSource(app, invoker));
            app.registerDataSource('zookeeper', new ZookeeperDataSource(app, invoker));
            return {}
        }
    };

}