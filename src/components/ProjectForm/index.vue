<!--  -->
<template>
  <el-form
    label-position="left"
    ref="projectDetails"
    :model="projectDetails"
    label-width="120px"
    :disabled="true"
  >
    <el-row>
      <el-col :span="22">
        <el-form-item label="项目编号：" prop="id">
          <el-input v-model="projectDetails.id" />
        </el-form-item>
      </el-col>
    </el-row>

    <el-row>
      <el-col :span="22">
        <el-form-item label="项目名称：" prop="proName">
          <el-input v-model="projectDetails.proName" />
        </el-form-item>
      </el-col>
    </el-row>

    <el-row>
      <el-col :span="10">
        <el-form-item label="项目类型：" prop="proType">
          <el-input v-model="projectDetails.proType" />
        </el-form-item>
      </el-col>
      <el-col :span="10" :offset="2">
        <el-form-item label="学科分类：" prop="subject">
          <el-input v-model="projectDetails.subject" />
        </el-form-item>
      </el-col>
    </el-row>

    <el-row>
      <el-col :span="10">
        <el-form-item label="项目经费：" prop="funds">
          <el-input v-model="projectDetails.funds" />
        </el-form-item>
      </el-col>
      <el-col :span="10" :offset="2">
        <el-form-item label="研究年限：" prop="time">
          <el-input v-model="projectDetails.time" />
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="10">
        <el-form-item label="申报人：" prop="applicant.name">
          <el-input v-model="projectDetails.applicant.name" />
        </el-form-item>
      </el-col>
      <el-col :span="10" :offset="2">
        <el-form-item label="申报单位：" prop="applicant.repDept.deptName">
          <el-input v-model="projectDetails.applicant.repDept.deptName" />
        </el-form-item>
      </el-col>
    </el-row>

    <el-row>
      <el-col :span="22">
        <el-form-item label="推荐单位：" prop="applicant.repDept.recDept.deptName">
          <el-input v-model="projectDetails.applicant.repDept.recDept.deptName" />
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="22">
        <el-form-item label="关键词：" prop="keywords">
          <el-input v-model="projectDetails.keywords" />
        </el-form-item>
      </el-col>
    </el-row>

    <el-row>
      <el-col :span="22">
        <el-form-item label="项目内容摘要:" prop="desc">
          <el-input v-model="projectDetails.desc" type="textarea" placeholder="300字以内" />
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="22">
        <el-form-item label="项目文件:" prop="files">
          <div class="link" :key="item.id" v-for="item in projectDetails.files">
            <el-link
              :underline="false"
              href="javascript:;"
              @click.native="downloadFile(item.path)"
              type="primary"
            >{{item.title}}</el-link>
          </div>
        </el-form-item>
      </el-col>
    </el-row>
  </el-form>
</template>

<script>
import { DOWNLOADURL } from '@/variables'
export default {
  props: {
    projectDetails: {
      type: Object,
      required: true
    }
  },
  data() {
    return {}
  },
  methods: {
    downloadFile(path) {
      window.location.href = DOWNLOADURL + path
    }
  }
}
</script>
<style lang='scss' scoped>
</style>