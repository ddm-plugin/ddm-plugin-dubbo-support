
import paramGeneratorDubbo2_7   from '@/main/generator/ParamGeneratorDubbo2_7';
import paramGeneratorDubbo3     from '@/main/generator/ParamGeneratorDubbo3';


class ParamGeneratorAdapter {

    /**
     * 生成参数
     */
    generateParam(mateData, methodName) {
        // 当前提供者使用的dubbo版本
        const release = mateData.parameters.release;
        
        if(!release || !release.startsWith('3.')) {
            return paramGeneratorDubbo2_7.generateParam(mateData, methodName);
        }
        
        return paramGeneratorDubbo3.generateParam(mateData, methodName);
    }
}


export default new ParamGeneratorAdapter();