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
<<<<<<< HEAD
            <el-input v-model="appInfo.name" :disabled="true" />
=======
            <el-input v-model="projectContent.applicant.name" :disabled="true" />
>>>>>>> 3.29 组织推荐单位子系统，完善表格分页，筛选等功能，代码优化
          </el-form-item>
        </el-col>
        <el-col :span="11" :offset="2">
          <el-form-item label="性别：">
<<<<<<< HEAD
            <el-input v-model="appInfo.sex" :disabled="true" />
=======
            <el-input v-model="projectContent.applicant.sex" :disabled="true" />
>>>>>>> 3.29 组织推荐单位子系统，完善表格分页，筛选等功能，代码优化
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="11">
          <el-form-item label="学校学历情况:">
<<<<<<< HEAD
            <el-input v-model="appInfo.schoolAndEdu" :disabled="true" />
=======
            <el-input v-model="projectContent.applicant.schoolAndEdu" :disabled="true" />
>>>>>>> 3.29 组织推荐单位子系统，完善表格分页，筛选等功能，代码优化
          </el-form-item>
        </el-col>
        <el-col :span="11" :offset="2">
          <el-form-item label="专业领域：">
<<<<<<< HEAD
            <el-input v-model="appInfo.profession" :disabled="true" />
=======
            <el-input v-model="projectContent.applicant.profession" :disabled="true" />
>>>>>>> 3.29 组织推荐单位子系统，完善表格分页，筛选等功能，代码优化
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="11">
          <el-form-item label="手机号码：">
<<<<<<< HEAD
            <el-input v-model="appInfo.tel" :disabled="true" />
=======
            <el-input v-model="projectContent.applicant.tel" :disabled="true" />
>>>>>>> 3.29 组织推荐单位子系统，完善表格分页，筛选等功能，代码优化
          </el-form-item>
        </el-col>
        <el-col :span="11" :offset="2">
          <el-form-item label="邮箱：">
<<<<<<< HEAD
            <el-input v-model="appInfo.email" :disabled="true" />
=======
            <el-input v-model="projectContent.applicant.email" :disabled="true" />
>>>>>>> 3.29 组织推荐单位子系统，完善表格分页，筛选等功能，代码优化
          </el-form-item>
        </el-col>
      </el-row>
      <el-divider content-position="center">所在单位信息</el-divider>
      <el-row>
        <el-col :span="11">
          <el-form-item label="单位名称：">
<<<<<<< HEAD
            <el-input v-model="deptInfo.deptName" :disabled="true" />
=======
            <el-input v-model="projectContent.applicant.repDept.deptName" :disabled="true" />
>>>>>>> 3.29 组织推荐单位子系统，完善表格分页，筛选等功能，代码优化
          </el-form-item>
        </el-col>
        <el-col :span="11" :offset="2">
          <el-form-item label="通讯地址：">
<<<<<<< HEAD
            <el-input v-model="deptInfo.address" :disabled="true" />
=======
            <el-input v-model="projectContent.applicant.repDept.address" :disabled="true" />
>>>>>>> 3.29 组织推荐单位子系统，完善表格分页，筛选等功能，代码优化
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="11">
          <el-form-item label="邮政编码：">
<<<<<<< HEAD
            <el-input v-model="deptInfo.postalCode" :disabled="true" />
=======
            <el-input v-model="projectContent.applicant.repDept.postalCode" :disabled="true" />
>>>>>>> 3.29 组织推荐单位子系统，完善表格分页，筛选等功能，代码优化
          </el-form-item>
        </el-col>
        <el-col :span="11" :offset="2">
          <el-form-item label="邮箱：">
<<<<<<< HEAD
            <el-input v-model="deptInfo.email" :disabled="true" />
=======
            <el-input v-model="projectContent.applicant.repDept.email" :disabled="true" />
>>>>>>> 3.29 组织推荐单位子系统，完善表格分页，筛选等功能，代码优化
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="11">
          <el-form-item label="联系电话：">
<<<<<<< HEAD
            <el-input v-model="deptInfo.tel" :disabled="true" />
=======
            <el-input v-model="projectContent.applicant.repDept.tel" :disabled="true" />
>>>>>>> 3.29 组织推荐单位子系统，完善表格分页，筛选等功能，代码优化
          </el-form-item>
        </el-col>
        <el-col :span="11" :offset="2">
          <el-form-item label="联系人姓名：">
<<<<<<< HEAD
            <el-input v-model="deptInfo.contact" :disabled="true" />
=======
            <el-input v-model="projectContent.applicant.repDept.contact" :disabled="true" />
>>>>>>> 3.29 组织推荐单位子系统，完善表格分页，筛选等功能，代码优化
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-form-item label="科研监管单位：">
<<<<<<< HEAD
            <el-input v-model="recDept" :disabled="true" />
=======
            <el-input v-model="projectContent.applicant.repDept.recDept.deptName" :disabled="true" />
>>>>>>> 3.29 组织推荐单位子系统，完善表格分页，筛选等功能，代码优化
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
<<<<<<< HEAD
        <el-button type="primary" @click="onSubmit()">保存</el-button>
=======
        <el-button type="primary" @click="onSubmit(projectContent)">保存</el-button>
>>>>>>> 3.29 组织推荐单位子系统，完善表格分页，筛选等功能，代码优化
        <el-button @click="onCancel">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
<<<<<<< HEAD
import { getLaterProject, updateProject } from "@/api/applicant";
import router from "@/router";
export default {
  data() {
    const options = [10000, 20000, 50000, 100000];
=======
import { getUserInfo } from '@/api/user'
import { getLaterProject, updateProjects, getAppInfo } from '@/api/applicant'
import router from '@/router'
import { PROJECTUPDATE } from '@/variables'
export default {
  data() {
    const options = [10000, 20000, 50000, 100000]
>>>>>>> 3.29 组织推荐单位子系统，完善表格分页，筛选等功能，代码优化
    return {
      options: options,
      active: 1,
      projectContent: {
        id: 0,
<<<<<<< HEAD
        proName: "",
        subject: "",
        funds: 0,
        time: "",
        keywords: "",
        desc: ""
      },
      appInfo: {
        name: "",
        sex: "",
        schoolAndEdu: "",
        profession: "",
        tel: "",
        email: ""
      },
      deptInfo: {
        deptName: "",
        address: "",
        tel: "",
        email: "",
        postalCode: "",
        contact: ""
      },
      recDept: ""
    };
  },
  methods: {
    onSubmit() {
      // this.projectContent.funds = Number(this.projectContent.funds);
      updateProject(this.projectContent, this.active).then(response => {
        const { project } = response;
        if (project != null) {
          this.$message({
            message: "添加项目内容成功！",
            type: "success"
          });
          this.$router.push("/projectApply/fileUpload");
        }
      });
    },
    onCancel() {
      this.fetchData();
    },
    fetchData() {
      getLaterProject().then(response => {
        const { project } = response;
        this.projectContent = project;
        // this.projectContent.funds = String(this.projectContent.funds);
        const { applicant } = project;
        this.appInfo = applicant;
        this.appInfo.schoolAndEdu = applicant.school + applicant.edu;
        const { repDept } = applicant;
        this.deptInfo = repDept;
        this.recDept = repDept.recDept.deptName;
      });
    }
  },
  created() {
    this.fetchData();
  }
};
=======
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
>>>>>>> 3.29 组织推荐单位子系统，完善表格分页，筛选等功能，代码优化
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

