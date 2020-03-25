<template>
  <div class="app-container">
    <el-steps :active="active" finish-status="success" class="steps">
      <el-step title="项目基本信息" icon="el-icon-edit"></el-step>
      <el-step title="项目内容" icon="el-icon-view"></el-step>
      <el-step title="文件上传" icon="el-icon-upload"></el-step>
      <el-step title="项目申报" icon="el-icon-finished"></el-step>
    </el-steps>
    <el-form label-position="left" ref="projectInfo" :model="projectInfo" label-width="120px">
      <el-row>
        <el-col :span="22">
          <el-form-item label="项目编号：" prop="id">
            <el-input v-model="projectInfo.id" :disabled="true" />
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="22">
          <el-form-item label="项目名称：" prop="proName">
            <el-input v-model="projectInfo.proName" />
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="10">
          <el-form-item label="项目类型：" prop="proType">
            <el-input v-model="projectInfo.proType" />
          </el-form-item>
        </el-col>
        <el-col :span="10" :offset="2">
          <el-form-item label="学科分类：" prop="subject">
            <el-input v-model="projectInfo.subject" />
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="10">
          <el-form-item label="项目经费：" prop="funds">
            <el-select
              v-model="projectInfo.funds"
              placeholder="请选择预计申报经费"
              :popper-append-to-body="false"
            >
              <el-option v-for="(item) in options" :key="item" :label="item" :value="item"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="10" :offset="2">
          <el-form-item label="研究年限：" prop="time">
            <el-input v-model="projectInfo.time" />
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="22">
          <el-form-item label="关键词：" prop="keywords">
            <el-input v-model="projectInfo.keywords" />
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="22">
          <el-form-item label="项目内容摘要" prop="desc">
            <el-input v-model="projectInfo.desc" type="textarea" placeholder="300字以内" />
          </el-form-item>
        </el-col>
      </el-row>

      <el-form-item>
        <el-button type="primary" @click="onSubmit(projectInfo)">申报</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { getLaterProject, updateProject } from '@/api/applicant'
import router from '@/router'
export default {
  data() {
    const options = [10000, 20000, 50000, 100000]
    return {
      options: options,
      active: 3,
      projectInfo: {
        id: 0,
        proName: '',
        proType: '',
        subject: '',
        funds: 0,
        time: '',
        keywords: '',
        desc: ''
      }
    }
  },
  methods: {
    onSubmit(projectInfo) {
      updateProject(projectInfo, this.active).then(response => {
        const { project } = response
        if (project != null) {
          this.$message({
            message: '项目申报成功！可在项目列表中查看已申报项目',
            type: 'success'
          })
        }
      })
    },
    fetchData() {
      getLaterProject().then(response => {
        const { project } = response
        this.projectInfo = project
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

