<template>
  <div class="app-container">
    <el-form
      label-position="left"
      label-width="120px"
      ref="passwordForm"
      :model="passwordForm"
      :rules="rules"
    >
      <el-row>
        <el-col :span="15">
          <el-form-item label="当前账号：" prop="oldAccount.username">
            <el-input v-model="passwordForm.oldAccount.username" :disabled="true" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="15">
          <el-form-item label="原密码：" prop="oldAccount.password">
            <el-input v-model="passwordForm.oldAccount.password" show-password />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="15">
          <el-form-item label="新密码：" prop="newPassword">
            <el-input v-model="passwordForm.newPassword" show-password />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="15">
          <el-form-item label="确认密码：" prop="checkPassword">
            <el-input v-model="passwordForm.checkPassword" show-password />
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item>
        <el-button type="primary" @click="onSubmit(passwordForm)">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { updatePwd } from "@/api/user";
export default {
  data() {
    var validatePassword = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        if (this.passwordForm.checkPassword !== "") {
          this.$refs.passwordForm.validateField("checkPassword");
        }
        callback();
      }
    };
    var validatePassword2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.passwordForm.newPassword) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      passwordForm: {
        oldAccount: {
          username: "",
          password: ""
        },
        newPassword: "",
        checkPassword: ""
      },
      rules: {
        oldAccount: {
          password: [
            { required: true, message: "请输入密码", trigger: "blur" },
            {
              min: 6,
              max: 15,
              message: "长度在 6 到 15 个字符",
              trigger: "blur"
            }
          ]
        },
        newPassword: [
          { validator: validatePassword, trigger: "blur" },
          { min: 6, max: 15, message: "长度在 6 到 15 个字符", trigger: "blur" }
        ],
        checkPassword: [{ validator: validatePassword2, trigger: "blur" }]
      }
    };
  },
  methods: {
    onSubmit(passwordForm) {
      updatePwd({
        oldAccount: passwordForm.oldAccount,
        newPassword: passwordForm.newPassword
      }).then(response => {
        const { user } = response;
        if (user != null) {
          this.$message({
            message: "密码修改成功！",
            type: "success"
          });
          this.$refs.passwordForm.resetFields();
        }
      });
    }
  },
  created() {
    this.passwordForm.oldAccount.username = this.$store.getters.username;
  }
};
</script>

<style lang='scss' scoped>
.line {
  text-align: center;
}
</style>

