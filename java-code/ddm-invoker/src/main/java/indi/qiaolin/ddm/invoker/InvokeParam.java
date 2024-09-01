package indi.qiaolin.ddm.invoker;


import org.apache.dubbo.common.utils.CollectionUtils;
import org.apache.dubbo.common.utils.StringUtils;

import java.io.Serializable;
import java.util.List;

/**
 * @author qiaolin
 * @version v 0.1 2022年08月19日 20:55
 */

public class InvokeParam implements Serializable {

    /**
     * 接口名
     */
    private String interfaceName;

    /**
     * 协议
     */
    private String protocol;

    /**
     * 提供者地址
     */
    private String address;

    /**
     * 接口版本
     */
    private String version;

    /**
     * 需要调用的方法
     */
    private String method;

    /**
     * 参数列表
     */
    private List<String> argsList;

    /**
     * 数据信息
     */
    private List<String> dataList;

    public String getProtocol() {
        if (StringUtils.isBlank(protocol)) {
            return "dubbo";
        }
        return protocol;
    }

    public void setProtocol(String protocol) {
        this.protocol = protocol;
    }

    public String getInterfaceName() {
        return interfaceName;
    }

    public void setInterfaceName(String interfaceName) {
        this.interfaceName = interfaceName;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getVersion() {
        return version;
    }

    public void setVersion(String version) {
        this.version = version;
    }

    public String getMethod() {
        return method;
    }

    public void setMethod(String method) {
        this.method = method;
    }

    public List<String> getArgsList() {
        return argsList;
    }

    public void setArgsList(List<String> argsList) {
        this.argsList = argsList;
    }

    public List<String> getDataList() {
        return dataList;
    }

    public void setDataList(List<String> dataList) {
        this.dataList = dataList;
    }
}
