<template>
  <div class="app-container">
    <el-button
      @click="dialogFormVisible=true,dialogFormType='add',applicantAccount={}"
      type="primary"
      plain
    >添加</el-button>
    <el-button @click="deleteRow(multipleSelection)" type="danger" plain>删除多选</el-button>
    <el-table
      v-loading="listLoading"
      :data="applicants"
      element-loading-text="Loading"
      height="900"
      border
      fit
      highlight-current-row
      :default-sort="{prop: 'id', order: 'ascending'}"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column type="index" width="55" label="序号"></el-table-column>
      <el-table-column prop="name" label="姓名"></el-table-column>
      <el-table-column prop="idCard" label="身份证号"></el-table-column>
      <el-table-column prop="username" label="账号"></el-table-column>
      <el-table-column prop="password" label="密码"></el-table-column>
      <el-table-column fixed="right" label="操作">
        <template slot-scope="scope">
          <el-button
            @click="dialogFormVisible=true,dialogFormType='edit',applicantAccount=applicants[scope.$index]"
            type="text"
            size="small"
          >编辑</el-button>
          <el-button @click="deleteRow([applicants[scope.$index]])" type="text" size="small">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog title="申报人账号" :visible.sync="dialogFormVisible">
      <el-form :model="applicantAccount" label-position="left" label-width="120px">
        <el-form-item label="姓名：">
          <el-input v-model="applicantAccount.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="身份证号：">
          <el-input v-model="applicantAccount.idCard" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button
          type="primary"
          @click="dialogFormType=='add'?addApp(applicantAccount):editRow(applicantAccount)"
        >确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { getRpdInfo, getApplicants } from '@/api/repDept'
import { deleteApplicants, addApplicant, updateAppInfo } from '@/api/applicant'
export default {
  data() {
    return {
      applicants: [],
      listLoading: true,
      multipleSelection: [],
      dialogFormVisible: false,
      dialogFormType: false,
      applicantAccount: {
        name: '',
        idCard: ''
      }
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    async fetchData() {
      this.listLoading = true
      const { applicants } = await getApplicants()
      this.applicants = applicants
      this.listLoading = false
    },
    async addApp(applicant) {
      const { user } = await addApplicant(applicant)
      if (user != null) {
        this.$message({
          message: '添加申报人成功！',
          type: 'success'
        })
        this.dialogFormVisible = false
        this.fetchData()
      }
    },
    async editRow(applicant) {
      const { user } = await updateAppInfo(applicant)
      if (user != null) {
        this.$message({
          message: '修改申报人账号成功！',
          type: 'success'
        })
        this.dialogFormVisible = false
        this.fetchData()
      }
    },
    deleteRow(applicants) {
      this.$confirm('此操作将永久删除该账号, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(async () => {
          await deleteApplicants(applicants)
          this.$message({
            message: '删除申报人成功！',
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
    handleSelectionChange(val) {
      this.multipleSelection = val
    }
  }
}
</script>
