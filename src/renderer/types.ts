/** 服务页面组件 */
export type ServicePageComponent = any;
/** 服务调用组件 */
export type ServiceInvokeComponent = any;
/** 数据源编辑组件 */
export type DataSourceComponent = any;
/** 设置组件 */
export type SettingComponent = any;
/** 弹窗组件 */
export type DialogComponent = any;

/** 菜单项配置 */
export interface MenuItem {
    /** 菜单显示名 */
    label: string;
    /** 图标 class 名称 */
    icon: string;
    /** 点击后跳转的 URL 地址 */
    src: string;
}

/** 打开对话框的配置 */
export interface DialogOptions {
    /** 弹窗标题 */
    title: string;
    /** 渲染的组件 */
    component: DialogComponent;
    /** 传入组件的参数 */
    params?: Record<string, any>;
}

/** 数据源组件的额外配置 */
export interface DataSourceComponentOptions {
    /** 显示的标签文字 */
    label: string;
}

/**
 * 插件系统注入的 AppRenderer 类型
 * 所有插件与宿主通信的核心对象
 */
export interface AppRenderer {
    /**
     * 注册服务页面组件
     * @param name 服务名
     * @param component 页面组件
     */
    registryServicePageComponent(
        name: string,
        component: ServicePageComponent
    ): void;

    /**
     * 注册服务调用组件
     * @param name 服务名
     * @param component 调用组件
     */
    registryServicInvokeComponent(
        name: string,
        component: ServiceInvokeComponent
    ): void;

    /**
     * 注册数据源编辑组件
     * @param type 数据源类型
     * @param component 编辑组件
     * @param options 配置项
     */
    registryDataSourceUpdateComponent(
        type: string,
        component: DataSourceComponent,
        options: DataSourceComponentOptions
    ): void;

    /**
     * 注册设置页面组件
     * @param label 设置项标题
     * @param component 设置组件
     * @param options 其他配置
     */
    registrySettingComponent(
        label: string,
        component: SettingComponent,
        options: Record<string, any>
    ): void;

    /**
     * 添加菜单项
     * @param position 菜单位置（如 top / bottom）
     * @param menuItem 菜单项配置
     */
    addMenu(position: string, menuItem: MenuItem): void;

    /**
     * 打开一个对话框
     * @param options 对话框配置
     */
    openDialog(options: DialogOptions): void;
}
