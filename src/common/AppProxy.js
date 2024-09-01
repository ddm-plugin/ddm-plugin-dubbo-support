import pkg from '../../package.json';

class AppProxy {


    constructor() {
        return new Proxy(this, {
            get(target, prop) {
                // 检查方法是否存在
                if (prop === 'setApp') {
                    return target.setApp.bind(target); 
                } 
                
                return target.app[prop].bind(target.app);
            }
        });
    }

    setApp(app) {
        this.app = app;
    }
}

export default new AppProxy();
