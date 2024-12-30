<template>
  <el-form label-position="right" label-width="120px" :model="form" ref="form"  >
    <el-form-item :label="$pluginT('connect.dubboAdmin.address')"  prop="address" :rules="addressRule" >
      <el-input type="input" v-model="form.address" :placeholder="$pluginT('connect.dubboAdmin.address')" ></el-input>
    </el-form-item>

    <el-form-item :label="$pluginT('connect.dubboAdmin.username')"  prop="username" >
      <el-input type="input" v-model="form.username" :placeholder="$pluginT('connect.dubboAdmin.username')" ></el-input>
    </el-form-item>

    <el-form-item :label="$pluginT('connect.dubboAdmin.password')"  prop="password" >
      <el-input type="input" v-model="form.password" :placeholder="$pluginT('connect.dubboAdmin.password')" ></el-input>
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
        address: "http://127.0.0.1:8080/api/dev/",
        sessionTimeout: 5000,
        username: '',
        password: '',
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
      this.form.address = data.address ?? "http://127.0.0.1:8080/api/dev/";
      this.form.sessionTimeout = data.sessionTimeout ?? 5000;
      this.form.username = data.username ?? '';
      this.form.password = data.password ?? '';
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