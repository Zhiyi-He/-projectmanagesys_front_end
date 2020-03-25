<template>
  <div class="app-container">
    <el-form label-position="left" ref="appInfo" :model="appInfo" label-width="120px">
      <el-form-item label="编号" style="display:none;">
        <el-input v-model="appInfo.id" />
      </el-form-item>
      <el-row>
        <el-col :span="22">
          <el-form-item label="姓名：">
            <el-input v-model="appInfo.name" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="10">
          <el-form-item label="身份证号：">
            <el-input v-model="appInfo.idCard" />
          </el-form-item>
        </el-col>
        <el-col :span="10" :offset="2">
          <el-form-item label="民族：">
            <el-input v-model="appInfo.folk" />
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="10">
          <el-form-item label="学历:">
            <el-select v-model="appInfo.edu" placeholder="请选择你的学历">
              <el-option label="专科" value="0" />
              <el-option label="本科" value="1" />
              <el-option label="硕士" value="2" />
              <el-option label="博士" value="3" />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="10" :offset="2">
          <el-form-item label="学校专业：">
            <el-input v-model="appInfo.profession" />
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="10">
          <el-form-item label="出生日期">
            <el-date-picker
              v-model="appInfo.birthday"
              type="date"
              placeholder="Pick a date"
              style="width: 100%;"
            />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="10">
          <el-form-item label="手机号：">
            <el-input v-model="appInfo.tel" />
          </el-form-item>
        </el-col>
        <el-col :span="10" :offset="2">
          <el-form-item label="邮箱：">
            <el-input v-model="appInfo.email" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="10">
          <el-form-item label="项目数量：">
            <el-input v-model="appInfo.proNum" />
          </el-form-item>
        </el-col>
        <el-col :span="10" :offset="2"></el-col>
      </el-row>
      <el-form-item label="个人描述">
        <el-input v-model="appInfo.desc" type="textarea" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">提交</el-button>
        <el-button @click="onCancel">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { getAppInfo, updateAppInfo } from "@/api/applicant";
import { getUserInfo } from "@/api/user";
import router from "@/router";
export default {
  data() {
    return {
      appInfo: {
        id: "",
        name: "",
        idCard: "",
        folk: "",
        edu: "",
        profession: "",
        birthday: "",
        tel: "",
        email: "",
        proNum: "",
        desc: ""
      }
    };
  },
  methods: {
    onSubmit() {
      updateAppInfo(this.appInfo);
    },
    onCancel() {
      this.fetchData();
    },
    fetchData() {
      getUserInfo().then(response => {
        const { user } = response;
        this.appInfo = user;
      });
    }
  },
  created() {
    this.fetchData();
  }
};
</script>

<style lang='scss' scoped>
.line {
  text-align: center;
}
</style>

