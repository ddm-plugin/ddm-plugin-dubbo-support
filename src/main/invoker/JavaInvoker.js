const { execFile } = require('child_process');
import fs                           from 'fs';
import path                         from 'path';
import app                          from '@/common/AppProxy.js';
import jsonFormat                   from "@/common/JsonFormat";
import InvokeUtils                  from "@/main/invoker/InvokeUtils.js";

class JavaInvoker {

    constructor(appCore) {
        this.pluginPath = appCore.pluginPath;

        this.appCore = appCore;
    }

    async invokeMethod(provder, methodInfo, code) {
        const { ip, port, serviceName } = provder;
    
        const dataList = [];
        const params = JSON.parse(code);
        for (let i = 0; i < params.length; i++) {
            let data = params[i];
            if(typeof(data) =='string'){
                dataList.push(data);
            } else {
                dataList.push(JSON.stringify(data));
            }
        }
    
        const invokeParam = {
            interfaceName: serviceName,
            protocol: provder.protocol,
            address: `${ip}:${port}`,
            version: provder.version,
            method: methodInfo.name,
            argsList: this.getMethodParameterTypes(methodInfo),
            dataList: dataList
        }
    
        const outFile = path.join(`${this.pluginPath}/java-invoke/`, `${serviceName}${new Date().getTime()}.json`);
        fs.writeFileSync(outFile, JSON.stringify(invokeParam));
     
        let data = await this.executeJar(outFile);
        if(data.success){
            return new InvokeUtils.InvokeResult(jsonFormat.format(JSON.stringify(data.data)), data.elapsedTime);
        }
        return new InvokeUtils.InvokeResult(data["data"], data.elapsedTime);
    }
    
    // org.apache.dubbo.demo.provider.TestFacade 172.21.144.191:20880 test "[\"java.lang.String\",\"java.lang.Integer\",\"java.lang.Integer\"]" "[\"王老八\",\"18\",\"0\"]" /Users/qiaolin/.dubbo-desktop-manager/temp/aa.json
    executeJar(outFile) {
        const javaHome = this.appCore.appConfig.getProperty("javaHome");
        if(!javaHome){
            return Promise.resolve({
                success : false,
                data :  app.pluginT("dubbo.invokePage.notFoundJDK", {javaHome: javaHome}),
                elapsedTime : 0
            });
        }
    
        const jvmArgs = this.appCore.appConfig.getProperty("jvmArgs");
        const commandArgs = [
            ...(jvmArgs ? [jvmArgs] : []),
            '-Dfile.encoding=utf-8',
            '-jar', path.join(this.pluginPath, '/public/jar/java-invoker.jar'),
            outFile
        ];
        const config = {
            // maxBuffer: 100 * 1024 * 1024 * 1024, // 1G
            cwd: this.appCore.constant.USER_HOME_DIR,
            shell: true
        }
    
        // eslint-disable-next-line no-unused-vars
        return new Promise((resolve, reject) => {
            execFile(`"${path.join(javaHome, '/bin/java')}"`, commandArgs, config, (error, stdout, stderr) => {
                if (error) {
                    let tempError = error.message || stderr || stdout;
                    // JDK不存在
                    if(/spawn .* ENOENT/.test(tempError)){
                        tempError = app.pluginT("dubbo.invokePage.notFoundJDK", {javaHome: javaHome});
                    }
                    resolve({
                        success : false,
                        data :  tempError,
                        elapsedTime : 0
                    });
                    return;
                }
    
                let data = fs.readFileSync(outFile, 'utf8').toString();
                setTimeout(() => {
                    fs.rmSync(outFile);
                }, 1);
                resolve(JSON.parse(data));
            });
    
        });
    
    
    }
    
    getMethodParameterTypes(methodInfo) {
        return methodInfo.parameterTypes.map(paramterType => {
            if(paramterType.indexOf("<") >= 0) {
                return paramterType.substring(0, paramterType.indexOf("<"));
    
            }
            return paramterType;
        });
    }
    
}

export default JavaInvoker;