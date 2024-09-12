<template>
  <el-form label-position="right" label-width="120px" :model="form" ref="form"  >
    <el-form-item :label="$pluginT('connect.zookeeper.address')"  prop="address" :rules="addressRule" >
      <el-input type="input" v-model="form.address" :placeholder="$pluginT('connect.zookeeper.address')" ></el-input>
    </el-form-item>

    <el-form-item label="ACL" prop="auth">
      <el-input :placeholder="$pluginT('connect.zookeeper.aclTips')"  v-model="form.auth" class="input-with-select">
        <el-select v-model="form.scheme" slot="prepend" style="width:120px">
          <el-option label="digest" value="digest"></el-option>
          <el-option label="auth" value="auth"></el-option>
        </el-select>
      </el-input>
    </el-form-item>

    <el-form-item :label="$pluginT('connect.zookeeper.sessionTimeout')" prop="sessionTimeout" :rules="timeoutRules" >
      <el-input v-model="form.sessionTimeout"></el-input>
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  data() {
    return {
      form: {
        address: "127.0.0.1:2181",
        sessionTimeout: 5000,
        scheme: 'auth',
        auth: '',
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
      this.form.address = data.address ?? "127.0.0.1:2181";
      this.form.sessionTimeout = data.sessionTimeout ?? 5000;
      this.form.scheme = data.scheme ?? 'digest';
      this.form.auth = data.auth ?? '';
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