<template>
  <el-table :data="consumerList" :stripe="true" size="mini" :highlight-current-row="true" :border="true" :header-row-class-name="consumerListTableHeaderRowClassName">
    <el-table-column type="expand">
      <template slot="header">
        <el-tooltip class="item" effect="light" :content="$pluginT('dubbo.consumerPage.exportExcel')" placement="top-start">
          <i class="el-icon-document" @click="exportExcel"></i>
        </el-tooltip>
      </template>
      <template slot-scope="props">
        <div v-for="method in props.row.methods" :key="method">{{method}}</div><br />
      </template>
    </el-table-column>
    <el-table-column prop="ip" :label="$pluginT('dubbo.consumerPage.ip')" column-key="ip" show-overflow-tooltip min-width="110px"> </el-table-column>
    <el-table-column prop="application" :label="$pluginT('dubbo.consumerPage.application')" show-overflow-tooltip min-width="200px"> </el-table-column>
    <el-table-column prop="version" :label="$pluginT('dubbo.consumerPage.version')" show-overflow-tooltip>
      <template slot-scope="scope">
        {{scope.row.providerVersion}}
      </template>
    </el-table-column>
    <el-table-column prop="dubboVersion" :label="$pluginT('dubbo.consumerPage.dubboVersion')" show-overflow-tooltip>
    </el-table-column>
    <el-table-column prop="disabled" :label="$pluginT('dubbo.consumerPage.disabled')" show-overflow-tooltip>
      <template slot-scope="scope" v-if="scope.row.disabled">
        <span class="versionSpan">{{ scope.row.disabled ? $t('base.yes') : $t('base.no')  }} </span>
      </template>
    </el-table-column>
    <el-table-column prop="timeout" :label="$pluginT('dubbo.consumerPage.timeout')" show-overflow-tooltip> </el-table-column>
    <el-table-column prop="retries" :label="$pluginT('dubbo.consumerPage.retries')" show-overflow-tooltip> </el-table-column>
  </el-table>
</template>

<script>

export default {
  data() {
    return {
      consumerList: [],
    };
  },
  props: {
    serviceInfo: Object,
  },
  inject: ['dataSourceInfo'],
  mounted() {
    this.handleNodeClick();
  },
  methods: {
    async handleNodeClick() {
      this.consumerList = await this.$dataSource.getConsumerList(this.dataSourceInfo, this.serviceInfo);
    },
    consumerListTableHeaderRowClassName() {
      return "consumer-list-table-header";
    },
    exportExcel() {
      let filePaths = this.$remote.dialog.showOpenDialogSync({
        title: this.$pluginT('dubbo.consumerPage.selectExportDirectory'),
        defaultPath: "./",

        filters: [{
          name: "Excel",
          extensions: ["xlsx"]
        }],
        properties: [
          "openDirectory",
          "createDirectory"
        ]
      })

      if (filePaths) {
        let headerList = [
          {
            key: 'ip',
            title: this.$pluginT('dubbo.consumerPage.ip'),
            width: 30
          },
          {
            key: 'application',
            title: this.$pluginT('dubbo.consumerPage.application'),
          },
          {
            key: 'version',
            title: this.$pluginT('dubbo.consumerPage.version'),
          },
          {
            title: this.$pluginT('dubbo.consumerPage.check'),
            getContent: (row) => {
              return row.check ? this.$t('base.yes') : this.$t('base.no');
            }
          },
          {
            title: this.$pluginT('dubbo.consumerPage.enable'),
            getContent: (row) => {
              return row.check ? this.$t('base.yes') : this.$t('base.no');
            }
          },
          {
            key: 'timeout',
            title: this.$pluginT('dubbo.consumerPage.timeout'),
          },
          {
            key: 'retries',
            title: this.$pluginT('dubbo.consumerPage.retries'),
          },
        ]


        let suffix = this.$moment(new Date()).format("YYYYMMDD_HHmmss");
        let filePath = filePaths[0] + `/${this.$pluginT('dubbo.serviceTab.consumerList').replace(/\s/g, '_')}-${suffix}.xlsx`;
        try {

          this.$excelExportUtils.generateExcelAndWriterFile(headerList, this.consumerList, filePath);
          this.$message({
            type: "success",
            message: this.$pluginT('dubbo.providePage.exportSuccess'),
          });
        } catch (e) {
          this.$message({
            type: "error",
            message: this.$pluginT('dubbo.providePage.exportError'),
          });
        }
      }

    },
  },
};
</script>

<style>
.consumer-list-table-header .el-table__cell {
  background-color: rgb(249, 249, 249) !important;
}
</style>