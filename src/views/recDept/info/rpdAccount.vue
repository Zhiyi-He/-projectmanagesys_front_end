<template>
  <div class="app-container">
    <el-button
      @click="dialogFormVisible=true,dialogFormType='add',rpdAccount={}"
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
      :data="repDepts.slice((currentPage-1)*pageSize,currentPage*pageSize)"
      element-loading-text="Loading"
      border
      fit
      highlight-current-row
      @selection-change="handleSelectionChange"
      @filter-change="filterRepDepts"
    >
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column type="index" :index="indexComputed" label="序号" width="55px"></el-table-column>
      <el-table-column prop="deptName" label="申报单位"></el-table-column>
      <el-table-column
        prop="deptType"
        label="单位性质"
        :filters="deptTypeFilter"
        :column-key="'deptType'"
        :formatter="formatDeptType"
      ></el-table-column>
      <el-table-column prop="username" label="账号"></el-table-column>
      <el-table-column prop="password" label="密码"></el-table-column>
      <el-table-column
        prop="rpdStatus"
        label="审核状态"
        :filters="rpdStatusFilter"
        :column-key="'rpdStatus'"
        :formatter="formatRpdStatus"
      ></el-table-column>
      <el-table-column fixed="right" label="操作">
        <template slot-scope="scope">
          <el-button
            @click="dialogFormVisible=true,dialogFormType='edit',rpdAccount=scope.row"
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
      :total="repDepts.length"
    ></el-pagination>

    <el-dialog title="申报单位账号" :visible.sync="dialogFormVisible">
      <el-form :model="rpdAccount" label-position="left" label-width="120px">
        <el-form-item label="申报单位：">
          <el-input v-model="rpdAccount.deptName" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="单位性质：">
          <el-select v-model="rpdAccount.deptType" placeholder="请选择单位类别">
            <el-option label="医院" :value="0" />
            <el-option label="学校" :value="1" />
            <el-option label="研究所" :value="2" />
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button
          type="primary"
          @click="dialogFormType=='add'?addRpd(rpdAccount):editRow(rpdAccount)"
        >确 定</el-button>
        <el-button @click="dialogFormVisible = false">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { getUserInfo } from '@/api/user'
import {} from '@/api/applicant'
import { deleteRepDepts, updateRpdInfo, addRepDept } from '@/api/repDept'
import { getRepDepts, getRcdInfo } from '@/api/recDept'
import { UNDEREVIEW } from '@/variables'
export default {
  data() {
    const deptTypeFilter = [
      { text: '医院', value: 0 },
      { text: '学校', value: 1 },
      { text: '研究所', value: 2 }
    ]
    const rpdStatusFilter = [
      { text: '未通过', value: 0 },
      { text: '待审核', value: 1 },
      { text: '已通过', value: 2 }
    ]
    return {
      repDepts: [],
      firstData: [],
      deptTypeFilter: deptTypeFilter,
      rpdStatusFilter: rpdStatusFilter,
      listLoading: true,
      multipleSelection: [],
      dialogFormVisible: false,
      dialogFormType: '',
      rpdAccount: {
        deptName: '',
        deptType: 0,
        recDept: {}
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
      const { userVo } = await getUserInfo()
      const { repDepts } = await getRepDepts(userVo.id)
      this.firstData = this.repDepts = repDepts
      this.listLoading = false
    },
    async addRpd(repDept) {
      const { userVo } = await getUserInfo()
      const { userInfo } = await getRcdInfo(userVo.id)
      repDept.recDept = userInfo
      repDept.rpdStatus = UNDEREVIEW
      const { addUser } = await addRepDept(repDept)
      if (addUser != null) {
        this.$message({
          message: '添加申报单位成功！',
          type: 'success'
        })
        this.dialogFormVisible = false
        this.fetchData()
      }
    },
    async editRow(repDept) {
      repDept.rpdStatus = UNDEREVIEW
      const { updateUser } = await updateRpdInfo(repDept)
      if (updateUser != null) {
        this.$message({
          message: '修改申报单位账号成功！',
          type: 'success'
        })
        this.dialogFormVisible = false
        this.fetchData()
      }
    },
    deleteRow(repDepts) {
      this.$confirm('此操作将永久删除该账号, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(async () => {
          await deleteRepDepts(repDepts)
          this.$message({
            message: '删除申报单位成功！',
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
    formatDeptType(row, column) {
      return this.deptTypeFilter[row.deptType].text
    },
    formatRpdStatus(row, column) {
      return this.rpdStatusFilter[row.rpdStatus].text
    },
    handleSelectionChange(val) {
      this.multipleSelection = val
    },
    multipleSelectionTip() {
      this.$message({
        message: '请选择申报人',
        type: 'warning'
      })
    },
    handleSizeChange(val) {
      this.pageSize = val
      this.currentPage = 1
    },
    handleCurrentChange(val) {
      this.currentPage = val
    },
    filterRepDepts(filters) {
      this.repDepts = this.firstData

      if (filters.deptType && filters.deptType.length != 0) {
        this.repDepts = this.repDepts.filter(repDept => {
          return filters.deptType.indexOf(repDept.deptType) != -1
        })
      }
      if (filters.rpdStatus && filters.rpdStatus.length != 0) {
        this.repDepts = this.repDepts.filter(repDept => {
          return filters.rpdStatus.indexOf(repDept.rpdStatus) != -1
        })
      }
      this.currentPage = 1
    }
  }
}
</script>
