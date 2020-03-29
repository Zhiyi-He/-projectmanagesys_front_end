<template>
  <div class="app-container">
    <el-button
      @click="dialogFormVisible=true,dialogFormType='add',rcdAccount={}"
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
      :data="recDepts.slice((currentPage-1)*pageSize,currentPage*pageSize)"
      element-loading-text="Loading"
      border
      fit
      highlight-current-row
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column type="index" :index="indexComputed" label="序号" width="55px"></el-table-column>
      <el-table-column prop="deptName" label="组织推荐单位"></el-table-column>
      <el-table-column prop="deptCode" label="单位代码" :column-key="'deptCode'"></el-table-column>
      <el-table-column prop="username" label="账号"></el-table-column>
      <el-table-column prop="password" label="密码"></el-table-column>
      <el-table-column fixed="right" label="操作">
        <template slot-scope="scope">
          <el-button
            @click="dialogFormVisible=true,dialogFormType='edit',rcdAccount=scope.row"
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
      :total="recDepts.length"
    ></el-pagination>

    <el-dialog title="组织推荐单位账号" :visible.sync="dialogFormVisible">
      <el-form :model="rcdAccount" label-position="left" label-width="120px">
        <el-form-item label="申报单位：">
          <el-input v-model="rcdAccount.deptName" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="单位代码：">
          <el-input v-model="rcdAccount.deptCode" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button
          type="primary"
          @click="dialogFormType=='add'?addRcd(rcdAccount):editRow(rcdAccount)"
        >确 定</el-button>
        <el-button @click="dialogFormVisible = false">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {
  getRecDepts,
  deleteRecDepts,
  addRecDept,
  updateRcdInfo
} from '@/api/recDept'
export default {
  data() {
    return {
      recDepts: [],
      listLoading: true,
      multipleSelection: [],
      dialogFormVisible: false,
      dialogFormType: '',
      rcdAccount: {
        deptName: '',
        deptCode: ''
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
      const { recDepts } = await getRecDepts()
      this.recDepts = recDepts
      this.listLoading = false
    },
    async addRcd(recDept) {
      const { addUser } = await addRecDept(recDept)
      if (addUser != null) {
        this.$message({
          message: '添加组织推荐单位成功！',
          type: 'success'
        })
        this.dialogFormVisible = false
        this.fetchData()
      }
    },
    async editRow(recDept) {
      const { updateUser } = await updateRcdInfo(recDept)
      if (updateUser != null) {
        this.$message({
          message: '修改组织推荐单位账号成功！',
          type: 'success'
        })
        this.dialogFormVisible = false
        this.fetchData()
      }
    },
    deleteRow(recDepts) {
      this.$confirm('此操作将永久删除该账号, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(async () => {
          await deleteRecDepts(recDepts)
          this.$message({
            message: '删除组织推荐单位成功！',
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
        message: '请选择组织推荐单位',
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
