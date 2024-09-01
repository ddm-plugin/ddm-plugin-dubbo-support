/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
package indi.qiaolin.ddm.invoker;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.serializer.SerializerFeature;
import org.apache.commons.io.FileUtils;
import org.apache.dubbo.config.ApplicationConfig;
import org.apache.dubbo.config.ReferenceConfig;
import org.apache.dubbo.config.utils.ReferenceConfigCache;
import org.apache.dubbo.rpc.service.GenericService;

import java.io.CharArrayWriter;
import java.io.File;
import java.io.PrintWriter;
import java.nio.charset.Charset;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.*;
import java.util.function.Function;

public class Application {
    public static void main(String[] args) throws Exception {
        String path = "/Users/qiaolin/Downloads/indi.sz.demo.dubbo.facade.TeacherFacade1722517308088.json";
        String content = FileUtils.readFileToString(new File(path), Charset.forName("UTF-8"));
        InvokeParam invokeParam = JSON.parseObject(content, InvokeParam.class);

        long start = System.currentTimeMillis();
        try {
            CallResult invoke = invoke(invokeParam);
            System.out.println(JSON.toJSONString(invoke, SerializerFeature.WriteMapNullValue));
            FileUtils.writeStringToFile(new File(path), JSON.toJSONString(invoke, SerializerFeature.WriteMapNullValue));
        } catch (Exception e) {
            e.printStackTrace();
            CharArrayWriter writer = new CharArrayWriter(8096);
            e.printStackTrace(new PrintWriter(writer));
            long end = System.currentTimeMillis();
            CallResult callResult = new CallResult(false, writer.toString(), end - start);
            System.out.println(JSON.toJSONString(callResult, SerializerFeature.WriteMapNullValue));
            FileUtils.writeStringToFile(new File(path), JSON.toJSONString(callResult, SerializerFeature.WriteMapNullValue));
        }
    }

    private static CallResult invoke(InvokeParam invokeParam){

        ReferenceConfig<GenericService> reference = new ReferenceConfig<>();
        reference.setInterface(invokeParam.getInterfaceName());
        reference.setVersion(invokeParam.getVersion());
        reference.setUrl(invokeParam.getProtocol() + "://" + invokeParam.getAddress());
        reference.setTimeout(30000);
        reference.setGeneric(true);
        reference.setApplication(new ApplicationConfig("dubbo-demo-api-consumer"));
//        DubboBootstrap bootstrap = DubboBootstrap.getInstance();
//        bootstrap
//                .application(new ApplicationConfig("dubbo-demo-api-consumer"))
////                .registry(new RegistryConfig("zookeeper://127.0.0.1:2181"))
//  4              .reference(reference)
//                .start();


//        String message = ReferenceConfigCache.getCache().get(reference).sayHello("dubbo");
//        TestDto test = ReferenceConfigCache.getCache().get(reference).test("王老八", null, 0);

        GenericService o = ReferenceConfigCache.getCache().get(reference);
//        Object o = reference.get();

        long start = System.currentTimeMillis();
        String[] argsTypes = invokeParam.getArgsList().toArray(new String[invokeParam.getArgsList().size()]);
        Object o1 = o.$invoke(invokeParam.getMethod(), argsTypes, parseData(invokeParam));
        long end = System.currentTimeMillis();

        return new CallResult(true, o1, end- start);
    }


    private static Object[] parseData(InvokeParam invokeParam){
        Object[] datas = new Object[invokeParam.getDataList().size()];

        for (int i = 0; i < invokeParam.getDataList().size(); i++) {
            datas[i] = parse(invokeParam.getArgsList().get(i), invokeParam.getDataList().get(i));
        }

        return datas;
    }

    /**
     *  基本类型支持
     */
    private static final Map<String, Function<String, Object>> TYPE_HANDLER_MAP = new HashMap<>();

    static {
        addType(Byte.class, data -> data == null ? null : Byte.valueOf(data));
        addType(byte.class, data -> data == null ? null : Byte.valueOf(data));
        addType(Character.class, data -> data == null ? null : data.toCharArray()[0]);
        addType(char.class, data -> data == null ? null : data.toCharArray()[0]);
        addType(Short.class, data -> data == null ? null : Short.valueOf(data));
        addType(short.class, data -> data == null ? null : Short.valueOf(data));
        addType(Integer.class, data -> data == null ? null : Integer.valueOf(data));
        addType(int.class, data -> data == null ? null : Integer.valueOf(data));
        addType(Float.class, data -> data == null ? null : Float.valueOf(data));
        addType(float.class, data -> data == null ? null : Float.valueOf(data));
        addType(Long.class, data -> data == null ? null : Long.valueOf(data));
        addType(long.class,data -> data == null ? null : Long.valueOf(data));
        addType(Double.class, data -> data == null ? null : Double.valueOf(data));
        addType(double.class, data -> data == null ? null : Double.valueOf(data));
        addType(Boolean.class, data -> data == null ? null : Boolean.valueOf(data));
        addType(boolean.class, data -> data == null ? null : Boolean.valueOf(data));
        addType(String.class, data -> data);
        addType(Enum.class, data -> data);
        addType(Date.class, data -> {
            try {
                return data == null ? null : new SimpleDateFormat("yyyy-MM-dd HH:mm:ss").parse(data);
            } catch (ParseException e) {
                throw new RuntimeException(e);
            }
        });
        addType(List.class, data -> {
            List<String> strings = JSON.parseArray(data, String.class);
            List<Object> result = new ArrayList<>(strings.size());
            for (String string : strings) {
                try {
                    // 如果是json
                    result.add( JSON.parseObject(string, Map.class));
                } catch (Exception e) {
                    // 尝试最原始的方式返回
                    result.add(string);
                }
            }

            return result;
        });
    }

    private static void addType(Class<?> clazz, Function<String, Object> typeHandler){
        TYPE_HANDLER_MAP.put(clazz.getName(), typeHandler);
        TYPE_HANDLER_MAP.put(clazz.getName() + "[]", data -> data == null ? null : JSON.parseArray(data, clazz));
    }

    private static Object parse(String type, String data){
        Function<String, Object> typeHandler = TYPE_HANDLER_MAP.get(type);
        if (typeHandler != null) {
            return typeHandler.apply(data);
        }

        try {
            return JSON.parseObject(data, Map.class);
        } catch (Exception e) {
            // 尝试最原始的方式返回
            return JSON.parseArray(data, Map.class);
        }
    }

//    private static Object parseData( String type, String data){
//        Set<String> baseType = Sets.newHashSet("int", "java.lang.Integer");
//    }
}
