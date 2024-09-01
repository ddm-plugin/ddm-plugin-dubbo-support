package indi.qiaolin.ddm.invoker;

import java.io.Serializable;

/**
 * @author qiaolin
 * @version v 0.1 2022年07月27日 10:46
 */

public class CallResult implements Serializable {

    /**
     * 是否调用成功
     */
    private Boolean success;

    /**
     * 调用返回的结果
     * 可能是数据，也可能是异常日志
     */
    private Object data;

    /**
     * 耗时
     */
    private Long elapsedTime;

    public CallResult(Boolean success, Object data, Long elapsedTime) {
        this.success = success;
        this.data = data;
        this.elapsedTime = elapsedTime;
    }

    public Boolean getSuccess() {
        return success;
    }

    public void setSuccess(Boolean success) {
        this.success = success;
    }

    public Object getData() {
        return data;
    }

    public void setData(Object data) {
        this.data = data;
    }

    public Long getElapsedTime() {
        return elapsedTime;
    }

    public void setElapsedTime(Long elapsedTime) {
        this.elapsedTime = elapsedTime;
    }
}
