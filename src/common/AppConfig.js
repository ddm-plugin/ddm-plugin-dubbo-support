
class AppConfigProxy {

    setAppConfig(appConfig) {
        this.appConfig = appConfig;
    }

    /**
     * 设置一个配置
     * @param {string} key 配置key
     * @param {any} value 配置value
     * @returns {void}
     */
    setProperty(key, value) {
        return this.appConfig.setProperty(key, value);
    }

    /**
     * 是否存在某个配置
     * @param {string} key 
     * @returns 
     */
    hasProperty(key) {
        return this.appConfig.hasProperty(key);
    }

    /**
     * 获取一个配置
     * @param {string} key 
     * @returns {any} 配置对象
     */
    getProperty(key) {
        return this.appConfig.getProperty(key);
    }
}

export default new AppConfigProxy();