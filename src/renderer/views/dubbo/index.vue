<template>
  <div class="dubbo-list-main-container">
    <myTabList ref="myTabs" tab-position="top"></myTabList>
  </div>
</template>

<script>

export default {
  data() {
    return {};
  },
  props: {
    serviceInfo: Object,
  },
  mounted() {
    const providerTab = this.$refs.myTabs.addTab({
      title: this.$pluginT('dubbo.serviceTab.providerList'),
      fullTitle: this.$pluginT('dubbo.serviceTab.providerList'),
      componentName: 'dubboProviderList',
      closable: false,
      params: {
        serviceInfo: this.serviceInfo,
        tab: this,
      }
    });

    this.$refs.myTabs.addTab({
      title: this.$pluginT('dubbo.serviceTab.consumerList'),
      fullTitle: this.$pluginT('dubbo.serviceTab.consumerList'),
      componentName: 'dubboConsumerList',
      closable: false,
      params: {
        serviceInfo: this.serviceInfo,
        tab: this,
      }
    });

    this.$refs.myTabs.setCurrentTab(providerTab.id);
  },
  methods: {
    openNewTab(tabData) {
      this.$refs.myTabs.addTab(tabData);
    },
  },


};
</script>

<style >
.dubbo-list-main-container {
  height: 100%;
  background-color: white;
}
</style>