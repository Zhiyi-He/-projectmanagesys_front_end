<template>
  <div class="app-container">
    <el-button
      @click="dialogFormVisible=true,dialogFormType='add',expAccount={}"
      type="primary"
      icon="el-icon-plus"
      plain
    >添加</el-button>
    <el-button
      @click="multipleSelection.length==0?multipleSelectionTip():deleteRow(multipleSelection)"
      type="danger"
      icon="el-icon-delete"
      plain
    >批量删除</el-button>
    <el-table
      v-loading="listLoading"
      :data="experts.slice((currentPage-1)*pageSize,currentPage*pageSize)"
      element-loading-text="Loading"
      border
      fit
      highlight-current-row
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column type="index" :index="indexComputed" label="序号" width="55px"></el-table-column>
      <el-table-column prop="name" label="姓名"></el-table-column>
      <el-table-column prop="idCard" label="身份证号"></el-table-column>
      <el-table-column prop="username" label="账号"></el-table-column>
      <el-table-column prop="password" label="密码"></el-table-column>
      <el-table-column fixed="right" label="操作">
        <template slot-scope="scope">
          <el-button
            @click="dialogFormVisible=true,dialogFormType='edit',expAccount=scope.row"
            type="text"
            size="small"
          >编辑</el-button>
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
      :total="experts.length"
    ></el-pagination>

    <el-dialog title="评审专家账号" :visible.sync="dialogFormVisible">
      <el-form :model="expAccount" label-position="left" label-width="120px">
        <el-form-item label="姓名：">
          <el-input v-model="expAccount.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="身份证号：">
          <el-input v-model="expAccount.idCard" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button
          type="primary"
          @click="dialogFormType=='add'?addExp(expAccount):editRow(expAccount)"
        >确 定</el-button>
        <el-button @click="dialogFormVisible = false">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {
  getExperts,
  addExpert,
  updateExperts,
  deleteExperts
} from '@/api/expert'
export default {
  data() {
    return {
      experts: [],
      listLoading: true,
      multipleSelection: [],
      dialogFormVisible: false,
      dialogFormType: '',
      expAccount: {
        name: '',
        idCard: ''
      },
      pageSize: 5,
      currentPage: 1,
      pageSizes: [5, 10, 15, 20]
      // pageSizes: [1, 2, 3, 4]
    }
  },
  created() {
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
      const { experts } = await getExperts()
      this.experts = experts
      this.listLoading = false
    },
    async addExp(expert) {
      const { addUser } = await addExpert(expert)
      if (addUser != null) {
        this.$message({
          message: '添加评审专家成功！',
          type: 'success'
        })
        this.dialogFormVisible = false
        this.fetchData()
      }
    },
    async editRow(expert) {
      const { updateResult } = await updateExperts([expert])
      if (updateResult != null) {
        this.$message({
          message: '修改评审专家成功！',
          type: 'success'
        })
        this.dialogFormVisible = false
        this.fetchData()
      }
    },
    deleteRow(experts) {
      this.$confirm('此操作将永久删除该账号, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(async () => {
          await deleteExperts(experts)
          this.$message({
            message: '删除评审专家成功！',
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
    },
    multipleSelectionTip() {
      this.$message({
        message: '请选择评审专家',
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
  }
}
</script>
