<template>
  <div class="dubboProviderListContainer">
    <el-table :data="providerList" class="content" @row-contextmenu="openMenu" ref="report-table" :highlight-current-row="true" 
              :stripe="true" :header-row-class-name="providerListTableHeaderRowClassName" size="mini" :border="true">
      <el-table-column type="expand">
        <template slot="header">
          <el-tooltip class="item" effect="light" :content="$pluginT('dubbo.providePage.exportExcel')" placement="top-start">
            <i class="el-icon-document" @click="exportExcel"></i>
          </el-tooltip>
        </template>
        <template slot-scope="props">
          <div v-for="method in props.row.methods" :key="method">{{method}}</div><br />
        </template>
      </el-table-column>
      <el-table-column prop="protocol"  width="70px" :label="$pluginT('dubbo.providePage.protocol')" column-key="protocol" :show-overflow-tooltip="true" />
      <el-table-column prop="address" :label="$pluginT('dubbo.providePage.address')" column-key="address" :show-overflow-tooltip="true">
      </el-table-column>
      <el-table-column prop="application" :label="$pluginT('dubbo.providePage.application')" :show-overflow-tooltip="true">
      </el-table-column>
      <el-table-column prop="version" :label="$pluginT('dubbo.providePage.version')" :show-overflow-tooltip="true">
        <template slot-scope="scope">
          <span class="versionSpan">{{ scope.row.providerVersion  }} </span>
        </template>
      </el-table-column>
      <el-table-column prop="disabled" width="100px" :label="$pluginT('dubbo.providePage.disabled')" :show-overflow-tooltip="true">
        <template slot-scope="scope" v-if="scope.row.disabled ">
          <span class="versionSpan">{{ scope.row.disabled ? $t('base.yes') : $t('base.no')  }} </span>
        </template>
      </el-table-column>
      <el-table-column prop="methods" width="120px" :label="$pluginT('dubbo.providePage.methodCount')" :show-overflow-tooltip="true">
        <template slot-scope="scope">
          {{scope.row.methods.length}}
        </template>
      </el-table-column>
      <el-table-column :label="$pluginT('dubbo.providePage.operate')" fixed="right" width="150px">
        <template slot-scope="scope">
          <div style="display: flex">
            <el-button size="mini" @click="openInvokeDrawer(scope.row)">{{$pluginT('dubbo.providePage.call')}}</el-button>
            <el-button size="mini" @click="openTelnet(scope.row)">telnet</el-button>
          </div>
        </template>
      </el-table-column>
    </el-table>

  </div>
</template>

<script>

export default {
  components: {

  },
  data() {
    return {
      providerList: []
    };
  },
  props: {
    tab: Object,
    serviceInfo:  Object,
  },
  inject: ['dataSourceInfo'],
  mounted() {
    this.refreshProviderList();
  },
  methods: {
    providerListTableHeaderRowClassName() {
      return "provider-list-table-header";
    },
    async exportExcel() {
      let filePaths = this.$remote.dialog.showOpenDialogSync({
        title: this.this.$pluginT('dubbo.consumerPage.selectExportDirectory'),
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

      if (!filePaths) {
        return;
      }
      let headerList = [
        {
          key: 'address',
          title: this.$pluginT('dubbo.providePage.address'),
          width: 30
        },
        {
          key: 'application',
          title: this.$pluginT('dubbo.providePage.application'),
        },
        {
          key: 'version',
          title: this.$pluginT('dubbo.providePage.version'),
        },
        {
          title: this.$pluginT('dubbo.providePage.disabled'),
          getContent: (row) => {
            return row.disabled ? this.$pluginT(`dubbo.providePage.disableTypeMap.${row.disabledType}`) : '';
          }
        },
        {
          title: this.$pluginT('dubbo.providePage.methodCount'),
          getContent: (row) => {
            return row.methods.length;
          }
        }
      ]

      let suffix = this.$moment(new Date()).format("YYYYMMDD_HHmmss");
      let filePath = filePaths[0] + `/${this.$pluginT('dubbo.serviceTab.providerList').replace(/\s/g, '_')}-${suffix}.xlsx`;
      try {
        this.$excelExportUtils.generateExcelAndWriterFile(headerList, this.providerList, filePath);
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
    },
    async refreshProviderList() {
      this.providerList = await this.$dataSource.getProviderList(this.dataSourceInfo, this.serviceInfo);
    },
    openInvokeDrawer(provider) {
      let tabData = {
        title: this.$pluginT('dubbo.providePage.callTitle', { address: provider.address}),
        componentName: 'dubboInvoke',
        multiInstance: true,
        params: {
          serviceInfo: this.serviceInfo,
          provider,
          selectProviderAddress: provider.address,
        },
      }

      this.tab.openNewTab(tabData);
    },

    openTelnet(provider) {
      let tabData = {
        title: `telnet ${provider.address}`,
        componentName: 'telnetTerminal',
        params: {
          ip: provider.ip,
          port: provider.port
        }
      }
      this.tab.openNewTab(tabData);
    },
    openConfiguration(provider) {
      let tabData = {
        title: `configuration ${provider.version}`,
        componentName: 'dubboProviderConfiguration',
        params: {
          serviceInfo: this.serviceInfo,
          provider
        }
      }

      this.tab.openNewTab(tabData);
    },
    openMenu(row, column, event) {
      // 菜单模板
      const menuTemplate = [

        {
          label: this.$pluginT('dubbo.providePage.call'),
          click: async () => {
            this.openInvokeDrawer(row);
          }
        },
        {
          label: "Telnet",
          click: async () => {
            this.openTelnet(row);
          }
        },
        { type: 'separator' },
        row.disabled ? {
          label: this.$pluginT('dubbo.providePage.serviceEnable'),
          click: async () => {
            await this.$dataSource.enableProvider(this.dataSourceInfo, this.serviceInfo, row);
            this.refreshProviderList();
          }
        } : {
          label: this.$pluginT('dubbo.providePage.serviceDisable'),
          click: async () => {
            await this.$dataSource.disableProvider(this.dataSourceInfo, this.serviceInfo, row);
            this.refreshProviderList();
          }
        }
        ,
        { type: 'separator' },
        {
          label: this.$pluginT('dubbo.providePage.editConfiguration'),
          click: async () => {
            this.openConfiguration(row);
          }
        },
      ];

      // // 构建菜单项
      const menu = this.$remote.Menu.buildFromTemplate(menuTemplate);

      // 弹出上下文菜单
      menu.popup({
        // 获取网页所属的窗口
        window: this.$remote.getCurrentWindow()
      });

      // 阻止默认行为
      event.preventDefault();
    }
  },

};
</script>

<style>
.versionSpan {
  color: rgb(114, 197, 76);
  background-color: rgb(237, 249, 230);
  padding: 5px 5px;
  border-radius: 5px;
}

.provider-list-table-header .el-table__cell {
  background-color: rgb(249, 249, 249) !important;
}

</style>