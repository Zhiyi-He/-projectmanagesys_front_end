<template>
  <div class="app-container">
    <el-form label-position="left" ref="expInfo" :model="expInfo" label-width="120px">
      <el-form-item label="专家编号" style="display:none;">
        <el-input v-model="expInfo.id" />
      </el-form-item>
      <el-row>
        <el-col :span="22">
          <el-form-item label="姓名:" prop="name">
            <el-input v-model="expInfo.name" :disabled="true" />
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="10">
          <el-form-item label="身份证号:" prop="idCard">
            <el-input v-model="expInfo.idCard" :disabled="true" />
          </el-form-item>
        </el-col>
        <el-col :span="10" :offset="2">
          <el-form-item label="性别：" prop="sex">
            <el-select v-model="expInfo.sex" placeholder="请选择性别">
              <el-option label="男" :value="0" />
              <el-option label="女" :value="1" />
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="10">
          <el-form-item label="出生日期" prop="birthday">
            <el-date-picker
              v-model="expInfo.birthday"
              type="date"
              placeholder="Pick a date"
              style="width: 100%;"
            />
          </el-form-item>
        </el-col>
        <el-col :span="10" :offset="2">
          <el-form-item label="民族：" prop="folk">
            <el-input v-model="expInfo.folk" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="10">
          <el-form-item label="学校：" prop="school">
            <el-input v-model="expInfo.school" />
          </el-form-item>
        </el-col>
        <el-col :span="10" :offset="2">
          <el-form-item label="学历：" prop="edu">
            <el-select v-model="expInfo.edu" placeholder="请选择学历">
              <el-option label="专科" value="专科" />
              <el-option label="本科" value="本科" />
              <el-option label="硕士" value="硕士" />
              <el-option label="博士" value="博士" />
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="10">
          <el-form-item label="专业领域：" prop="profession">
            <el-input v-model="expInfo.profession" />
          </el-form-item>
        </el-col>
        <el-col :span="10" :offset="2">
          <el-form-item label="职称：" prop="title">
            <el-select v-model="expInfo.title" placeholder="请选择学历">
              <el-option label="讲师" :value="0" />
              <el-option label="副教授" :value="1" />
              <el-option label="教授" :value="2" />
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="10">
          <el-form-item label="手机号码：" prop="tel">
            <el-input v-model="expInfo.tel" />
          </el-form-item>
        </el-col>
        <el-col :span="10" :offset="2">
          <el-form-item label="邮箱：" prop="email">
            <el-input v-model="expInfo.email" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="10">
          <el-form-item label="家庭地址：" prop="address">
            <el-input v-model="expInfo.address" />
          </el-form-item>
        </el-col>
        <el-col :span="10" :offset="2">
          <el-form-item label="工作单位：" prop="workUnit">
            <el-input v-model="expInfo.workUnit" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item>
        <el-button type="primary" @click="onSubmit(expInfo)">提交</el-button>
        <el-button @click="resetForm('expInfo')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { getUserInfo } from '@/api/user'
import { getExpert, updateExperts } from '@/api/expert'
import router from '@/router'
export default {
  data() {
    return {
      expInfo: {
        id: 0,
        name: '',
        sex: 0,
        idCard: '',
        folk: '',
        birthday: '',
        school: '',
        edu: '',
        profession: '',
        title: 0,
        tel: '',
        email: '',
        address: '',
        workUnit: ''
      }
    }
  },
  methods: {
    async onSubmit(expInfo) {
      const { updateResult } = await updateExperts([expInfo])
      if (updateResult != null) {
        this.$message({
          message: '修改用户信息成功！',
          type: 'success'
        })
      }
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
    },
    async fetchData() {
      const { userVo } = await getUserInfo()
      const { userInfo } = await getExpert(userVo.id)
      this.expInfo = userInfo
    }
  },
  created() {
    this.fetchData()
  }
}
</script>

<style lang='scss' scoped>
.line {
  text-align: center;
}
</style>

