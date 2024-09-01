export default {
    settings: {
        title:"执行器设置",
        invokerType : "默认执行器类型",
        invokerTypeTips : "使用Java执行器时，请先安装Java环境，Java调用相对Telnet执行器较慢，但是Java调用返回的信息更加完整。",
    },
    connect: {

        zookeeper: {
            address: "链接地址",
            sessionTimeout: "超时时间",
            aclTips: "请输入认证信息, 例如：test:test"
        },

        nacos: {
            address: "链接地址",
            namespaceId: "命名空间ID",
            sessionTimeout: "超时时间",
            username: "用户名",
            password: "密码",
            groupName: '服务分组名称',
            groupNameTips: '请输入服务分组名称，默认为 DEFAULT_GROUP',
            group: '配置分组名称',
            groupTips: '请输入配置分组名称，默认为 dubbo',
        },

        dubboAdmin: {
            address: "链接地址",
            sessionTimeout: "超时时间",
            username: "用户名",
            password: "密码",
        }
    },
    dubbo: {
        serviceTab: {
            providerList: "提供者列表",
            consumerList: "消费者列表",
        },
        providePage: {
            protocol: "协议",
            address: "地址",
            application: "所属应用",
            version: "版本号",
            disabled: "禁用",
            methodCount: "方法数量",
            operate: "操作",
            disableTypeMap : {
                service: "服务维度",
                application: "应用维度"
            },
            call: "调用",
            callTitle: "调用 {address}",
            exportExcel:"导出Excel",
            selectExportDirectory : "选择导出目录",
            exportSuccess : "导出成功", 
            exportError : "导出失败, 原因:{}",
            serviceEnable : "服务维度-启用",
            serviceDisable : "服务维度-禁用",
            editConfiguration : "编辑服务动态配置",
        },

        consumerPage: {
            ip : "地址",
            application: "所属应用",
            version: "版本号",
            check: "检查",
            enable: "是否可用",
            disabled: "禁用",
            timeout: "超时",
            retries: "重试",
            exportExcel:"导出Excel",
            selectExportDirectory : "选择导出目录",
            exportSuccess : "导出成功", 
            exportError : "导出失败, 原因:{}",
            dubboVersion: "Dubbo版本",
        },
        invokePage: {
            serviceName: "接口",
            application: "应用",
            address: "地址",
            generic: "泛化",
            version: "版本",
            dubboVersion: "Dubbo 版本",
            jarVersion: "Jar 版本",
            method: "方法",
            operate: "操作",
            call: "调用",
            calling: "调用中",
            historyParam: "历史参数",
            generateParam: "生成参数",
            generateCommand: "生成命令",
            requestParamType: "请求参数类型",
            requestParam: "请求参数",
            requestParamStrategyTitle: "参数生成策略",
            paramGenerateStrategyDesc: "首先会使用上次调用成功的历史参数，如果没有，会尝试生成参数",
            format: "格式化",
            responseInfo: "响应",
            historyInvokeParamList: "历史调用参数",
            callParamError: "请求参数格式有误",
            callDubboServiceSuccess: "调用dubbo接口成功",
            callDubboServiceFail: "调用dubbo接口失败，原因：{e}",
            generateParamError: "无法生成参数！原因：{error}",
            invokeProgress: "正在调用..",
            cancelInvoke: "取消调用",
            invokeTimeOut: "调用Dubbo接口超时",
            connectProviderError: "连接提供者服务器失败！",
            notFoundJDK:"如果需要使用Java调用器，请先安装JDK",
            callDubboAdminError: "调用dubbo-admin失败, {info}",
            unselectedHistory:"未选择历史参数",
            notFoundMatedata:"未找到元数据，无法获取到方法参数类型，请补充",
        },
        configurationPage: {
            title : "配置信息",
            save : "保存配置",
            invalidFormat : "配置格式错误",
            saveSuccess:"保存成功"
        }
    },
}