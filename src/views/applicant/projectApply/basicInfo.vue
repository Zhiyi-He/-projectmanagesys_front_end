<template>
  <div class="app-container">
    <el-steps :active="active" finish-status="success" class="steps">
      <el-step title="项目基本信息" icon="el-icon-edit"></el-step>
      <el-step title="项目内容" icon="el-icon-view"></el-step>
      <el-step title="文件上传" icon="el-icon-upload"></el-step>
      <el-step title="项目申报" icon="el-icon-finished"></el-step>
    </el-steps>
    <el-form label-position="left" ref="basicInfo" :model="basicInfo" label-width="120px">
      <el-row>
        <el-col :span="15">
          <el-form-item label="项目名称：" prop="proName">
            <el-input v-model="basicInfo.proName" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="15">
          <el-form-item label="项目类型：" prop="proType">
            <el-input v-model="basicInfo.proType" />
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="15">
          <el-form-item label="学科分类：" prop="subject">
            <el-input v-model="basicInfo.subject" />
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="15">
          <el-form-item label="单位科室：" prop="deptName">
            <el-input v-model="deptInfo.deptName" :disabled="true" />
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="15">
          <el-form-item label="通讯地址：" prop="address">
            <el-input v-model="deptInfo.address" />
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="15">
          <el-form-item label="邮政编码：" prop="postalCode">
            <el-input v-model="deptInfo.postalCode" />
          </el-form-item>
        </el-col>
      </el-row>

      <el-form-item>
        <el-button type="primary" @click="onSubmit()">提交</el-button>
        <el-button @click="onCancel('basicInfo')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import {
  addProject,
  getAppInfo,
  getProjectsByProStatus,
  deleteProject
} from '@/api/applicant'
import { getUserInfo } from '@/api/user'
import router from '@/router'
import { PROJECTUPDATE } from '@/variables'
export default {
  data() {
    return {
      active: 0,
      basicInfo: {
        proName: '',
        proType: '',
        subject: ''
      },
      deptInfo: {
        address: '',
        postalCode: '',
        deptName: ''
      }
    }
  },
  methods: {
    async onSubmit() {
      const { userVo } = await getUserInfo()
      const { projects } = await getProjectsByProStatus(userVo, PROJECTUPDATE)
      if (projects.length != 0) {
        await deleteProject(projects[0].id)
      }
      const { addProjectInfo } = await addProject(this.basicInfo, userVo.id)
      if (addProjectInfo != null) {
        this.$message({
          message: '添加项目基本信息成功！',
          type: 'success'
        })
        this.$router.push('/projectApply/projectContent')
      }
    },
    onCancel(basicInfo) {
      this.$refs[basicInfo].resetFields()
    },
    fetchData() {
      getUserInfo().then(response => {
        const { userVo } = response
        getAppInfo(userVo.id).then(response => {
          const { user } = response
          const { repDept } = user
          this.deptInfo = repDept
          this.deptInfo.deptName =
            user.repDept.recDept.deptName + '/' + user.repDept.deptName
        })
      })
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
.steps {
  margin-bottom: 10px;
}
</style>

