<template>
  <div class="app-container">
    <el-steps :active="active" finish-status="success" class="steps">
      <el-step title="项目基本信息" icon="el-icon-edit"></el-step>
      <el-step title="项目内容" icon="el-icon-view"></el-step>
      <el-step title="文件上传" icon="el-icon-upload"></el-step>
      <el-step title="项目申报" icon="el-icon-finished"></el-step>
    </el-steps>
    <el-divider content-position="center">文件上传</el-divider>
    <el-row>
      <el-col :span="10" :offset="8">
        <el-upload
          ref="upload"
          action="#"
          multiple
          :http-request="uploadFile"
          :on-preview="handlePreview"
          :on-remove="handleRemove"
          :on-change="handleChange"
          :on-success="handleSuccess"
          :on-error="handleError"
          :before-remove="beforeRemove"
          :file-list="fileList"
          :auto-upload="false"
        >
          <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
          <el-button
            style="margin-left: 10px;"
            size="small"
            type="success"
            @click="submitUpload()"
          >上传文件</el-button>
          <div slot="tip" class="el-upload__tip">只能上传doc/pdf/excel/ppt文件，且不超过10MB</div>
        </el-upload>
      </el-col>
    </el-row>
    <br />
    <el-divider content-position="center">项目资料</el-divider>
    <el-button
      @click="multipleSelection.length==0?multipleSelectionTip():deleteRow(multipleSelection)"
      icon="el-icon-close"
      type="danger"
      plain
    >批量删除</el-button>
    <el-table
      v-loading="listLoading"
      :data="fileTable.slice((currentPage-1)*pageSize,currentPage*pageSize)"
      element-loading-text="Loading"
      border
      fit
      highlight-current-row
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column type="index" :index="indexComputed" label="序号" width="55px"></el-table-column>
      <el-table-column prop="title" label="标题"></el-table-column>
      <el-table-column prop="date" label="发布日期"></el-table-column>
      <el-table-column fixed="right" label="操作">
        <template slot-scope="scope">
          <el-button @click="downloadFile(scope.row.path)" type="text" size="small">下载</el-button>
          <el-button @click="deleteRow([scope.row])" type="text" size="small">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      background
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="pageSizes"
      :page-size="pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="fileTable.length"
    ></el-pagination>
  </div>
</template>

<script>
import { getUserInfo } from '@/api/user'
import { getProjectsByStatus } from '@/api/applicant'
import { filesUpload, deleteFiles } from '@/api/files'
import router from '@/router'
import { PROJECTUPDATE, DOWNLOADURL } from '@/variables'
export default {
  data() {
    return {
      active: 2,
      fd: {},
      project: {},
      fileList: [],
      fileTable: [],
      listLoading: true,
      pageSize: 5,
      currentPage: 1,
      pageSizes: [5, 10, 15, 20]
    }
  },
  mounted() {
    this.fetchData()
  },
  computed: {
    indexComputed() {
      return (this.currentPage - 1) * this.pageSize + 1
    }
  },
  methods: {
    async fetchData() {
      this.listLoading = true
      const { userVo } = await getUserInfo()
      let { projects } = await getProjectsByStatus([PROJECTUPDATE])
      this.project = projects.filter(project => {
        return project.applicant.id == userVo.id
      })[0]
      this.fileTable = this.project.files
      this.listLoading = false
    },
    async submitUpload() {
      this.$refs.upload.submit()
    },
    async uploadFile(param) {
      this.fd = new FormData()
      this.fd.append('files', param.file)
      this.fd.append('proId', this.project.id)
      const { files } = await filesUpload(this.fd)
      this.fetchData()
    },
    downloadFile(path) {
      window.location.href = DOWNLOADURL + path
    },
    deleteRow(files) {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(async () => {
          await deleteFiles(files)
          this.$message({
            message: '删除文件成功！',
            type: 'success'
          })
          this.fetchData()
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
    },
    handleRemove(file, fileList) {
      this.fileList = fileList
    },
    handlePreview(file) {
      console.log(file)
    },
    handleChange(file, fileList) {
      this.fileList = fileList
    },
    handleSuccess(response, file, fileList) {
      this.fileList = fileList
      this.$message({
        message: '文件上传成功！',
        type: 'success'
      })
    },
    handleError(err, file, fileList) {
      this.$message({
        message: '文件上传失败！',
        type: 'error'
      })
    },
    beforeRemove(file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`)
    },
    handleSelectionChange(val) {
      this.multipleSelection = val
    },
    multipleSelectionTip() {
      this.$message({
        message: '请选择文件',
        type: 'warning'
      })
    },
    handleSizeChange(val) {
      this.pageSize = val
      this.currentPage = 1
    },
    handleCurrentChange(val) {
      this.currentPage = val
    }
  },
  created() {}
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

