<template>
    <div class="settingsContainer">
  
      <el-divider content-position="left">{{$pluginT('settings.title')}}</el-divider>
      {{$pluginT('settings.invokerType')}}：
      <el-select v-model="invokerType">
        <el-option v-for="invokerType in invokerTypes" :key="invokerType.code" :label="invokerType.name" :value="invokerType.code"></el-option>
      </el-select>
      <br />
      <br />
      <br />
      {{$pluginT('settings.invokerTypeTips')}}
      
      <el-divider content-position="left"></el-divider>
      <el-checkbox v-model="invokeAfter_fireworks">调用成功后是否放烟花</el-checkbox>
    </div>
  </template>
  
  <script>
  
  
  export default {
    data() {
      return {
        invokerType: "telnet",
        invokerTypes: [
            {
                code: "telnet",
                name: "Telnet"
            },
            {
                code: "java",
                name: "Java"
            }
        ],
        invokeAfter_fireworks: true,
      }
    },
    async created() {
      this.invokerType = await this.getPluginProperty("invokerType") || "telnet";
      this.invokeAfter_fireworks = await this.getPluginProperty('invokeAfter_fireworks') ?? true;
    },
    methods: {
      getPluginSettings() {
        return {
            invokerType: this.invokerType,
            invokeAfter_fireworks: this.invokeAfter_fireworks,
        }
      }
    }
  
  }
  </script>
  
  <style>
  .settingsContainer {
    padding-left: 15px;
    background-color: white;
    border-radius: 5px;
  }
  </style>