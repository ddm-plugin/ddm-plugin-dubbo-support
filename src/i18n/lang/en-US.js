export default {
    settings: {
        title: "Invoker Setting",
        invokerType : "Default Invoker Type",
        invokerTypeTips : "Before using the Java actuator, install the Java environment first. Java invocation is slower than Telnet invocation, but the information returned by the Java invocation is more complete.",
    },
    connect: {
        zookeeper: {
            address: "address",
            sessionTimeout: "timeout",
            aclTips: "Enter the authentication information, for example, test:test"
        },

        nacos: {
            address: "address",
            namespaceId: "namespaceId",
            sessionTimeout: "timeout",
            username: "username",
            password: "password",
            groupName: 'ServiceGroupName',
            groupNameTips: 'Enter the name of the service GROUP. The DEFAULT is DEFAULT GROUP',
            group: 'ConfiguringGroupName',
            groupTips: 'Please enter the configuration group name. The default is dubbo',
        },

        dubboAdmin: {
            address: "address",
            sessionTimeout: "timeout",
            username: "username",
            password: "password",
        }
    },
    dubbo: {
        serviceTab: {
            providerList: "Provider List",
            consumerList: "Consumer List",
        },
        providePage: {
            protocol: "protocol",
            address: "address",
            application: "application",
            version: "version",
            disabled: "disabled",
            methodCount: "methodCount",
            operate: "operate",
            disableTypeMap : {
                service: "service",
                application: "application"
            },
            call: "call",
            callTitle: "call {address}",
            exportExcel:"Export Excel",
            selectExportDirectory : "Selecting an Export Directory",
            exportSuccess : "Export success", 
            exportError : "The export fails. Possible cause:{}",
            serviceEnable : "Service Dimension - Enabled",
            serviceDisable : "Service Dimension - Disabled",
            editConfiguration : "Edit the service dynamic configuration",
        },
        
        consumerPage: {
            ip : "ip",
            application: "application",
            version: "version",
            check: "check",
            enable: "enable",
            disabled: "disabled",
            timeout: "timeout",
            retries: "retries",
            exportExcel:"Export Excel",
            selectExportDirectory : "Selecting an Export Directory",
            exportSuccess : "Export success", 
            exportError : "The export fails. Possible cause:{}",
            dubboVersion: "dubboVersion",
        },

        invokePage: {
            serviceName: "serviceName",
            application: "application",
            address: "address",
            generic: "generic",
            version: "version",
            dubboVersion: "Dubbo version",
            jarVersion: "Jar version",
            method: "method",
            operate: "operate",
            call: "call",
            calling: "calling",
            historyParam: "History Parameter",
            generateParam: "Generation Parameter",
            generateCommand: "Generation Command",
            requestParamType: "Request Parameter Type",
            requestParam: "Request Parameter",
            requestParamStrategyTitle: "Parameter generation strategy",
            paramGenerateStrategyDesc: "The history argument of the last successful call is used first, and if not, an attempt is made to generate the argument",
            format: "format",
            responseInfo: "Response",
            historyInvokeParamList: "History call",
            callParamError: "The request parameter format is incorrect",
            callDubboServiceSuccess: "Calling the Dubbo interface succeeded.",
            callDubboServiceFail: "Failed to invoke the Dubbo interface：{e}",
            generateParamError: "Unable to generate parameters! The reason: {error}",
            invokeProgress: "Call in progress",
            cancelInvoke: "Cancel",
            invokeTimeOut: "The call to the Dubbo interface timed out.",
            connectProviderError: "Connecting to the provider server failed!",
            notFoundJDK:"If you need to use the Java caller, install the JDK first",
            callDubboAdminError: "Failed to call dubco-admin, {info}",
            unselectedHistory:"No history parameter is selected",
            notFoundMatedata:"Metadata not found, method parameter type cannot be obtained, please add",
        },
        configurationPage: {
            title : "configuration information",
            save : "save configuration",
            invalidFormat : "Incorrect configuration format",
            saveSuccess:"save successfully"
        }
    }
}