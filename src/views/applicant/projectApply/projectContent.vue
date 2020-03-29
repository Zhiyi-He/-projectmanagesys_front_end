<template>
  <div class="app-container">
    <el-steps :active="active" finish-status="success" class="steps">
      <el-step title="项目基本信息" icon="el-icon-edit"></el-step>
      <el-step title="项目内容" icon="el-icon-view"></el-step>
      <el-step title="文件上传" icon="el-icon-upload"></el-step>
      <el-step title="项目申报" icon="el-icon-finished"></el-step>
    </el-steps>
    <el-form label-position="left" ref="projectContent" :model="projectContent" label-width="120px">
      <el-divider content-position="center">项目信息</el-divider>
      <el-form-item label="项目编号" style="display:none;" prop="id">
        <el-input v-model="projectContent.id" />
      </el-form-item>
      <el-row>
        <el-col :span="11">
          <el-form-item label="项目名称：" prop="proName">
            <el-input v-model="projectContent.proName" :disabled="true" />
          </el-form-item>
        </el-col>
        <el-col :span="11" :offset="2">
          <el-form-item label="学科分类：" prop="subject">
            <el-input v-model="projectContent.subject" :disabled="true" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="11">
          <el-form-item label="项目经费：">
            <el-select
              v-model="projectContent.funds"
              placeholder="请选择预计申报经费"
              :popper-append-to-body="false"
            >
              <el-option v-for="(item) in options" :key="item" :label="item" :value="item"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="11" :offset="2">
          <el-form-item label="预计研究年限：">
            <el-input v-model="projectContent.time" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-divider content-position="center">申报人信息</el-divider>
      <el-row>
        <el-col :span="11">
          <el-form-item label="姓名：">
            <el-input v-model="projectContent.applicant.name" :disabled="true" />
          </el-form-item>
        </el-col>
        <el-col :span="11" :offset="2">
          <el-form-item label="性别：">
            <el-input v-model="projectContent.applicant.sex" :disabled="true" />
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="11">
          <el-form-item label="学校学历情况:">
            <el-input v-model="projectContent.applicant.schoolAndEdu" :disabled="true" />
          </el-form-item>
        </el-col>
        <el-col :span="11" :offset="2">
          <el-form-item label="专业领域：">
            <el-input v-model="projectContent.applicant.profession" :disabled="true" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="11">
          <el-form-item label="手机号码：">
            <el-input v-model="projectContent.applicant.tel" :disabled="true" />
          </el-form-item>
        </el-col>
        <el-col :span="11" :offset="2">
          <el-form-item label="邮箱：">
            <el-input v-model="projectContent.applicant.email" :disabled="true" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-divider content-position="center">所在单位信息</el-divider>
      <el-row>
        <el-col :span="11">
          <el-form-item label="单位名称：">
            <el-input v-model="projectContent.applicant.repDept.deptName" :disabled="true" />
          </el-form-item>
        </el-col>
        <el-col :span="11" :offset="2">
          <el-form-item label="通讯地址：">
            <el-input v-model="projectContent.applicant.repDept.address" :disabled="true" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="11">
          <el-form-item label="邮政编码：">
            <el-input v-model="projectContent.applicant.repDept.postalCode" :disabled="true" />
          </el-form-item>
        </el-col>
        <el-col :span="11" :offset="2">
          <el-form-item label="邮箱：">
            <el-input v-model="projectContent.applicant.repDept.email" :disabled="true" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="11">
          <el-form-item label="联系电话：">
            <el-input v-model="projectContent.applicant.repDept.tel" :disabled="true" />
          </el-form-item>
        </el-col>
        <el-col :span="11" :offset="2">
          <el-form-item label="联系人姓名：">
            <el-input v-model="projectContent.applicant.repDept.contact" :disabled="true" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-form-item label="科研监管单位：">
            <el-input v-model="projectContent.applicant.repDept.recDept.deptName" :disabled="true" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-divider content-position="center">项目内容摘要</el-divider>
      <el-row>
        <el-col :span="24">
          <el-form-item label="关键词：">
            <el-input v-model="projectContent.keywords" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item label="内容摘要：" prop="desc">
        <el-input v-model="projectContent.desc" type="textarea" placeholder="300字以内" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit(projectContent)">保存</el-button>
        <el-button @click="onCancel">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { getUserInfo } from '@/api/user'
import { getLaterProject, updateProjects, getAppInfo } from '@/api/applicant'
import router from '@/router'
import { PROJECTUPDATE } from '@/variables'
export default {
  data() {
    const options = [10000, 20000, 50000, 100000]
    return {
      options: options,
      active: 1,
      projectContent: {
        id: 0,
        proName: '',
        subject: '',
        funds: 0,
        time: '',
        keywords: '',
        desc: '',
        applicant: {
          name: '',
          sex: '',
          schoolAndEdu: '',
          profession: '',
          tel: '',
          email: '',
          repDept: {
            deptName: '',
            address: '',
            tel: '',
            email: '',
            postalCode: '',
            contact: '',
            recDept: {
              deptName: ''
            }
          }
        }
      }
    }
  },
  methods: {
    async onSubmit(projectContent) {
      const { updatePros } = await updateProjects([projectContent])
      if (updatePros != null) {
        this.$message({
          message: '添加项目内容成功！',
          type: 'success'
        })
        this.$router.push('/projectApply/fileUpload')
      }
    },
    onCancel() {
      this.fetchData()
    },
    async fetchData() {
      const { userVo } = await getUserInfo()
      const { projects } = await getLaterProject(userVo, PROJECTUPDATE)
      if (projects.length != 0) {
        this.projectContent = projects[0]
        this.projectContent.applicant.schoolAndEdu =
          projects[0].applicant.school + projects[0].applicant.edu
      } else {
        this.$message({
          message: '当前并无增加或者需要修改的项目',
          type: 'error'
        })
      }
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
.el-divider {
  margin-top: 2px;
  .el-divider__text {
    font-size: 18px;
  }
}
.steps {
  margin-bottom: 10px;
}
</style>

