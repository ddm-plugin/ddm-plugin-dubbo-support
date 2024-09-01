<template>
  <div class="configuration-container">
    <yamlCodeEditor ref="codeEditor" :codeConfig="codeConfig">
      <template v-slot:titel>
        {{$pluginT('dubbo.configurationPage.title')}}
      </template>
      <template v-slot:content>
        <el-tooltip class="item" effect="light" :content="$pluginT('dubbo.configurationPage.save')" placement="top">
          <i class="el-icon-news" @click="save"></i>
        </el-tooltip>
      </template>
    </yamlCodeEditor>
  </div>
</template>

<script>

export default {
  props: {
    serviceInfo: Object,
    provider: Object,
  },
  inject: ['dataSourceInfo'],
  data() {
    return {
      codeConfig: {
        code: "",
      },
    }
  },
  created() {
    this.getConfiguration();
  },
  mounted() {
    this.$refs.codeEditor.fullScreen();
  },
  methods: {
    async getConfiguration() {
      this.codeConfig.code = await this.$dataSource.getConfiguration(this.dataSourceInfo, this.serviceInfo, this.provider);
    },
    async save() {
      await this.$dataSource.saveConfiguration(this.dataSourceInfo, this.serviceInfo, this.provider, this.codeConfig.code);
      this.$message({
        type: "success",
        message: this.$pluginT('dubbo.configurationPage.saveSuccess'),
      });
    }
  }
}
</script>

<style>
.configuration-container {
  height: 100%;
}

.configuration-container .vue-codemirror {
  height: 80vh;
}

.configuration-container .CodeMirror {
  height: 100% !important;
}
</style>