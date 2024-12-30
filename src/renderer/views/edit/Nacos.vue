<template>
  <el-form label-position="right" label-width="120px" :model="form" ref="form"  >
    <el-form-item :label="$pluginT('connect.nacos.address')"  prop="address" :rules="addressRule" >
      <el-input type="input" v-model="form.address" :placeholder="$pluginT('connect.nacos.address')" ></el-input>
    </el-form-item>

    <el-form-item :label="$pluginT('connect.nacos.namespaceId')"  prop="namespaceId" >
      <el-input type="input" v-model="form.namespaceId" :placeholder="$pluginT('connect.nacos.namespaceId')" ></el-input>
    </el-form-item>

    <el-form-item :label="$pluginT('connect.nacos.groupName')"  prop="groupName" >
      <el-input type="input" v-model="form.groupName" :placeholder="$pluginT('connect.nacos.groupNameTips')" ></el-input>
    </el-form-item>

    <el-form-item :label="$pluginT('connect.nacos.group')"  prop="group" >
      <el-input type="input" v-model="form.group" :placeholder="$pluginT('connect.nacos.groupTips')" ></el-input>
    </el-form-item>

    <el-form-item :label="$pluginT('connect.nacos.sessionTimeout')" prop="sessionTimeout" :rules="timeoutRules" >
      <el-input v-model="form.sessionTimeout"></el-input>
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  data() {
    return {
      form: {
        address: "http://127.0.0.1:8848",
        sessionTimeout: 5000,
        namespaceId: '',
        groupName: '',
        group: '',
      },
    };
  },
  computed: {

    timeoutRules() {

      let checkTimeout = (rule, value, callback) => {
        if (!value) {
          return callback(new Error(this.$pluginT('connect.validateMessage.timeOutNotNull')));
        }
        setTimeout(() => {
          if (isNaN(value)) {
            callback(new Error(this.$pluginT('connect.validateMessage.inputNumber')));
          } else {
            if (value < 10) {
              callback(new Error(this.$pluginT('connect.validateMessage.inputNumberRange')));
            } else {
              callback();
            }
          }
        }, 1000);
      };
      return [{ required: true, validator: checkTimeout, trigger: "blur" }];
    },

    addressRule(){
      return [{ required: true, message: this.$pluginT('connect.validateMessage.inputConnectionAddress'), trigger: "blur" }];
    }
  },
  props: {
    data: Object,
  },
  methods: {
    async init(data) {
      this.form.address = data.address ?? "http://127.0.0.1:8848";
      this.form.sessionTimeout = data.sessionTimeout ?? 5000;
      this.form.namespaceId = data.namespaceId ?? '';
      this.form.groupName = data.groupName ?? '';
      this.form.group = data.group ?? '';
    },

    async getDataSourceInfo() {
      const valid = await this.$refs.form.validate();

      if (!valid) {
        return false;
      }

      return { ...this.form };
    },
  },
};
</script>

<style>
</style>